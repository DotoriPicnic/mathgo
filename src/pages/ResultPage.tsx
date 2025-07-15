import React, { useEffect, useState } from 'react';

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

  // 동그라미/엑스 스타일
  const markStyle = {
    display: 'inline-block',
    width: 28,
    height: 28,
    borderRadius: '50%',
    border: '3px solid #ef4444',
    color: '#ef4444',
    fontWeight: 900,
    fontSize: 20,
    textAlign: 'center' as const,
    lineHeight: '28px',
    marginRight: 8,
    marginLeft: 8,
    background: 'transparent',
  };

  // 2개씩 묶어서 row로 변환
  const rows = [];
  for (let i = 0; i < problems.length; i += 2) {
    rows.push(problems.slice(i, i + 2));
  }

  // 100점 만점 환산
  const total = problems.length;
  const score100 = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7fafd' }}>
      <div className="card" style={{ width: '100%', maxWidth: 800, margin: '40px auto' }}>
        {/* 제한시간/소요시간 표시 */}
        {(limitSec !== null || elapsedSec !== null) && (
          <div style={{ textAlign: 'center', fontSize: 17, color: '#2563eb', fontWeight: 700, marginBottom: 8 }}>
            {limitSec !== null && (
              <span>제한시간: {formatTime(limitSec)} </span>
            )}
            {elapsedSec !== null && (
              <span>소요시간: {formatTime(elapsedSec)}</span>
            )}
          </div>
        )}
        <h2 style={{ textAlign: 'center', marginBottom: 16 }}>채점 결과</h2>
        <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, marginBottom: 32 }}>
          점수: <span style={{ color: '#2563eb' }}>{score100}점</span> <span style={{ color: '#888', fontSize: 16 }}>({score} / {total})</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: 32, justifyContent: 'center', width: '100%' }}>
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
                  <div key={i} style={{ background: '#f9fafb', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '14px 18px', minWidth: 220, marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18 }}>
                      <span style={{ fontWeight: 700, color: '#2563eb', marginRight: 8 }}>Q{idx + 1}.</span>
                      <span style={{ marginRight: 8 }}>{renderWithFraction(p.question)}</span>
                      {p.question.includes('÷') && typeof (userAnswers[idx] as any) === 'object' ? (
                        <span style={{ fontSize: 13, color: '#888', marginLeft: 4, marginRight: 4, fontFamily: 'monospace', display: 'inline-block', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          (몫: {(userAnswers[idx] as any)?.q ?? ''}, 나머지: {(userAnswers[idx] as any)?.r ?? ''})
                        </span>
                      ) : (
                        <span style={{ marginRight: 8, minWidth: 40, textAlign: 'center' }}>{userAns}</span>
                      )}
                      {isCorrect ? (
                        <span style={{ ...markStyle, border: '3px solid #ef4444', color: '#ef4444', marginLeft: 4, marginRight: 4 }}>O</span>
                      ) : (
                        <span style={{ ...markStyle, border: 'none', color: '#ef4444', fontSize: 28, marginLeft: 4, marginRight: 4 }}>×</span>
                      )}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: '#bbb',
                      marginLeft: 36,
                      marginTop: 2,
                      fontFamily: p.question.includes('÷') ? 'monospace' : undefined
                    }}>
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
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 32 }}>
          <button style={{ fontSize: 18, padding: '12px 32px' }} onClick={() => window.location.href = '/elem/problems'}>다시 풀기</button>
          <button style={{ fontSize: 18, padding: '12px 32px' }} onClick={() => window.location.href = '/'}>메인으로</button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 