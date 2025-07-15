import React, { useEffect, useState } from 'react';

function decodeData(data: string) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(data))));
  } catch {
    return null;
  }
}

function calcAnswer(q: string): number | string {
  // 빈칸 문제
  if (q.includes('□')) {
    // 예시: 5 + □ = 10 (빈칸 문제)
    const match = q.match(/(\d+) \+ [^=]+ = (\d+)/);
    if (match) {
      const a = parseInt(match[1], 10);
      const sum = parseInt(match[2], 10);
      return sum - a;
    }
    return '?';
  }
  // 사칙연산
  try {
    let expr = q.replace(/=/g, '').replace(/[^0-9+\-×÷*\/ ]/g, '').trim();
    expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
    // eslint-disable-next-line no-eval
    return eval(expr);
  } catch {
    return '?';
  }
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
// [정답 표시용 약분 함수]
function parseFraction(str: string): { n: number, d: number } | null {
  if (/^[-+]?\d+$/.test(str)) {
    return { n: parseInt(str, 10), d: 1 };
  }
  if (/^[-+]?\d+\/\d+$/.test(str)) {
    const [n, d] = str.split('/').map(Number);
    return { n, d };
  }
  if (/^[-+]?\d*\.\d+$/.test(str)) {
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
function getDisplayAnswer(answer: string | number) {
  if (typeof answer === 'number') return String(answer);
  const frac = parseFraction(answer);
  if (!frac) return answer;
  const norm = normalizeFrac(frac);
  if (norm.d === 1) return String(norm.n);
  return `${norm.n}/${norm.d}`;
}

const QrAnswerPage: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<(number | string)[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      const decoded = decodeData(data);
      if (decoded && Array.isArray(decoded.problems)) {
        setQuestions(decoded.problems);
        setAnswers(decoded.problems.map(calcAnswer));
      }
    }
  }, []);

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h2>정답 확인</h2>
      <div style={{ margin: '24px 0', fontSize: 20, fontWeight: 600 }}>
        {questions.length === 0 ? (
          <div>문제 정보가 없습니다.</div>
        ) : (
          questions.map((_, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <span style={{ color: '#2563eb', fontWeight: 700 }}>{i + 1}번:</span> {renderWithFraction(getDisplayAnswer(answers[i]))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QrAnswerPage; 