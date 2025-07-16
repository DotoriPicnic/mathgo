import React, { useEffect, useState } from 'react';
import './ResultPage.css';
import HomeButton from '../components/HomeButton';

interface Problem {
  question: string;
  answer: number;
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
  if (/^[-+]?\d+\/\d+$/.test(str)) {
    const [n, d] = str.split('/').map(Number);
    return { n, d };
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
  // 정답이 정수(분모 1)면 정수로만 정답 인정
  if (na.d === 1) {
    return String(nu.n) === String(na.n) && nu.d === 1 && user.trim() === String(na.n);
  }
  // 정수가 아닌 분수면 기약분수로만 정답 인정
  return nu.n === na.n && nu.d === na.d && user.trim() === `${na.n}/${na.d}`;
}

// [정답 표시용 약분 함수]
function getDisplayAnswer(answer: string | number) {
  if (typeof answer === 'number') return String(answer);
  const frac = parseFraction(answer);
  if (!frac) return answer;
  const norm = normalizeFrac(frac);
  if (norm.d === 1) return String(norm.n);
  return `${norm.n}/${norm.d}`;
}

const ResultPage: React.FC = () => {
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
        // 나눗셈 문제는 몫/나머지 모두 비교
        if (prob.question.includes('÷')) {
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



  // 문제를 개별적으로 처리 (모바일에서 한 줄에 하나씩)
  const rows = problems.map(problem => [problem]);

  // 100점 만점 환산
  const total = problems.length;
  const score100 = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="result-page">
      <HomeButton />
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
        <div className="result-list">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="result-row">
              {row.map((p, i) => {
                const idx = rowIdx * 2 + i;
                const userAns = userAnswers[idx] || '';
                let isCorrect = false;
                if (p.question.includes('÷')) {
                  const user = userAnswers[idx];
                  const ans = (p.answer as any);
                  isCorrect = user && typeof user === 'object' && ans && typeof ans === 'object' &&
                    String(user.q).trim() === String(ans.q) &&
                    String(user.r).trim() === String(ans.r);
                } else {
                  isCorrect = compareAnswer(userAns, p.answer);
                }
                return (
                  <div key={i} className="result-item">
                    <div className="result-question">
                      <span className="question-number">Q{idx + 1}.</span>
                      <span className="question-text">{renderWithFraction(p.question)}</span>
                      {p.question.includes('÷') && typeof (userAnswers[idx] as any) === 'object' ? (
                        <span className="division-answer">
                          (몫: {(userAnswers[idx] as any)?.q ?? ''}, 나머지: {(userAnswers[idx] as any)?.r ?? ''})
                        </span>
                      ) : (
                        <span className="user-answer">{userAns}</span>
                      )}
                      {isCorrect ? (
                        <span className="result-mark result-mark-correct">O</span>
                      ) : (
                        <span className="result-mark result-mark-incorrect">×</span>
                      )}
                    </div>
                    <div className="correct-answer">
                      (정답: {p.question.includes('÷') && typeof (p.answer as any) === 'object'
                        ? `몫: ${(p.answer as any).q}, 나머지: ${(p.answer as any).r}`
                        : renderWithFraction(getDisplayAnswer(p.answer))})
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="result-buttons">
          <button className="result-button" onClick={() => window.location.href = '/elem/problems'}>다시 풀기</button>
          <button className="result-button" onClick={() => window.location.href = '/'}>메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 