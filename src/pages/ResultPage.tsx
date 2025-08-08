import React, { useEffect, useState } from 'react';
import './ResultPage.css';
import HomeButton from '../components/HomeButton';
import AdComponent from '../components/AdComponent';

interface Problem {
  question: string;
  answer: string | number;
}

// [분수 표시용 컴포넌트 추가]
function Fraction({ value }: { value: string }) {
  const match = value.match(/^(\d+)\/(\d+)$/);
  if (!match) return value;
  return (
    <span className="fraction" style={{ display: 'inline-block', verticalAlign: 'middle', fontSize: '1em', margin: '0 2px' }}>
      <span className="top" style={{ display: 'block', textAlign: 'center', fontSize: '0.95em' }}>{match[1]}</span>
      <span className="line" style={{ display: 'block', borderTop: '2px solid #222', width: '100%', margin: '0 0', height: 2 }}></span>
      <span className="bottom" style={{ display: 'block', textAlign: 'center', fontSize: '0.95em' }}>{match[2]}</span>
    </span>
  );
}

// [문자열에서 분수 자동 변환 함수]
function renderWithFraction(str: string) {
  if (typeof str !== 'string') return str;
  const parts = str.split(/(\d+\/\d+)/g);
  return parts.map((part, idx) =>
    /^\d+\/\d+$/.test(part) ? <Fraction key={idx} value={part} /> : part
  );
}

// [분수/정수/소수 동등 비교 함수 추가]
function parseFraction(str: string): { n: number, d: number } | null {
  if (/^[-+]?\d+$/.test(str)) {
    // 정수
    return { n: parseInt(str, 10), d: 1 };
  }
  // 분모가 비어 있거나 0이어도 d=1로 간주
  if (/^[-+]?\d+\/\d*$/.test(str)) {
    const [n, d] = str.split('/');
    return { n: Number(n), d: d ? Number(d) : 1 };
  }
  if (/^[-+]?\d*\.\d+$/.test(str)) {
    // 소수 → 분수 변환
    const f = parseFloat(str);
    const s = str.split('.')[1].length;
    const d = Math.pow(10, s);
    const n = Math.round(f * d);
    return { n, d };
  }
  return null;
}
function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}
function normalizeFrac(frac: { n: number, d: number }) {
  const g = gcd(frac.n, frac.d);
  return { n: frac.n / g, d: frac.d / g };
}
function compareAnswer(user: string, answer: string | number): boolean {
  // 빈 입력은 무조건 오답 처리
  if (user == null || user.trim() === '') return false;
  // 숫자 비교
  if (!isNaN(Number(user)) && !isNaN(Number(answer))) {
    return Number(user) === Number(answer);
  }
  // 분수/정수/소수 동등 비교
  const u = parseFraction(user.trim());
  const a = typeof answer === 'number' ? { n: answer, d: 1 } : parseFraction(String(answer).trim());
  if (!u || !a) return false;
  const nu = normalizeFrac(u);
  const na = normalizeFrac(a);
  // 정답이 정수(분모 1)면 정수로만 정답 인정 + 3/1, 3/빈칸(3/)도 인정
  if (na.d === 1) {
    // 3, 3/1, 3/ 모두 인정 (분자만 맞으면)
    return nu.n === na.n && (nu.d === 1 || nu.d === 0);
  }
  // 정수가 아닌 분수면 기약분수로만 정답 인정
  return nu.n === na.n && nu.d === na.d && user.trim() === `${na.n}/${na.d}`;
}

// [정답 표시용 약분 함수]
function getDisplayAnswer(answer: string | number) {
  if (typeof answer === 'number') return String(answer);
  // 소수 문제는 소수 그대로 반환
  if (/^[-+]?\d*\.\d+$/.test(String(answer))) return String(answer);
  const frac = parseFraction(answer);
  if (!frac) return answer;
  const norm = normalizeFrac(frac);
  if (norm.d === 1) return String(norm.n);
  return `${norm.n}/${norm.d}`;
}

