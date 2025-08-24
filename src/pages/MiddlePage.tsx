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
      { question: '주사위 1개를 던졌을 때 3이 나올 확률은?', answer: '1/6' },
      { question: '주사위 1개를 던졌을 때 짝수가 나올 확률은?', answer: '3/6' },
      { question: '주사위 1개를 던졌을 때 홀수가 나올 확률은?', answer: '3/6' },
      { question: '주사위 1개를 던졌을 때 5보다 큰 수가 나올 확률은?', answer: '1/6' },
      { question: '주사위 1개를 던졌을 때 3의 배수가 나올 확률은?', answer: '2/6' },
      { question: '주사위 1개를 던졌을 때 소수가 나올 확률은?', answer: '3/6' },
      { question: '주사위 1개를 던졌을 때 완전제곱수가 나올 확률은?', answer: '2/6' },
      
      // 동전 문제
      { question: '동전 1개를 던졌을 때 앞면이 나올 확률은?', answer: '1/2' },
      { question: '동전 1개를 던졌을 때 뒷면이 나올 확률은?', answer: '1/2' },
      
      // 색 공 뽑기 문제
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공 1개를 뽑았을 때 빨간 공이 나올 확률은?', answer: '3/5' },
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공 1개를 뽑았을 때 파란 공이 나올 확률은?', answer: '2/5' },
      { question: '노란 공 4개, 초록 공 1개가 들어있는 주머니에서 공 1개를 뽑았을 때 노란 공이 나올 확률은?', answer: '4/5' },
      { question: '흰 공 2개, 검은 공 3개가 들어있는 주머니에서 공 1개를 뽑았을 때 흰 공이 나올 확률은?', answer: '2/5' },
      { question: '빨간 공 1개, 파란 공 1개, 노란 공 1개가 들어있는 주머니에서 공 1개를 뽑았을 때 빨간 공이 나올 확률은?', answer: '1/3' },
      
      // 카드 문제
      { question: '하트 13장, 다이아몬드 13장, 스페이드 13장, 클럽 13장이 있는 카드 한 벌에서 카드 1장을 뽑았을 때 하트가 나올 확률은?', answer: '13/52' },
      { question: '카드 한 벌에서 카드 1장을 뽑았을 때 에이스가 나올 확률은?', answer: '4/52' },
      { question: '카드 한 벌에서 카드 1장을 뽑았을 때 킹이 나올 확률은?', answer: '4/52' },
      { question: '카드 한 벌에서 카드 1장을 뽑았을 때 그림카드(J, Q, K)가 나올 확률은?', answer: '12/52' },
      { question: '카드 한 벌에서 카드 1장을 뽑았을 때 숫자카드(2~10)가 나올 확률은?', answer: '36/52' },
      
      // 생활형 문제
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 한 명을 뽑았을 때 남학생이 나올 확률은?', answer: '15/35' },
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 한 명을 뽑았을 때 여학생이 나올 확률은?', answer: '20/35' },
      { question: '가챠에서 특별 아이템이 나올 확률이 5%일 때, 소수로 나타내면?', answer: '0.05' },
      { question: '가챠에서 희귀 아이템이 나올 확률이 10%일 때, 소수로 나타내면?', answer: '0.1' }
    ];
    
    const selected = simpleEvents[Math.floor(Math.random() * simpleEvents.length)];
    return { question: selected.question, answer: selected.answer, type: 'probability', level: 1 };
  } else if (level === 2) {
    // 중: 복합 사건 (2번 뽑기, 합 구하기, 순서 상관 없음)
    const compoundEvents = [
      // 주사위 복합 문제
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 7이 나올 확률은?', answer: '6/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 6이 나올 확률은?', answer: '5/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 8이 나올 확률은?', answer: '5/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 5이 나올 확률은?', answer: '4/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 9이 나올 확률은?', answer: '4/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 4이 나올 확률은?', answer: '3/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 10이 나올 확률은?', answer: '3/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 3이 나올 확률은?', answer: '2/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 11이 나올 확률은?', answer: '2/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 2이 나올 확률은?', answer: '1/36' },
      { question: '주사위 2개를 던졌을 때 두 눈의 합이 12이 나올 확률은?', answer: '1/36' },
      
      // 동전 복합 문제
      { question: '동전 2개를 던졌을 때 모두 앞면이 나올 확률은?', answer: '1/4' },
      { question: '동전 2개를 던졌을 때 모두 뒷면이 나올 확률은?', answer: '1/4' },
      { question: '동전 2개를 던졌을 때 앞면과 뒷면이 나올 확률은?', answer: '2/4' },
      { question: '동전 3개를 던졌을 때 모두 앞면이 나올 확률은?', answer: '1/8' },
      { question: '동전 3개를 던졌을 때 모두 뒷면이 나올 확률은?', answer: '1/8' },
      { question: '동전 3개를 던졌을 때 앞면이 2개 나올 확률은?', answer: '3/8' },
      { question: '동전 3개를 던졌을 때 앞면이 1개 나올 확률은?', answer: '3/8' },
      
      // 색 공 복합 문제 (복원 추출)
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣고 뽑기) 모두 빨간 공이 나올 확률은?', answer: '9/25' },
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣고 뽑기) 모두 파란 공이 나올 확률은?', answer: '4/25' },
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣고 뽑기) 빨간 공과 파란 공이 각각 1개씩 나올 확률은?', answer: '12/25' },
      { question: '노란 공 4개, 초록 공 1개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣고 뽑기) 모두 노란 공이 나올 확률은?', answer: '16/25' },
      { question: '노란 공 4개, 초록 공 1개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣고 뽑기) 모두 초록 공이 나올 확률은?', answer: '1/25' },
      
      // 카드 복합 문제
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣고 뽑기) 모두 하트가 나올 확률은?', answer: '169/2704' },
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣고 뽑기) 모두 에이스가 나올 확률은?', answer: '16/2704' },
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣고 뽑기) 모두 그림카드가 나올 확률은?', answer: '144/2704' },
      
      // 생활형 복합 문제
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 2명을 뽑을 때(뽑은 사람을 다시 넣고 뽑기) 모두 남학생이 나올 확률은?', answer: '225/1225' },
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 2명을 뽑을 때(뽑은 사람을 다시 넣고 뽑기) 모두 여학생이 나올 확률은?', answer: '400/1225' },
      { question: '가챠에서 특별 아이템이 나올 확률이 5%일 때, 2번 뽑을 때 모두 특별 아이템이 나올 확률은?', answer: '0.0025' },
      { question: '가챠에서 희귀 아이템이 나올 확률이 10%일 때, 2번 뽑을 때 모두 희귀 아이템이 나올 확률은?', answer: '0.01' }
    ];
    
    const selected = compoundEvents[Math.floor(Math.random() * compoundEvents.length)];
    return { question: selected.question, answer: selected.answer, type: 'probability', level: 2 };
  } else {
    // 상: 조건부 사건 (순서 고려, 적어도 1번 등)
    const conditionalEvents = [
      // 주사위 조건부 문제
      { question: '주사위 2개를 던졌을 때 첫 번째 주사위가 3이고 두 번째 주사위가 4가 나올 확률은?', answer: '1/36' },
      { question: '주사위 2개를 던졌을 때 첫 번째 주사위가 1이고 두 번째 주사위가 6이 나올 확률은?', answer: '1/36' },
      { question: '주사위 2개를 던졌을 때 첫 번째 주사위가 2이고 두 번째 주사위가 5가 나올 확률은?', answer: '1/36' },
      { question: '주사위 3개를 던졌을 때 적어도 하나가 6이 나올 확률은?', answer: '91/216' },
      { question: '주사위 3개를 던졌을 때 적어도 하나가 1이 나올 확률은?', answer: '91/216' },
      { question: '주사위 3개를 던졌을 때 모두 짝수가 나올 확률은?', answer: '27/216' },
      { question: '주사위 3개를 던졌을 때 모두 홀수가 나올 확률은?', answer: '27/216' },
      { question: '주사위 3개를 던졌을 때 정확히 2개가 짝수가 나올 확률은?', answer: '81/216' },
      { question: '주사위 3개를 던졌을 때 정확히 2개가 홀수가 나올 확률은?', answer: '81/216' },
      
      // 동전 조건부 문제
      { question: '동전 3개를 던졌을 때 첫 번째가 앞면, 두 번째가 뒷면, 세 번째가 앞면이 나올 확률은?', answer: '1/8' },
      { question: '동전 4개를 던졌을 때 적어도 하나가 앞면이 나올 확률은?', answer: '15/16' },
      { question: '동전 4개를 던졌을 때 적어도 하나가 뒷면이 나올 확률은?', answer: '15/16' },
      { question: '동전 4개를 던졌을 때 모두 앞면이 나올 확률은?', answer: '1/16' },
      { question: '동전 4개를 던졌을 때 모두 뒷면이 나올 확률은?', answer: '1/16' },
      { question: '동전 4개를 던졌을 때 정확히 3개가 앞면이 나올 확률은?', answer: '4/16' },
      { question: '동전 4개를 던졌을 때 정확히 3개가 뒷면이 나올 확률은?', answer: '4/16' },
      { question: '동전 4개를 던졌을 때 정확히 2개가 앞면이 나올 확률은?', answer: '6/16' },
      
      // 색 공 조건부 문제 (비복원 추출)
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣지 않고 뽑기) 모두 빨간 공이 나올 확률은?', answer: '6/20' },
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣지 않고 뽑기) 모두 파란 공이 나올 확률은?', answer: '2/20' },
      { question: '빨간 공 3개, 파란 공 2개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣지 않고 뽑기) 빨간 공과 파란 공이 각각 1개씩 나올 확률은?', answer: '12/20' },
      { question: '노란 공 4개, 초록 공 1개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣지 않고 뽑기) 모두 노란 공이 나올 확률은?', answer: '12/20' },
      { question: '노란 공 4개, 초록 공 1개가 들어있는 주머니에서 공을 2번 뽑을 때(뽑은 공을 다시 넣지 않고 뽑기) 노란 공과 초록 공이 각각 1개씩 나올 확률은?', answer: '8/20' },
      
      // 카드 조건부 문제 (비복원 추출)
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣지 않고 뽑기) 모두 하트가 나올 확률은?', answer: '156/2652' },
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣지 않고 뽑기) 모두 에이스가 나올 확률은?', answer: '12/2652' },
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣지 않고 뽑기) 모두 그림카드가 나올 확률은?', answer: '132/2652' },
      { question: '카드 한 벌에서 카드를 2장 뽑을 때(뽑은 카드를 다시 넣지 않고 뽑기) 첫 번째는 하트, 두 번째는 다이아몬드가 나올 확률은?', answer: '169/2652' },
      
      // 생활형 조건부 문제
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 2명을 뽑을 때(뽑은 사람을 다시 넣지 않고 뽑기) 모두 남학생이 나올 확률은?', answer: '210/1190' },
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 2명을 뽑을 때(뽑은 사람을 다시 넣지 않고 뽑기) 모두 여학생이 나올 확률은?', answer: '380/1190' },
      { question: '학급에 남학생 15명, 여학생 20명이 있을 때 무작위로 2명을 뽑을 때(뽑은 사람을 다시 넣지 않고 뽑기) 남학생과 여학생이 각각 1명씩 나올 확률은?', answer: '600/1190' },
      { question: '가챠에서 특별 아이템이 나올 확률이 5%일 때, 3번 뽑을 때 적어도 하나가 특별 아이템이 나올 확률은?', answer: '0.142625' },
      { question: '가챠에서 희귀 아이템이 나올 확률이 10%일 때, 3번 뽑을 때 적어도 하나가 희귀 아이템이 나올 확률은?', answer: '0.271' }
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
