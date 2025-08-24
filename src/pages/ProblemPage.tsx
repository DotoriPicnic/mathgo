 
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// QRCodeCanvas import 제거
import HomeButton from '../components/HomeButton';
import AdComponent from '../components/AdComponent';
import LanguageSelector from '../components/LanguageSelector';
import './ProblemPage.css';

interface Problem {
  question: string;
  answer: number;
}

// [Question 컴포넌트 - 칩 스타일 문제 번호]
interface QuestionProps {
  number: number;
  text: string;
}

function Question({ number, text }: QuestionProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ 
        backgroundColor: '#3b82f6', 
        color: 'white', 
        padding: '4px 12px', 
        borderRadius: '9999px', 
        fontWeight: 'bold', 
        fontSize: '14px' 
      }}>
        Q{number}
      </span>
      <span style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#1f2937',
        letterSpacing: '0.025em'
      }}>
        {renderWithFraction(text)}
      </span>
    </div>
  );
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
}

const ProblemPage: React.FC<ProblemPageProps> = () => {
  const { t } = useTranslation();
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
      setAnswers(arr.map(p => {
        // 소수 연산 LV3의 나눗셈은 소수 결과를 반환하므로 객체가 아님
        if (p.question.includes('÷') && p.question.includes('.')) {
          return '';
        }
        // 기존 나눗셈은 몫/나머지 객체
        if (p.question.includes('÷')) {
          return { q: '', r: '' };
        }
        return '';
      }));
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
  for (let i = 0; i < Math.min(problems.length, 20); i += 2) {
    pdfRows.push(problems.slice(i, i + 2));
  }

  // 채점 페이지로 이동
  const handleGrade = () => {
    localStorage.setItem('userAnswers', JSON.stringify(answers));
    navigate('/elem/result');
  };

  // 나눗셈 입력 핸들러
  const handleDivisionChange = (idx: number, field: 'q' | 'r', value: string) => {
    setAnswers(prev => {
      const copy = [...prev];
      if (typeof copy[idx] === 'object' && copy[idx] !== null) {
        copy[idx] = { ...copy[idx], [field]: value };
      } else {
        copy[idx] = { q: '', r: '', [field]: value };
      }
      return copy;
    });
  };

  // 일반 답안 입력 핸들러
  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers(prev => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  return (
    <div className="problem-page">
      <div className="header">
        <HomeButton />
        <LanguageSelector />
      </div>
      {/* 상단 광고 */}
      <AdComponent slot="problempage-banner-top" size="banner" className="top-ad" />
      <div className="problem-container">
        {/* 상단 제목 */}
        <div className="problem-header">
          <div className="problem-title">
            <div className="brand">Caluri</div>
            <div className="workbook-title">{t('problemWorkbook')}</div>
            {/* 연산명 표시는 분수 문제일 때만 */}
            {problems.length > 0 && problems[0].question.includes('/') ? (
              <div className="operation-type">
                {problems[0].question.includes('+') ? t('fractionAddition')
                  : problems[0].question.includes('-') ? t('fractionSubtraction')
                  : problems[0].question.includes('×') ? t('fractionMultiplication')
                  : problems[0].question.includes('÷') ? t('fractionDivision')
                  : t('fractionOperation')}
              </div>
            ) : null}
          </div>
        </div>

        {/* 제한시간 표시 */}
        {timeLeft !== null && (
          <div className="timer">
            {t('timeLeft')}: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}

        {/* 문제 영역 */}
        <div className="problems-grid">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="problem-row">
              {row.map((p, i) => {
                const idx = rowIdx * 2 + i;
                const answer = answers[idx] || '';
                const isDivision = p.question.includes('÷') && !p.question.includes('/');
                const isDecimalDivision = (p.question.includes('소수') || p.question.match(/\d+\.\d+/) || p.question.includes('decimal_lv'));
                const isComparison = p.question.includes('□') && p.question.match(/\d+\s*□\s*\d+/);

                                                  return (
                   <div key={i} className="problem-item">
                                           <div className="problem-content" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap', minWidth: 0, width: '100%', overflow: 'visible' }}>
                       <span style={{ 
                         backgroundColor: '#3b82f6', 
                         color: 'white', 
                         padding: '4px 12px', 
                         borderRadius: '9999px', 
                         fontWeight: 'bold', 
                         fontSize: '14px' 
                       }}>
                         Q{idx + 1}
                       </span>
                                               <span style={{ 
                          fontSize: (isDivision && !isDecimalDivision) ? '13px' : 
                                   (p.question.includes('의 배수 중') || p.question.includes('의 약수 중')) ? '13px' : '18px', 
                          fontWeight: p.question.includes('의 배수 중') || p.question.includes('의 약수 중') ? '500' : '600', 
                          color: '#1f2937',
                          letterSpacing: '0.025em',
                          whiteSpace: 'nowrap',
                          flexShrink: 1,
                          maxWidth: (isDivision && !isDecimalDivision) ? '60%' : 
                                   (p.question.includes('의 배수 중') || p.question.includes('의 약수 중')) ? '70%' : 'none',
                          lineHeight: '1.3'
                        }}>
                          {renderWithFraction(p.question)}
                        </span>
                                               {/* 정수 나눗셈만 몫/나머지, 소수 나눗셈은 소수 한 칸만 */}
                        {isDivision && !isDecimalDivision ? (
                          <div className="division-input" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '2px',
                            flexShrink: 0,
                            minWidth: '120px'
                          }}>
                            <span className="division-label" style={{ fontSize: '11px' }}>({t('quotient')}:</span>
                            <input
                              type="text"
                              value={answer.q || ''}
                              onChange={e => handleDivisionChange(idx, 'q', e.target.value)}
                              className="division-field"
                              style={{ 
                                width: '35px', 
                                textAlign: 'center',
                                fontSize: '13px',
                                height: '24px',
                                border: '1px solid #bcd0f7',
                                borderRadius: '4px'
                              }}
                            />
                            <span className="division-label" style={{ fontSize: '11px' }}>{t('remainder')}:</span>
                            <input
                              type="text"
                              value={answer.r || ''}
                              onChange={e => handleDivisionChange(idx, 'r', e.target.value)}
                              className="division-field"
                              style={{ 
                                width: '35px', 
                                textAlign: 'center',
                                fontSize: '13px',
                                height: '24px',
                                border: '1px solid #bcd0f7',
                                borderRadius: '4px'
                              }}
                            />
                            <span className="division-label" style={{ fontSize: '11px' }}>)</span>
                          </div>
                        ) : (
                                                     <input
                             type="text"
                             value={answer}
                             onChange={e => handleAnswerChange(idx, e.target.value)}
                             className="answer-input"
                             placeholder={isComparison ? '□' : ''}
                             style={{ 
                               width: (p.question.includes('의 배수 중') || p.question.includes('의 약수 중')) ? '35px' : 
                                      p.question.length < 8 ? '50px' : p.question.length < 12 ? '60px' : '80px', 
                               textAlign: 'center',
                               minWidth: '35px',
                               maxWidth: '60px',
                               flexShrink: 0,
                               fontSize: '14px'
                             }}
                           />
                        )}
                     </div>
                   </div>
                 );
              })}
            </div>
          ))}
        </div>

        {/* 하단 버튼들 */}
        <div className="problem-buttons">
          <label className="answer-checkbox">
            <input
              type="checkbox"
              checked={includeAnswer}
              onChange={e => setIncludeAnswer(e.target.checked)}
            />
            <span>{t('includeAnswer')}</span>
          </label>
          <button className="problem-button" onClick={handlePdf}>
            {t('savePDF')}
          </button>
          <button className="problem-button" onClick={handleGrade}>
            {t('gradeProblems')}
          </button>
        </div>

        {/* 정답 확인 버튼 아래 광고 */}
        <div style={{ 
          marginTop: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <AdComponent 
            slot="problempage-banner-1" 
            size="banner"
          />
        </div>
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
        {/* 상단 제목 */}
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '3px solid #bbb', paddingBottom: 10, marginBottom: 18 }}>
          <div style={{ fontWeight: 900, fontSize: 18, background: '#eee', borderRadius: 6, padding: '2px 10px', marginRight: 12 }}>Caluri</div>
          <div style={{ fontWeight: 800, fontSize: 28, marginRight: 12 }}>{t('problemWorkbook')}</div>
          {/* 연산명 표시는 분수 문제일 때만 */}
          {problems.length > 0 && problems[0].question.includes('/') ? (
            <div style={{ fontWeight: 600, fontSize: 18, color: '#2563eb', marginRight: 12 }}>
              {problems[0].question.includes('+') ? t('fractionAddition')
                : problems[0].question.includes('-') ? t('fractionSubtraction')
                : problems[0].question.includes('×') ? t('fractionMultiplication')
                : problems[0].question.includes('÷') ? t('fractionDivision')
                : t('fractionOperation')}
            </div>
          ) : null}
          <div style={{ flex: 1 }} />
        </div>
        {/* 문제 2열 10행, 균등 분할 */}
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 850, marginTop: 8, marginBottom: 0 }}>
          {[0, 1].map(col => (
            <div key={col} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {pdfRows.map((row, rowIdx) => (
                row[col] ? (
                  <div key={rowIdx} style={{ minHeight: 36, paddingBottom: 8 }}>
                    {row[col].question.includes('÷ □') ? (
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                          Q{col === 0 ? rowIdx + 1 : rowIdx + 11}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-semibold text-gray-800">
                            {(() => {
                              const match = row[col].question.match(/([0-9]+) ÷ □ = \(몫: ([0-9]+), 나머지: ([0-9]+)\)/);
                              if (match) {
                                return `${match[1]} ÷ □ = ${t('quotient')} ${match[2]}, ${t('remainder')} ${match[3]}`;
                              }
                              return row[col].question;
                            })()}
                          </span>
                          <span className="border-b-2 border-gray-800 min-w-[60px] max-w-[80px] h-1">&nbsp;</span>
                        </div>
                      </div>
                    ) : (
                      <Question 
                        number={col === 0 ? rowIdx + 1 : rowIdx + 11} 
                        text={row[col].question} 
                      />
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
          {/* 상단 제목 */}
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #bbb', paddingBottom: 6, marginBottom: 10 }}>
            <div style={{ fontWeight: 900, fontSize: 15, background: '#eee', borderRadius: 6, padding: '2px 10px', marginRight: 8 }}>Caluri</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginRight: 8 }}>{t('problemWorkbook')}</div>
            {problems.length > 0 && problems[0].question.includes('/') ? (
              <div style={{ fontWeight: 600, fontSize: 13, color: '#2563eb', marginRight: 8 }}>
                {problems[0].question.includes('+') ? t('fractionAddition')
                  : problems[0].question.includes('-') ? t('fractionSubtraction')
                  : problems[0].question.includes('×') ? t('fractionMultiplication')
                  : problems[0].question.includes('÷') ? t('fractionDivision')
                  : t('fractionOperation')}
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
                    <div key={rowIdx} style={{ minHeight: 10, marginBottom: 2, padding: 0, lineHeight: 1.1 }}>
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold text-xs">
                          Q{col === 0 ? rowIdx + 1 : rowIdx + 11}
                        </span>
                        <span 
                          className="font-medium text-gray-800" 
                          style={{ 
                            fontSize: row[col].question.includes('의 배수 중') || row[col].question.includes('의 약수 중') ? '10px' : '12px',
                            fontWeight: row[col].question.includes('의 배수 중') || row[col].question.includes('의 약수 중') ? '500' : '600'
                          }}
                        >
                          {renderWithFraction(row[col].question)}
                        </span>
                        <span className="text-blue-600 font-bold text-xs ml-2">
                          {row[col].question.includes('÷') && typeof (row[col].answer as any) === 'object' && !row[col].question.includes('.')
                            ? `${t('quotient')}: ${(row[col].answer as any).q}, ${t('remainder')}: ${(row[col].answer as any).r}`
                            : renderWithFraction(getDisplayAnswer(row[col].answer))}
                        </span>
                      </div>
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
      {/* 하단 광고 */}
      <AdComponent slot="problempage-rectangle-1" size="rectangle" className="bottom-ad" />
    </div>
  );
};

export default ProblemPage; 