 
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// QRCodeCanvas import 제거
import HomeButton from '../components/HomeButton';
import AdComponent from '../components/AdComponent';
import './ProblemPage.css';

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

// [문제 문자열에서 분수 자동 변환 함수]
function renderWithFraction(str: string) {
  // 1개 이상 분수(3/4) 패턴을 찾아 Fraction으로 변환
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

interface ProblemPageProps {
  userConsent?: boolean;
}

const ProblemPage: React.FC<ProblemPageProps> = ({ userConsent = true }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  // answers: 나눗셈은 {q, r}, 나머지는 string
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // 제한시간(초)
  // 정답 포함 체크박스 상태 (기본값 true)
  const [includeAnswer, setIncludeAnswer] = useState(true); // 정답 포함 체크박스 상태
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const pdfRef = useRef<HTMLDivElement>(null);
  const pdfAnswerRef = useRef<HTMLDivElement>(null); // 정답용 PDF 영역

  // 제한시간 초기화 및 타이머 시작
  useEffect(() => {
    const data = localStorage.getItem('problems');
    if (data) {
      const arr = JSON.parse(data) as Problem[];
      setProblems(arr);
      setAnswers(arr.map(p => p.question.includes('÷') ? { q: '', r: '' } : ''));
    }
    const limitStr = localStorage.getItem('limit');
    if (limitStr && !isNaN(Number(limitStr)) && Number(limitStr) > 0) {
      setTimeLeft(Number(limitStr));
      // 시작 시각 기록
      localStorage.setItem('startTime', String(Date.now()));
    } else {
      // 제한시간이 없으면 기존 기록 삭제
      localStorage.removeItem('startTime');
    }
  }, []);

  // 타이머 동작
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      // 시간 종료 시 자동 채점 및 이동
      localStorage.setItem('userAnswers', JSON.stringify(answers));
      navigate('/elem/result');
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setTimeLeft(t => (t !== null ? t - 1 : null));
    }, 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [timeLeft]);

  // mm:ss 포맷 변환 함수
  const formatTime = (sec: number | null) => {
    if (sec === null) return '';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 입력 핸들러: 나눗셈은 answers[idx] = {q, r}, 빈칸 나눗셈은 string, 나머지는 string
  const handleInput = (idx: number, value: string, field?: 'q' | 'r') => {
    setAnswers(prev => {
      const copy = [...prev];
      // 빈칸 나눗셈 문제(÷ □)는 string으로 저장
      if (problems[idx]?.question.includes('÷ □')) {
        copy[idx] = value;
      } else if (typeof copy[idx] === 'object' && copy[idx] !== null && field) {
        copy[idx] = { ...copy[idx], [field]: value };
      } else {
        copy[idx] = value;
      }
      return copy;
    });
  };

  // 2개씩 묶어서 row로 변환 (한 줄에 두 문제)
  const rows: Problem[][] = [];
  for (let i = 0; i < problems.length; i += 2) {
    rows.push(problems.slice(i, i + 2));
  }

  const getPdfTitle = () => {
    if (problems.length === 0) return 'Calcuri-문제지';
    const q = problems[0].question;
    if (q.includes('/')) return 'Calcuri-분수';
    if (q.includes('+')) return 'Calcuri-덧셈';
    if (q.includes('-')) return 'Calcuri-뺄셈';
    if (q.includes('×')) return 'Calcuri-곱셈';
    if (q.includes('÷')) return 'Calcuri-나눗셈';
    return 'Calcuri-문제지';
  };

  // PDF 저장 기능 (문제만/정답 포함)
  const handlePdf = async () => {
    if (!pdfRef.current) return;
    // 문제 페이지 캡처
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#fff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    if (includeAnswer && pdfAnswerRef.current) {
      // 정답 페이지 캡처
      const answerCanvas = await html2canvas(pdfAnswerRef.current, { scale: 2, backgroundColor: '#fff' });
      const answerImg = answerCanvas.toDataURL('image/png');
      pdf.addPage();
      pdf.addImage(answerImg, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }
    // 파일명: Calcuri-연산명_YYYYMMDD-HHmmss.pdf
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const title = getPdfTitle() + `_${y}${m}${d}-${hh}${mm}${ss}.pdf`;
    pdf.save(title);
  };

  // PDF용 문제 rows (2열 10행, 입력란 없이)
  const pdfRows: Problem[][] = [];
  for (let i = 0; i < problems.length; i += 2) {
    pdfRows.push(problems.slice(i, i + 2));
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7fafd', width: '100%', overflowX: 'hidden' }}>
      <HomeButton />
      {/* 상단 광고 */}
      <AdComponent type="adsense" size="banner" className="top-ad" userConsent={userConsent} />
      {/* 제한시간 타이머 상단 고정 */}
      {timeLeft !== null && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          background: '#fff',
          color: '#2563eb',
          fontWeight: 900,
          fontSize: 22,
          textAlign: 'center',
          padding: '14px 0 10px 0',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
          letterSpacing: 2,
        }}>
          ⏰ 남은 시간: {formatTime(timeLeft)}
        </div>
      )}
      {/* 기존 문제 풀이 화면 (입력란 포함) */}
      <div className="card" style={{ width: '100%', maxWidth: 'calc(100vw - 32px)', margin: '40px auto', padding: '0 16px', boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32 }}>연산 문제</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
          {/* 1. 채점하기 버튼 */}
          <button style={{ background: '#22c55e', padding: '8px 16px', fontSize: 14, borderRadius: 6, border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => {
            // 채점 전 answers 보정: 분수 문제(문제에 '/'가 포함된 경우)만 /1 보정 적용
            const fixedAnswers = answers.map((ans, idx) => {
              const isFraction = problems[idx]?.question.includes('/');
              if (isFraction && typeof ans === 'string' && ans.includes('/')) {
                const [numer, denom] = ans.split('/');
                if (numer && (denom === undefined || denom === '')) {
                  return numer + '/1';
                }
                return ans;
              } else if (isFraction && typeof ans === 'string' && ans !== '' && !ans.includes('/')) {
                // 분자만 입력된 경우
                return ans + '/1';
              }
              // 분수가 아니면 입력값 그대로
              return ans;
            });
            localStorage.setItem('userAnswers', JSON.stringify(fixedAnswers));
            navigate('/elem/result');
          }}>채점하기</button>
          {/* 2. PDF 저장 버튼 */}
          <button style={{ background: '#3b82f6', padding: '8px 16px', fontSize: 14, borderRadius: 6, border: 'none', color: 'white', cursor: 'pointer' }} onClick={handlePdf}>PDF 저장</button>
          {/* 3. 정답 포함 체크박스 */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
            <input type="checkbox" style={{ marginLeft: 8 }} checked={includeAnswer} onChange={e => setIncludeAnswer(e.target.checked)} /> 정답 포함
          </label>
        </div>
        <div className="problem-container">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="problem-row">
              {row.map((p, i) => {
                const idx = rowIdx * 2 + i;
                const isDiv = p.question.includes('÷');
                const isFractionDiv = p.question.includes('/') && p.question.includes('÷');
                const isIntDiv = p.question.includes('÷') && !p.question.includes('/');
                const isDecimalDiv = (p.question.includes('소수') || p.question.match(/\d+\.\d+/));
                return (
                  // 비교 연산 문제만 드롭다운으로 처리 (숫자 □ 숫자 형태)
                  (p.question.includes('□') && p.question.match(/\d+\s*□\s*\d+/)) ? (
                    <div key={i} className="problem-item">
                      <span style={{ fontWeight: 700, color: '#2563eb', marginRight: 4, whiteSpace: 'nowrap', fontSize: 14 }}>Q{idx + 1}.</span>
                      {renderWithFraction(p.question)}
                      <select
                        className="comparison-select"
                        value={answers[idx] || ''}
                        onChange={e => handleInput(idx, e.target.value)}
                        style={{ fontSize: 20, fontWeight: 700, padding: '6px 16px', borderRadius: 8, marginLeft: 6, marginRight: 6 }}
                      >
                        <option value="">□</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value="=">=</option>
                      </select>
                    </div>
                  ) : (
                    <div key={i} className="problem-item">
                      <span style={{ fontWeight: 700, color: '#2563eb', marginRight: 4, whiteSpace: 'nowrap', fontSize: 14 }}>Q{idx + 1}.</span>
                      {renderWithFraction(p.question)}
                      {/* 정수 나눗셈만 몫/나머지 입력란, 분수 나눗셈은 아래 분수 입력란 */}
                      {isIntDiv && !p.question.includes('÷ □') && !isDecimalDiv ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap' }}>몫</span>
                            <input
                              type="number"
                              inputMode="numeric"
                              placeholder=""
                              style={{ 
                                width: 28, 
                                height: 24, 
                                fontSize: 14, 
                                textAlign: 'center', 
                                border: '1.5px solid #bcd0f7', 
                                borderRadius: 4,
                                padding: 0
                              }}
                              value={answers[idx]?.q || ''}
                              onChange={e => handleInput(idx, e.target.value, 'q')}
                            />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap' }}>나머지</span>
                            <input
                              type="number"
                              inputMode="numeric"
                              placeholder=""
                              style={{ 
                                width: 28, 
                                height: 24, 
                                fontSize: 14, 
                                textAlign: 'center', 
                                border: '1.5px solid #bcd0f7', 
                                borderRadius: 4,
                                padding: 0
                              }}
                              value={answers[idx]?.r || ''}
                              onChange={e => handleInput(idx, e.target.value, 'r')}
                            />
                          </div>
                        </div>
                      ) : isDecimalDiv && isDiv ? (
                        // 소수 나눗셈: 소수 한 칸만 입력
                        <input
                          type="number"
                          inputMode="decimal"
                          className="answer-input"
                          value={answers[idx] || ''}
                          onChange={e => handleInput(idx, e.target.value)}
                        />
                      ) : (
                        // 분수 문제 입력란 (덧셈, 뺄셈, 곱셈, 나눗셈 모두)
                        isFractionDiv || p.question.match(/\d+\/\d+/) ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
                            <input
                              type="number"
                              inputMode="numeric"
                              className="answer-input small-placeholder"
                              style={{ width: 36, minWidth: 0, fontSize: 14, padding: '2px 4px' }}
                              placeholder="분자"
                              value={typeof answers[idx] === 'string' && answers[idx].includes('/') ? answers[idx].split('/')[0] : answers[idx]?.numer || ''}
                              onChange={e => {
                                const val = e.target.value;
                                let denom = '';
                                if (typeof answers[idx] === 'string' && answers[idx].includes('/')) {
                                  denom = answers[idx].split('/')[1];
                                } else if (typeof answers[idx] === 'object' && answers[idx] !== null) {
                                  denom = answers[idx].denom || '';
                                }
                                handleInput(idx, val + '/' + denom);
                              }}
                            />
                            <span style={{ fontSize: 16, fontWeight: 700, color: '#222', minWidth: 8 }}>/</span>
                            <input
                              type="number"
                              inputMode="numeric"
                              className="answer-input small-placeholder"
                              style={{ width: 36, minWidth: 0, fontSize: 14, padding: '2px 4px' }}
                              placeholder="분모"
                              value={(() => {
                                if (typeof answers[idx] === 'string' && answers[idx].includes('/')) {
                                  const denom = answers[idx].split('/')[1];
                                  return denom === undefined ? '' : denom;
                                }
                                return answers[idx]?.denom || '';
                              })()}
                              onChange={e => {
                                const val = e.target.value;
                                let numer = '';
                                if (typeof answers[idx] === 'string' && answers[idx].includes('/')) {
                                  numer = answers[idx].split('/')[0];
                                } else if (typeof answers[idx] === 'object' && answers[idx] !== null) {
                                  numer = answers[idx].numer || '';
                                }
                                handleInput(idx, numer + '/' + val);
                              }}
                            />
                          </span>
                        ) : (
                          <input
                            type="number"
                            inputMode="numeric"
                            className="answer-input"
                            value={answers[idx] || ''}
                            onChange={e => handleInput(idx, e.target.value)}
                          />
                        )
                      )}
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
        {/* PDF용 영역 (화면에는 보이지 않음) */}
        <div ref={pdfRef} style={{
          width: 794,
          height: 1123,
          background: '#fff',
          position: 'absolute',
          left: -9999,
          top: 0,
          zIndex: -1,
          padding: '32px 32px 0 32px',
          boxSizing: 'border-box',
        }}>
          {/* 상단 제목/입력란 */}
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '3px solid #bbb', paddingBottom: 10, marginBottom: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 18, background: '#eee', borderRadius: 6, padding: '2px 10px', marginRight: 12 }}>Caluri</div>
            <div style={{ fontWeight: 800, fontSize: 28, marginRight: 12 }}>연산문제집</div>
            {/* 연산명 표시는 분수 문제일 때만 */}
            {problems.length > 0 && problems[0].question.includes('/') ? (
              <div style={{ fontWeight: 600, fontSize: 18, color: '#2563eb', marginRight: 12 }}>
                {problems[0].question.includes('+') ? '분수 덧셈'
                  : problems[0].question.includes('-') ? '분수 뺄셈'
                  : problems[0].question.includes('×') ? '분수 곱셈'
                  : problems[0].question.includes('÷') ? '분수 나눗셈'
                  : '분수 연산'}
              </div>
            ) : null}
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 16, marginRight: 12 }}>월 <span style={{ borderBottom: '1px solid #bbb', minWidth: 24, display: 'inline-block' }}>&nbsp;&nbsp;&nbsp;</span></div>
            <div style={{ fontSize: 16, marginRight: 12 }}>일 <span style={{ borderBottom: '1px solid #bbb', minWidth: 24, display: 'inline-block' }}>&nbsp;&nbsp;&nbsp;</span></div>
            <div style={{ fontSize: 16 }}>이름 <span style={{ borderBottom: '1px solid #bbb', minWidth: 48, display: 'inline-block' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          </div>
          {/* 문제 2열 10행, 균등 분할 */}
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 850, marginTop: 8, marginBottom: 0 }}>
            {[0, 1].map(col => (
              <div key={col} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                {pdfRows.map((row, rowIdx) => (
                  row[col] ? (
                    <div key={rowIdx} style={{ display: 'flex', alignItems: 'center', fontSize: 22, fontWeight: 600, minHeight: 36 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, marginRight: 10 }}>{col === 0 ? rowIdx + 1 : rowIdx + 11}.</span>
                      {row[col].question.includes('÷ □') ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                          <span style={{ fontSize: 16, marginBottom: 2 }}>
                            {(() => {
                              const match = row[col].question.match(/([0-9]+) ÷ □ = \(몫: ([0-9]+), 나머지: ([0-9]+)\)/);
                              if (match) {
                                return `${match[1]} ÷ □ = 몫 ${match[2]}, 나머지 ${match[3]}`;
                              }
                              return row[col].question;
                            })()}
                          </span>
                          <span style={{ display: 'inline-block', borderBottom: '2px solid #222', minWidth: 60, maxWidth: 80, height: 1, marginLeft: 12, marginTop: 12, verticalAlign: 'bottom' }}>&nbsp;</span>
                        </div>
                      ) : (
                        <span style={{ letterSpacing: 2 }}>
                          {renderWithFraction(row[col].question)}
                        </span>
                      )}
                    </div>
                  ) : <div key={rowIdx} style={{ minHeight: 36 }} />
                ))}
              </div>
            ))}
          </div>
          {/* 하단 저작권 문구 추가 */}
          <div style={{ width: '100%', textAlign: 'right', fontSize: 13, color: '#bbb', marginBottom: 12, position: 'absolute', right: 32, bottom: 0 }}>
            @https://www.calcuri.com/
          </div>
        </div>
        {/* 정답용 PDF 영역 (화면에는 보이지 않음) */}
        {includeAnswer && (
          <div ref={pdfAnswerRef} style={{
            width: 794,
            height: 1123,
            background: '#fff',
            position: 'absolute',
            left: -9999,
            top: 0,
            zIndex: -2,
            padding: '32px 32px 0 32px',
            boxSizing: 'border-box',
          }}>
            {/* 상단 제목/입력란 */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #bbb', paddingBottom: 6, marginBottom: 10 }}>
              <div style={{ fontWeight: 900, fontSize: 15, background: '#eee', borderRadius: 6, padding: '2px 10px', marginRight: 8 }}>Caluri</div>
              <div style={{ fontWeight: 800, fontSize: 20, marginRight: 8 }}>연산문제집</div>
              {problems.length > 0 && problems[0].question.includes('/') ? (
                <div style={{ fontWeight: 600, fontSize: 13, color: '#2563eb', marginRight: 8 }}>
                  {problems[0].question.includes('+') ? '분수 덧셈'
                    : problems[0].question.includes('-') ? '분수 뺄셈'
                    : problems[0].question.includes('×') ? '분수 곱셈'
                    : problems[0].question.includes('÷') ? '분수 나눗셈'
                    : '분수 연산'}
                </div>
              ) : null}
              <div style={{ flex: 1 }} />
            </div>
            {/* 정답 2열 10행, 폰트 12px로 축소 */}
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 850, marginTop: 0, marginBottom: 0, alignItems: 'flex-start' }}>
              {[0, 1].map(col => (
                <div key={col} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 0 }}>
                  {pdfRows.map((row, rowIdx) => (
                    row[col] ? (
                      <div key={rowIdx} style={{ display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 600, minHeight: 10, marginBottom: 0, padding: 0, lineHeight: 1.1 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, marginRight: 6 }}>{col === 0 ? rowIdx + 1 : rowIdx + 11}.</span>
                        <span style={{ letterSpacing: 1 }}>{renderWithFraction(row[col].question)}</span>
                        <span style={{ color: '#2563eb', fontWeight: 700, marginLeft: 8 }}>
                          {row[col].question.includes('÷') && typeof (row[col].answer as any) === 'object'
                            ? `몫: ${(row[col].answer as any).q}, 나머지: ${(row[col].answer as any).r}`
                            : renderWithFraction(getDisplayAnswer(row[col].answer))}
                        </span>
                      </div>
                    ) : <div key={rowIdx} style={{ minHeight: 10, padding: 0 }} />
                  ))}
                </div>
              ))}
            </div>
            {/* 하단 여백 최소화 */}
            <div style={{ height: 12 }} />
            {/* 정답지 하단에도 동일하게 */}
            <div style={{ width: '100%', textAlign: 'right', fontSize: 13, color: '#bbb', marginBottom: 12, position: 'absolute', right: 32, bottom: 0 }}>
              @https://www.calcuri.com/
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPage; 