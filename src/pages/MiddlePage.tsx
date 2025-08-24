import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeButton from '../components/HomeButton';
import AdComponent from '../components/AdComponent';
import LanguageSelector from '../components/LanguageSelector';
import './MiddlePage.css';

// 중등 수학 문제 생성 함수들
function generateIntegerProblems(level: number): { question: string; answer: number | string; type: string; level: number } {
  if (level === 1) {
    // Simple integer arithmetic with negative numbers
    const a = Math.floor(Math.random() * 20) - 10; // -10 to 9
    const b = Math.floor(Math.random() * 20) - 10; // -10 to 9
    const operations = ['+', '-'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let question = '';
    let answer = 0;
    
    if (op === '+') {
      question = `${a} + ${b} =`;
      answer = a + b;
    } else {
      question = `${a} - ${b} =`;
      answer = a - b;
    }
    
    return { question, answer, type: 'integer', level: 1 };
  } else if (level === 2) {
    // Integer × Integer with negatives
    const a = Math.floor(Math.random() * 10) - 5; // -5 to 4
    const b = Math.floor(Math.random() * 10) - 5; // -5 to 4
    
    const question = `(${a}) × ${b} =`;
    const answer = a * b;
    
    return { question, answer, type: 'integer', level: 2 };
  } else {
    // Simple fractions addition/subtraction
    let denom1 = Math.floor(Math.random() * 8) + 2; // 2-9
    let numer1 = Math.floor(Math.random() * denom1) + 1; // 1 to denom1-1
    let denom2 = Math.floor(Math.random() * 8) + 2; // 2-9
    let numer2 = Math.floor(Math.random() * denom2) + 1; // 1 to denom2-1
    
    const operations = ['+', '-'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let question = '';
    let answer = '';
    
    if (op === '+') {
      question = `${numer1}/${denom1} + ${numer2}/${denom2}`;
      const resNumer = numer1 * denom2 + numer2 * denom1;
      const resDenom = denom1 * denom2;
      answer = `${resNumer}/${resDenom}`;
    } else {
      // Ensure first fraction is larger
      if (numer1 * denom2 <= numer2 * denom1) {
        const temp = numer1;
        numer1 = numer2;
        numer2 = temp;
        const temp2 = denom1;
        denom1 = denom2;
        denom2 = temp2;
      }
      question = `${numer1}/${denom1} - ${numer2}/${denom2}`;
      const resNumer = numer1 * denom2 - numer2 * denom1;
      const resDenom = denom1 * denom2;
      answer = `${resNumer}/${resDenom}`;
    }
    
    return { question, answer, type: 'integer', level: 3 };
  }
}

function generatePowerProblems(level: number): { question: string; answer: number; type: string; level: number } {
  if (level === 1) {
    // Small integer powers - 더 다양한 문제 생성
    const problems = [
      { base: 2, exp: 2, answer: 4 },
      { base: 2, exp: 3, answer: 8 },
      { base: 2, exp: 4, answer: 16 },
      { base: 3, exp: 2, answer: 9 },
      { base: 3, exp: 3, answer: 27 },
      { base: 4, exp: 2, answer: 16 },
      { base: 4, exp: 3, answer: 64 },
      { base: 5, exp: 2, answer: 25 },
      { base: 5, exp: 3, answer: 125 },
      { base: 6, exp: 2, answer: 36 },
      { base: 7, exp: 2, answer: 49 },
      { base: 8, exp: 2, answer: 64 },
      { base: 9, exp: 2, answer: 81 },
      { base: 10, exp: 2, answer: 100 },
      { base: 2, exp: 5, answer: 32 },
      { base: 3, exp: 4, answer: 81 },
      { base: 4, exp: 4, answer: 256 },
      { base: 5, exp: 4, answer: 625 },
      { base: 6, exp: 3, answer: 216 },
      { base: 7, exp: 3, answer: 343 }
    ];
    
    const selected = problems[Math.floor(Math.random() * problems.length)];
    const question = `${selected.base}^${selected.exp} =`;
    
    return { question, answer: selected.answer, type: 'power', level: 1 };
  } else if (level === 2) {
    // Negative base with powers - 더 다양한 문제 생성
    const problems = [
      { base: -1, exp: 2, answer: 1 },
      { base: -1, exp: 3, answer: -1 },
      { base: -1, exp: 4, answer: 1 },
      { base: -2, exp: 2, answer: 4 },
      { base: -2, exp: 3, answer: -8 },
      { base: -2, exp: 4, answer: 16 },
      { base: -3, exp: 2, answer: 9 },
      { base: -3, exp: 3, answer: -27 },
      { base: -3, exp: 4, answer: 81 },
      { base: -4, exp: 2, answer: 16 },
      { base: -4, exp: 3, answer: -64 },
      { base: -5, exp: 2, answer: 25 },
      { base: -5, exp: 3, answer: -125 },
      { base: -6, exp: 2, answer: 36 },
      { base: -7, exp: 2, answer: 49 },
      { base: -8, exp: 2, answer: 64 },
      { base: -9, exp: 2, answer: 81 },
      { base: -10, exp: 2, answer: 100 },
      { base: -2, exp: 5, answer: -32 },
      { base: -3, exp: 4, answer: 81 }
    ];
    
    const selected = problems[Math.floor(Math.random() * problems.length)];
    const question = `(${selected.base})^${selected.exp} =`;
    
    return { question, answer: selected.answer, type: 'power', level: 2 };
  } else {
    // Square root of perfect squares - 더 다양한 문제 생성
    const problems = [
      { square: 1, answer: 1 },
      { square: 4, answer: 2 },
      { square: 9, answer: 3 },
      { square: 16, answer: 4 },
      { square: 25, answer: 5 },
      { square: 36, answer: 6 },
      { square: 49, answer: 7 },
      { square: 64, answer: 8 },
      { square: 81, answer: 9 },
      { square: 100, answer: 10 },
      { square: 121, answer: 11 },
      { square: 144, answer: 12 },
      { square: 169, answer: 13 },
      { square: 196, answer: 14 },
      { square: 225, answer: 15 },
      { square: 256, answer: 16 },
      { square: 289, answer: 17 },
      { square: 324, answer: 18 },
      { square: 361, answer: 19 },
      { square: 400, answer: 20 }
    ];
    
    const selected = problems[Math.floor(Math.random() * problems.length)];
    const question = `√${selected.square} =`;
    
    return { question, answer: selected.answer, type: 'power', level: 3 };
  }
}

function generateEquationProblems(level: number): { question: string; answer: number; type: string; level: number } {
  if (level === 1) {
    // Solve for x in a simple equation
    const a = Math.floor(Math.random() * 5) + 1; // 1-5
    const b = Math.floor(Math.random() * 10) + 1; // 1-10
    const c = Math.floor(Math.random() * 10) + 1; // 1-10
    
    // 1x를 x로 표시
    const aDisplay = a === 1 ? 'x' : `${a}x`;
    const question = `${aDisplay} + ${b} = ${c}`;
    const answer = (c - b) / a;
    
    return { question, answer, type: 'equation', level: 1 };
  } else if (level === 2) {
    // Slightly harder with subtraction or division
    const a = Math.floor(Math.random() * 5) + 1; // 1-5
    const b = Math.floor(Math.random() * 10) + 1; // 1-10
    const c = Math.floor(Math.random() * 10) + 1; // 1-10
    
    const operations = ['-', '/'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let question = '';
    let answer = 0;
    
    // 1x를 x로 표시
    const aDisplay = a === 1 ? 'x' : `${a}x`;
    
    if (op === '-') {
      question = `${aDisplay} - ${b} = ${c}`;
      answer = (c + b) / a;
    } else {
      question = `${aDisplay} ÷ ${b} = ${c}`;
      answer = c * b / a;
    }
    
    return { question, answer, type: 'equation', level: 2 };
  } else {
    // Equation with parentheses
    const a = Math.floor(Math.random() * 3) + 1; // 1-3
    const b = Math.floor(Math.random() * 5) + 1; // 1-5
    const c = Math.floor(Math.random() * 10) + 1; // 1-10
    
    // 계수가 1이면 괄호 앞의 1을 제거
    const question = a === 1 ? `(x + ${b}) = ${c}` : `${a}(x + ${b}) = ${c}`;
    const answer = (c / a) - b;
    
    return { question, answer, type: 'equation', level: 3 };
  }
}

function generateSystemProblems(level: number): { question: string; answer: string; type: string; level: number } {
  if (level === 1) {
    // Simple system with clear integer solution
    const x = Math.floor(Math.random() * 5) + 1; // 1-5
    const y = Math.floor(Math.random() * 5) + 1; // 1-5
    
    const question = `x + y = ${x + y}, x - y = ${x - y}`;
    const answer = `x=${x}, y=${y}`;
    
    return { question, answer, type: 'system', level: 1 };
  } else if (level === 2) {
    // Different coefficients
    const x = Math.floor(Math.random() * 4) + 1; // 1-4
    const y = Math.floor(Math.random() * 4) + 1; // 1-4
    const a = Math.floor(Math.random() * 3) + 2; // 2-4
    
    const question = `${a}x + y = ${a * x + y}, x - y = ${x - y}`;
    const answer = `x=${x}, y=${y}`;
    
    return { question, answer, type: 'system', level: 2 };
  } else {
    // Larger but still solvable by substitution/elimination
    const x = Math.floor(Math.random() * 4) + 1; // 1-4
    const y = Math.floor(Math.random() * 4) + 1; // 1-4
    const a = Math.floor(Math.random() * 3) + 2; // 2-4
    const b = Math.floor(Math.random() * 3) + 2; // 2-4
    
    const question = `${a}x + ${b}y = ${a * x + b * y}, x - y = ${x - y}`;
    const answer = `x=${x}, y=${y}`;
    
    return { question, answer, type: 'system', level: 3 };
  }
}

function generateFunctionProblems(level: number): { question: string; answer: number; type: string; level: number } {
  if (level === 1) {
    // Substitute x into y=ax+b
    const a = Math.floor(Math.random() * 5) + 1; // 1-5
    const b = Math.floor(Math.random() * 10) + 1; // 1-10
    const x = Math.floor(Math.random() * 10) + 1; // 1-10
    
    const question = `y = ${a}x + ${b}, x = ${x} → y = ?`;
    const answer = a * x + b;
    
    return { question, answer, type: 'function', level: 1 };
  } else if (level === 2) {
    // Negative slope
    const a = -(Math.floor(Math.random() * 5) + 1); // -1 to -5
    const b = Math.floor(Math.random() * 10) + 1; // 1-10
    const x = Math.floor(Math.random() * 10) + 1; // 1-10
    
    const question = `y = ${a}x + ${b}, x = ${x} → y = ?`;
    const answer = a * x + b;
    
    return { question, answer, type: 'function', level: 2 };
  } else {
    // With larger numbers
    const a = Math.floor(Math.random() * 8) + 2; // 2-9
    const b = Math.floor(Math.random() * 15) + 1; // 1-15
    const x = Math.floor(Math.random() * 10) + 1; // 1-10
    
    const question = `y = ${a}x - ${b}, x = ${x} → y = ?`;
    const answer = a * x - b;
    
    return { question, answer, type: 'function', level: 3 };
  }
}

function generateProbabilityProblems(level: number): { question: string; answer: string; type: string; level: number } {
  if (level === 1) {
    // 하: 단순 사건 (주사위 1개, 공 1개 뽑기 등)
    const simpleEvents = [
      // 주사위 문제
      { question: '주사위에서 3이 나올 확률', answer: '1/6' },
      { question: '주사위에서 짝수가 나올 확률', answer: '3/6' },
      { question: '주사위에서 홀수가 나올 확률', answer: '3/6' },
      { question: '주사위에서 5보다 큰 확률', answer: '1/6' },
      { question: '주사위에서 3의 배수 확률', answer: '2/6' },
      { question: '주사위에서 소수 확률', answer: '3/6' },
      { question: '주사위에서 완전제곱수 확률', answer: '2/6' },
      { question: '주사위에서 1이 나올 확률', answer: '1/6' },
      { question: '주사위에서 2가 나올 확률', answer: '1/6' },
      { question: '주사위에서 4가 나올 확률', answer: '1/6' },
      { question: '주사위에서 5가 나올 확률', answer: '1/6' },
      { question: '주사위에서 6이 나올 확률', answer: '1/6' },
      { question: '주사위에서 2의 배수 확률', answer: '3/6' },
      { question: '주사위에서 4의 배수 확률', answer: '1/6' },
      { question: '주사위에서 6의 배수 확률', answer: '1/6' },
      
      // 동전 문제
      { question: '동전에서 앞면 확률', answer: '1/2' },
      { question: '동전에서 뒷면 확률', answer: '1/2' },
      
      // 색 공 뽑기 문제
      { question: '빨간공 3개, 파란공 2개에서 빨간공 확률', answer: '3/5' },
      { question: '빨간공 3개, 파란공 2개에서 파란공 확률', answer: '2/5' },
      { question: '노란공 4개, 초록공 1개에서 노란공 확률', answer: '4/5' },
      { question: '흰공 2개, 검은공 3개에서 흰공 확률', answer: '2/5' },
      { question: '빨간공 1개, 파란공 1개, 노란공 1개에서 빨간공 확률', answer: '1/3' },
      { question: '빨간공 2개, 파란공 3개에서 빨간공 확률', answer: '2/5' },
      { question: '빨간공 2개, 파란공 3개에서 파란공 확률', answer: '3/5' },
      { question: '노란공 3개, 초록공 2개에서 노란공 확률', answer: '3/5' },
      { question: '노란공 3개, 초록공 2개에서 초록공 확률', answer: '2/5' },
      { question: '흰공 1개, 검은공 4개에서 흰공 확률', answer: '1/5' },
      { question: '흰공 1개, 검은공 4개에서 검은공 확률', answer: '4/5' },
      { question: '빨간공 1개, 파란공 1개에서 빨간공 확률', answer: '1/2' },
      { question: '빨간공 1개, 파란공 1개에서 파란공 확률', answer: '1/2' },
      
      // 카드 문제
      { question: '카드에서 하트 확률', answer: '13/52' },
      { question: '카드에서 에이스 확률', answer: '4/52' },
      { question: '카드에서 킹 확률', answer: '4/52' },
      { question: '카드에서 그림카드 확률', answer: '12/52' },
      { question: '카드에서 숫자카드 확률', answer: '36/52' },
      { question: '카드에서 다이아몬드 확률', answer: '13/52' },
      { question: '카드에서 스페이드 확률', answer: '13/52' },
      { question: '카드에서 클럽 확률', answer: '13/52' },
      { question: '카드에서 퀸 확률', answer: '4/52' },
      { question: '카드에서 잭 확률', answer: '4/52' },
      
      // 생활형 문제
      { question: '남학생 15명, 여학생 20명에서 남학생 확률', answer: '15/35' },
      { question: '남학생 15명, 여학생 20명에서 여학생 확률', answer: '20/35' },
      { question: '가챠 특별아이템 5% 확률을 소수로', answer: '0.05' },
      { question: '가챠 희귀아이템 10% 확률을 소수로', answer: '0.1' },
      { question: '가챠 일반아이템 85% 확률을 소수로', answer: '0.85' },
      { question: '가챠 레어아이템 15% 확률을 소수로', answer: '0.15' }
    ];
    
    const selected = simpleEvents[Math.floor(Math.random() * simpleEvents.length)];
    return { question: selected.question, answer: selected.answer, type: 'probability', level: 1 };
  } else if (level === 2) {
    // 중: 복합 사건 (2번 뽑기, 합 구하기, 순서 상관 없음)
    const compoundEvents = [
      // 주사위 복합 문제
      { question: '주사위 2개 합이 7 확률', answer: '6/36' },
      { question: '주사위 2개 합이 6 확률', answer: '5/36' },
      { question: '주사위 2개 합이 8 확률', answer: '5/36' },
      { question: '주사위 2개 합이 5 확률', answer: '4/36' },
      { question: '주사위 2개 합이 9 확률', answer: '4/36' },
      { question: '주사위 2개 합이 4 확률', answer: '3/36' },
      { question: '주사위 2개 합이 10 확률', answer: '3/36' },
      { question: '주사위 2개 합이 3 확률', answer: '2/36' },
      { question: '주사위 2개 합이 11 확률', answer: '2/36' },
      { question: '주사위 2개 합이 2 확률', answer: '1/36' },
      { question: '주사위 2개 합이 12 확률', answer: '1/36' },
      
      // 동전 복합 문제
      { question: '동전 2개 모두 앞면 확률', answer: '1/4' },
      { question: '동전 2개 모두 뒷면 확률', answer: '1/4' },
      { question: '동전 2개 앞뒤 확률', answer: '2/4' },
      { question: '동전 3개 모두 앞면 확률', answer: '1/8' },
      { question: '동전 3개 모두 뒷면 확률', answer: '1/8' },
      { question: '동전 3개 앞면 2개 확률', answer: '3/8' },
      { question: '동전 3개 앞면 1개 확률', answer: '3/8' },
      { question: '동전 4개 모두 앞면 확률', answer: '1/16' },
      { question: '동전 4개 모두 뒷면 확률', answer: '1/16' },
      { question: '동전 4개 앞면 3개 확률', answer: '4/16' },
      { question: '동전 4개 앞면 2개 확률', answer: '6/16' },
      { question: '동전 4개 앞면 1개 확률', answer: '4/16' },
      
      // 색 공 복합 문제 (복원 추출)
      { question: '빨간공 3개, 파란공 2개 2번 뽑기 모두 빨간공 확률', answer: '9/25' },
      { question: '빨간공 3개, 파란공 2개 2번 뽑기 모두 파란공 확률', answer: '4/25' },
      { question: '빨간공 3개, 파란공 2개 2번 뽑기 빨파 각1개 확률', answer: '12/25' },
      { question: '노란공 4개, 초록공 1개 2번 뽑기 모두 노란공 확률', answer: '16/25' },
      { question: '노란공 4개, 초록공 1개 2번 뽑기 모두 초록공 확률', answer: '1/25' },
      { question: '노란공 4개, 초록공 1개 2번 뽑기 노초 각1개 확률', answer: '8/25' },
      { question: '빨간공 2개, 파란공 3개 2번 뽑기 모두 빨간공 확률', answer: '4/25' },
      { question: '빨간공 2개, 파란공 3개 2번 뽑기 모두 파란공 확률', answer: '9/25' },
      { question: '빨간공 2개, 파란공 3개 2번 뽑기 빨파 각1개 확률', answer: '12/25' },
      { question: '노란공 3개, 초록공 2개 2번 뽑기 모두 노란공 확률', answer: '9/25' },
      { question: '노란공 3개, 초록공 2개 2번 뽑기 모두 초록공 확률', answer: '4/25' },
      { question: '노란공 3개, 초록공 2개 2번 뽑기 노초 각1개 확률', answer: '12/25' },
      
      // 카드 복합 문제
      { question: '카드 2장 모두 하트 확률', answer: '169/2704' },
      { question: '카드 2장 모두 에이스 확률', answer: '16/2704' },
      { question: '카드 2장 모두 그림카드 확률', answer: '144/2704' },
      { question: '카드 2장 모두 킹 확률', answer: '16/2704' },
      { question: '카드 2장 모두 퀸 확률', answer: '16/2704' },
      { question: '카드 2장 모두 잭 확률', answer: '16/2704' },
      { question: '카드 2장 모두 다이아몬드 확률', answer: '169/2704' },
      { question: '카드 2장 모두 스페이드 확률', answer: '169/2704' },
      { question: '카드 2장 모두 클럽 확률', answer: '169/2704' },
      
      // 생활형 복합 문제
      { question: '남학생 15명, 여학생 20명 2명 뽑기 모두 남학생 확률', answer: '225/1225' },
      { question: '남학생 15명, 여학생 20명 2명 뽑기 모두 여학생 확률', answer: '400/1225' },
      { question: '가챠 특별아이템 5% 2번 뽑기 모두 확률', answer: '0.0025' },
      { question: '가챠 희귀아이템 10% 2번 뽑기 모두 확률', answer: '0.01' },
      { question: '가챠 레어아이템 15% 2번 뽑기 모두 확률', answer: '0.0225' },
      { question: '가챠 일반아이템 85% 2번 뽑기 모두 확률', answer: '0.7225' }
    ];
    
    const selected = compoundEvents[Math.floor(Math.random() * compoundEvents.length)];
    return { question: selected.question, answer: selected.answer, type: 'probability', level: 2 };
  } else {
    // 상: 조건부 사건 (순서 고려, 적어도 1번 등)
    const conditionalEvents = [
      // 주사위 조건부 문제
      { question: '주사위 2개 첫번째 3, 두번째 4 확률', answer: '1/36' },
      { question: '주사위 2개 첫번째 1, 두번째 6 확률', answer: '1/36' },
      { question: '주사위 2개 첫번째 2, 두번째 5 확률', answer: '1/36' },
      { question: '주사위 3개 적어도 하나 6 확률', answer: '91/216' },
      { question: '주사위 3개 적어도 하나 1 확률', answer: '91/216' },
      { question: '주사위 3개 모두 짝수 확률', answer: '27/216' },
      { question: '주사위 3개 모두 홀수 확률', answer: '27/216' },
      { question: '주사위 3개 정확히 2개 짝수 확률', answer: '81/216' },
      { question: '주사위 3개 정확히 2개 홀수 확률', answer: '81/216' },
      { question: '주사위 3개 정확히 1개 짝수 확률', answer: '81/216' },
      { question: '주사위 3개 정확히 1개 홀수 확률', answer: '81/216' },
      { question: '주사위 3개 모두 3의 배수 확률', answer: '8/216' },
      { question: '주사위 3개 모두 소수 확률', answer: '27/216' },
      
      // 동전 조건부 문제
      { question: '동전 3개 앞뒤앞 순서 확률', answer: '1/8' },
      { question: '동전 4개 적어도 하나 앞면 확률', answer: '15/16' },
      { question: '동전 4개 적어도 하나 뒷면 확률', answer: '15/16' },
      { question: '동전 4개 모두 앞면 확률', answer: '1/16' },
      { question: '동전 4개 모두 뒷면 확률', answer: '1/16' },
      { question: '동전 4개 정확히 3개 앞면 확률', answer: '4/16' },
      { question: '동전 4개 정확히 3개 뒷면 확률', answer: '4/16' },
      { question: '동전 4개 정확히 2개 앞면 확률', answer: '6/16' },
      { question: '동전 4개 정확히 1개 앞면 확률', answer: '4/16' },
      { question: '동전 4개 정확히 1개 뒷면 확률', answer: '4/16' },
      
      // 색 공 조건부 문제 (비복원 추출)
      { question: '빨간공 3개, 파란공 2개 2번 뽑기 모두 빨간공 확률', answer: '6/20' },
      { question: '빨간공 3개, 파란공 2개 2번 뽑기 모두 파란공 확률', answer: '2/20' },
      { question: '빨간공 3개, 파란공 2개 2번 뽑기 빨파 각1개 확률', answer: '12/20' },
      { question: '노란공 4개, 초록공 1개 2번 뽑기 모두 노란공 확률', answer: '12/20' },
      { question: '노란공 4개, 초록공 1개 2번 뽑기 노초 각1개 확률', answer: '8/20' },
      { question: '빨간공 2개, 파란공 3개 2번 뽑기 모두 빨간공 확률', answer: '2/20' },
      { question: '빨간공 2개, 파란공 3개 2번 뽑기 모두 파란공 확률', answer: '6/20' },
      { question: '빨간공 2개, 파란공 3개 2번 뽑기 빨파 각1개 확률', answer: '12/20' },
      { question: '노란공 3개, 초록공 2개 2번 뽑기 모두 노란공 확률', answer: '6/20' },
      { question: '노란공 3개, 초록공 2개 2번 뽑기 모두 초록공 확률', answer: '2/20' },
      { question: '노란공 3개, 초록공 2개 2번 뽑기 노초 각1개 확률', answer: '12/20' },
      
      // 카드 조건부 문제 (비복원 추출)
      { question: '카드 2장 모두 하트 확률', answer: '156/2652' },
      { question: '카드 2장 모두 에이스 확률', answer: '12/2652' },
      { question: '카드 2장 모두 그림카드 확률', answer: '132/2652' },
      { question: '카드 2장 첫번째 하트, 두번째 다이아몬드 확률', answer: '169/2652' },
      { question: '카드 2장 모두 킹 확률', answer: '12/2652' },
      { question: '카드 2장 모두 퀸 확률', answer: '12/2652' },
      { question: '카드 2장 모두 잭 확률', answer: '12/2652' },
      { question: '카드 2장 모두 다이아몬드 확률', answer: '156/2652' },
      { question: '카드 2장 모두 스페이드 확률', answer: '156/2652' },
      { question: '카드 2장 모두 클럽 확률', answer: '156/2652' },
      
      // 생활형 조건부 문제
      { question: '남학생 15명, 여학생 20명 2명 뽑기 모두 남학생 확률', answer: '210/1190' },
      { question: '남학생 15명, 여학생 20명 2명 뽑기 모두 여학생 확률', answer: '380/1190' },
      { question: '남학생 15명, 여학생 20명 2명 뽑기 남여 각1명 확률', answer: '600/1190' },
      { question: '가챠 특별아이템 5% 3번 뽑기 적어도 하나 확률', answer: '0.142625' },
      { question: '가챠 희귀아이템 10% 3번 뽑기 적어도 하나 확률', answer: '0.271' },
      { question: '가챠 레어아이템 15% 3번 뽑기 적어도 하나 확률', answer: '0.385875' },
      { question: '가챠 일반아이템 85% 3번 뽑기 적어도 하나 확률', answer: '0.996625' }
    ];
    
    const selected = conditionalEvents[Math.floor(Math.random() * conditionalEvents.length)];
    return { question: selected.question, answer: selected.answer, type: 'probability', level: 3 };
  }
}

// 문제 생성 함수 (카테고리별, 레벨별)
function generateMiddleProblems(
  type: string,
  level: number,
  count: number = 20,
): { question: string; answer: any; type: string; level: number }[] {
  const problems = [];
  const problemSet = new Set(); // 중복 방지용
  let tryCount = 0;
  
  while (problems.length < count && tryCount < count * 10) {
    tryCount++;
    let problem;
    
    if (type === 'integer') {
      problem = generateIntegerProblems(level);
    } else if (type === 'power') {
      problem = generatePowerProblems(level);
    } else if (type === 'equation') {
      problem = generateEquationProblems(level);
    } else if (type === 'system') {
      problem = generateSystemProblems(level);
    } else if (type === 'function') {
      problem = generateFunctionProblems(level);
    } else if (type === 'probability') {
      problem = generateProbabilityProblems(level);
    } else {
      continue;
    }
    
    // 중복 체크
    if (problemSet.has(problem.question)) continue;
    problemSet.add(problem.question);
    problems.push(problem);
  }
  
  return problems;
}



// 중등 문제 유형들
const getIntegerCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('integers')} Lv1`, value: 'integer_lv1' },
  { label: `${t('integers')} Lv2`, value: 'integer_lv2' },
  { label: `${t('integers')} Lv3`, value: 'integer_lv3' },
];

const getPowerCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('exponents')} Lv1`, value: 'power_lv1' },
  { label: `${t('exponents')} Lv2`, value: 'power_lv2' },
  { label: `${t('exponents')} Lv3`, value: 'power_lv3' },
];

const getEquationCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('equations')} Lv1`, value: 'equation_lv1' },
  { label: `${t('equations')} Lv2`, value: 'equation_lv2' },
  { label: `${t('equations')} Lv3`, value: 'equation_lv3' },
];

const getSystemCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('systems')} Lv1`, value: 'system_lv1' },
  { label: `${t('systems')} Lv2`, value: 'system_lv2' },
  { label: `${t('systems')} Lv3`, value: 'system_lv3' },
];

const getFunctionCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('functions')} Lv1`, value: 'function_lv1' },
  { label: `${t('functions')} Lv2`, value: 'function_lv2' },
  { label: `${t('functions')} Lv3`, value: 'function_lv3' },
];

const getProbabilityCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('probability')} Lv1`, value: 'probability_lv1' },
  { label: `${t('probability')} Lv2`, value: 'probability_lv2' },
  { label: `${t('probability')} Lv3`, value: 'probability_lv3' },
];

function getFilteredMiddleProblemTypes(category: string, t: any) {
  if (category === 'integer') {
    return getIntegerCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (category === 'power') {
    return getPowerCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (category === 'equation') {
    return getEquationCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (category === 'system') {
    return getSystemCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (category === 'function') {
    return getFunctionCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (category === 'probability') {
    return getProbabilityCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  return [];
}

interface MiddlePageProps {
}

const MiddlePage: React.FC<MiddlePageProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // localStorage에서 이전 선택 상태 복원
  const [category, setCategory] = useState(() => {
    const saved = localStorage.getItem('middleCategory');
    return saved || 'integer';
  });
  const [type, setType] = useState(() => {
    const saved = localStorage.getItem('middleType');
    return saved || 'integer_lv1';
  });
  const [useLimit, setUseLimit] = useState(false);
  const [limit, setLimit] = useState(5);
  const [problemCount, setProblemCount] = useState(20);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const level = parseInt(type.split('_')[1].replace('lv', ''));
    const problems = generateMiddleProblems(category, level, problemCount);
    localStorage.setItem('problems', JSON.stringify(problems));
    localStorage.setItem('limit', useLimit ? String(limit * 60) : '');
    // 현재 선택 상태 저장
    localStorage.setItem('middleCategory', category);
    localStorage.setItem('middleType', type);
    navigate('/middle/problems');
  };

  const handleLimitChange = (delta: number) => {
    setLimit(prev => Math.max(1, prev + delta));
  };

  React.useEffect(() => {
    const filtered = getFilteredMiddleProblemTypes(category, t);
    if (filtered.length > 0) {
      setType(filtered[0].value);
    }
  }, [category, t]);

  const categoryTypes = [
    { label: t('integers'), value: 'integer' },
    { label: t('exponents'), value: 'power' },
    { label: t('equations'), value: 'equation' },
    { label: t('systems'), value: 'system' },
    { label: t('functions'), value: 'function' },
    { label: t('probability'), value: 'probability' },
  ];

  return (
    <div className="middle-page">
      <div className="header">
        <HomeButton />
        <LanguageSelector />
      </div>
      {/* 상단 광고 */}
      <AdComponent slot="middlepage-banner-1" size="banner" className="top-ad" />
      <form onSubmit={handleGenerate} className="middle-form">
        <div className="middle-emoji">📖</div>
        <h2 className="middle-title">
          {t('middleTitle')}
        </h2>
        
        {/* 카테고리 선택 */}
        <div className="form-group">
          <label className="form-label">{t('category')}</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="form-select">
            {categoryTypes.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        
        {/* 문제 유형 */}
        <div className="form-group">
          <label className="form-label">{t('problemType')}</label>
          <select value={type} onChange={e => setType(e.target.value)} className="form-select">
            {getFilteredMiddleProblemTypes(category, t).map(problemType => (
              <option key={problemType.value} value={problemType.value}>{problemType.label}</option>
            ))}
          </select>
        </div>
        
        {/* 문제 수 선택 */}
        <div className="form-group">
          <label className="form-label">문제 수:</label>
          <select value={problemCount} onChange={e => setProblemCount(Number(e.target.value))} className="form-select">
            <option value={20}>20문제</option>
            <option value={40}>40문제</option>
            <option value={60}>60문제</option>
            <option value={80}>80문제</option>
            <option value={100}>100문제</option>
          </select>
        </div>
        
        {/* 제한 시간 */}
        <div className="time-limit-group">
          <label className="form-label">{t('timeLimit')}</label>
          <div className="time-limit-row">
            <div className="time-limit-checkbox">
              <input type="checkbox" checked={useLimit} onChange={e => setUseLimit(e.target.checked)} />
              <span style={{ color: useLimit ? '#222' : '#aaa', fontWeight: 500 }}>{t('useTimeLimit')}</span>
            </div>
            <input type="number" min={1} value={limit} disabled={!useLimit} onChange={e => setLimit(Math.max(1, Number(e.target.value)))} className="time-limit-input" />
            <div className="time-limit-buttons">
              <button type="button" disabled={!useLimit} onClick={() => handleLimitChange(1)} className="time-limit-button">▲</button>
              <button type="button" disabled={!useLimit} onClick={() => handleLimitChange(-1)} className="time-limit-button">▼</button>
            </div>
            <span style={{ color: useLimit ? '#222' : '#aaa', fontWeight: 500 }}>{t('minutes')}</span>
          </div>
        </div>
        <button type="submit" className="submit-button">{t('generateProblems')}</button>
      </form>
      {/* 하단 광고 */}
      <AdComponent slot="middlepage-rectangle-1" size="rectangle" className="bottom-ad" />
    </div>
  );
};

export default MiddlePage;