interface ResultPageProps {
}

const ResultPage: React.FC<ResultPageProps> = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [limitSec, setLimitSec] = useState<number | null>(null); // 제한시간(초)
  const [elapsedSec, setElapsedSec] = useState<number | null>(null); // 소요시간(초)

  // mm:ss 포맷 변환 함수
  const formatTime = (sec: number | null) => {
    if (sec === null) return '';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const p = localStorage.getItem('problems');
    const a = localStorage.getItem('userAnswers');
    const limitStr = localStorage.getItem('limit');
    const startStr = localStorage.getItem('startTime');
    if (limitStr && !isNaN(Number(limitStr)) && Number(limitStr) > 0) {
      setLimitSec(Number(limitStr));
    }
    if (startStr && !isNaN(Number(startStr))) {
      // 소요시간 계산
      const end = Date.now();
      const start = Number(startStr);
      let elapsed = Math.round((end - start) / 1000);
      // 제한시간이 있다면 초과 시 제한시간으로 고정
      if (limitStr && !isNaN(Number(limitStr)) && Number(limitStr) > 0) {
        const lim = Number(limitStr);
        if (elapsed > lim) elapsed = lim;
      }
      setElapsedSec(elapsed);
    }
    if (p && a) {
      const plist = JSON.parse(p) as Problem[];
      const alist = JSON.parse(a);
      setProblems(plist);
      setUserAnswers(alist);
      let s = 0;
      plist.forEach((prob, i) => {
        // 비교 연산 문제는 기호 정확히 일치할 때만 정답
        if (prob.question.includes('□') && prob.question.match(/\d+\s*□\s*\d+/)) {
          const user = alist[i];
          if (user === prob.answer) {
            s++;
          }
        }
        // 나눗셈 문제는 몫/나머지 모두 비교
        else if (prob.question.includes('÷')) {
          const user = alist[i];
          const ans = prob.answer as any;
          if (
            user && typeof user === 'object' && ans && typeof ans === 'object' &&
            String(user.q).trim() === String(ans.q) &&
            String(user.r).trim() === String(ans.r)
          ) {
            s++;
          }
        } else {
          if (alist[i] && compareAnswer(alist[i], prob.answer)) s++;
        }
      });
      setScore(s);
    }
  }, []);



  // 문제를 2개씩 묶어서 row로 변환 (문제 풀이 페이지와 동일)
  const rows: Problem[][] = [];
  for (let i = 0; i < problems.length; i += 2) {
    rows.push(problems.slice(i, i + 2));
  }

  // 100점 만점 환산
  const total = problems.length;
  const score100 = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="result-page">
      <HomeButton />
      {/* 상단 광고 */}
              <AdComponent size="banner" className="top-ad" />
      <div className="result-container">
        {/* 제한시간/소요시간 표시 */}
        {(limitSec !== null || elapsedSec !== null) && (
          <div className="time-info">
            {limitSec !== null && (
              <span>제한시간: {formatTime(limitSec)} </span>
            )}
            {elapsedSec !== null && (
              <span>소요시간: {formatTime(elapsedSec)}</span>
            )}
          </div>
        )}
        <h2 className="result-title">채점 결과</h2>
        <div className="result-score">
          점수: <span className="result-score-main">{score100}점</span> <span className="result-score-sub">({score} / {total})</span>
        </div>
        {/* 문제/답안이 없을 때 안내 메시지 */}
        {(problems.length === 0 || userAnswers.length === 0) ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: 20, margin: '40px 0' }}>
            채점할 문제가 없습니다.<br />
            메인 화면에서 문제를 먼저 생성해 주세요.
          </div>
        ) : (
          <div className="result-list">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="result-row">
                {row.map((p, i) => {
                  const idx = rowIdx * 2 + i;
                  const userAns = userAnswers[idx] || '';
                  let isCorrect = false;
                  let isIntDiv = p.question.includes('÷') && !p.question.includes('/');
                  let isDecimalDiv = (p.question.includes('소수') || p.question.match(/\d+\.\d+/));
                  // 비교 연산 문제 채점 분기 개선: '>', '<', '=' 세 기호만 정확히 일치할 때만 정답 처리
                  let isComparison = p.question.includes('□') && p.question.match(/\d+\s*□\s*\d+/);
                  if (isComparison) {
                    isCorrect = userAns === p.answer;
                  } else if (isIntDiv) {
                    const user = userAnswers[idx];
                    const ans = (p.answer as any);
                    isCorrect = user && typeof user === 'object' && ans && typeof ans === 'object' &&
                      String(user.q).trim() === String(ans.q) &&
                      String(user.r).trim() === String(ans.r);
                  } else {
                    isCorrect = typeof userAns === 'string' && compareAnswer(userAns, p.answer);
                  }
                  return (
                    <div key={i} className="result-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', minWidth: 0 }}>
                        <span className="question-number">Q{idx + 1}.</span>
                        <span className="question-text" style={{ fontSize: 15, minWidth: 0, wordBreak: 'break-all', whiteSpace: 'normal' }}>{renderWithFraction(p.question)}</span>
                        {/* 정수 나눗셈만 몫/나머지, 소수 나눗셈은 소수 한 칸만 */}
                        {isIntDiv && !isDecimalDiv ? (
                          <span className="division-answer" style={{ fontSize: 15, minWidth: 0, wordBreak: 'break-all', whiteSpace: 'normal' }}>
                            (몫: {(userAnswers[idx] as any)?.q ?? ''}, 나머지: {(userAnswers[idx] as any)?.r ?? ''})
                          </span>
                        ) : (
                          typeof userAns === 'string' && (
                            <span className="user-answer" style={{ fontSize: 15, minWidth: 0, wordBreak: 'break-all', whiteSpace: 'normal' }}>
                              {/* 분수 문제일 때만 분수 형태로, 나머지는 숫자만 */}
                              {p.question.includes('/')
                                ? renderWithFraction(userAns)
                                : (userAns.includes('/') ? userAns.split('/')[0] : userAns)}
                            </span>
                          )
                        )}
                        {/* 비교 연산 문제 결과: 오직 사용자가 선택한 답(크게)와 정답 기호만 표시 */}
                        {isComparison ? (
                          <>
                            <span style={{ fontSize: 22, fontWeight: 700, margin: '0 12px', color: isCorrect ? '#22c55e' : '#ef4444' }}>
                              {userAns || '□'}
                            </span>
                            <span style={{ fontSize: 20, color: '#2563eb', marginLeft: 8, fontWeight: 700 }}>
                              (정답: {p.answer})
                            </span>
                          </>
                        ) : (
                          <span
                            style={{
                              fontSize: (typeof getDisplayAnswer(p.answer) === 'string' && getDisplayAnswer(p.answer).includes('/')) ? 13 : 15,
                              color: '#2563eb',
                              marginLeft: 10,
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              minWidth: 0,
                              wordBreak: 'break-all',
                              whiteSpace: 'normal',
                              maxWidth: '100%',
                            }}
                          >
                            {/* 비교 연산 문제 정답 기호 노출 */}
                            {isComparison ? p.answer :
                              (isIntDiv && !isDecimalDiv && typeof p.answer === 'object' && p.answer !== null ?
                                (() => {
                                  const ans = p.answer as any;
                                  return `(몫: ${ans.q}, 나머지: ${ans.r})`;
                                })()
                                : p.question.includes('/')
                                  ? renderWithFraction(getDisplayAnswer(p.answer))
                                  : getDisplayAnswer(p.answer)
                              )}
                          </span>
                        )}
                        {isCorrect ? (
                          <span className="result-mark result-mark-correct">O</span>
                        ) : (
                          <span className="result-mark result-mark-incorrect">×</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        <div className="result-buttons">
          <button className="result-button" onClick={() => window.location.href = '/elem/problems'}>다시 풀기</button>
          <button className="result-button" onClick={() => window.location.href = '/'}>메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 