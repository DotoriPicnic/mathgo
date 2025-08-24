import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeButton from '../components/HomeButton';
import AdComponent from '../components/AdComponent';
import LanguageSelector from '../components/LanguageSelector';
import './ElemPage.css';

// 문제 생성 함수 (연산별, 올림 옵션별)
function generateProblems(
  op: string,
  type: string,
  carry: 'all' | 'with' | 'without',
  t: any,
): { question: string; answer: any }[] {
  // 새로운 카테고리 처리
  if (type.startsWith('decimal_lv')) {
    const level = parseInt(type.split('_')[1].replace('lv', ''));
    const problems = [];
    const problemSet = new Set();
    let tryCount = 0;
    while (problems.length < 20 && tryCount < 200) {
      tryCount++;
      const problem = generateDecimalProblems(level);
      if (!problemSet.has(problem.question)) {
        problemSet.add(problem.question);
        problems.push(problem);
      }
    }
    return problems;
  }
  
  if (type.startsWith('mixed_lv')) {
    const level = parseInt(type.split('_')[1].replace('lv', ''));
    const problems = [];
    const problemSet = new Set();
    let tryCount = 0;
    while (problems.length < 20 && tryCount < 200) {
      tryCount++;
      const problem = generateMixedProblems(level);
      if (!problemSet.has(problem.question)) {
        problemSet.add(problem.question);
        problems.push(problem);
      }
    }
    return problems;
  }
  
  if (type.startsWith('factor_lv')) {
    const level = parseInt(type.split('_')[1].replace('lv', ''));
    const problems = [];
    const problemSet = new Set();
    let tryCount = 0;
    while (problems.length < 20 && tryCount < 200) {
      tryCount++;
      const problem = generateFactorProblems(level, t);
      if (!problemSet.has(problem.question)) {
        problemSet.add(problem.question);
        problems.push(problem);
      }
    }
    return problems;
  }
  
  if (type.startsWith('unit_lv')) {
    const level = parseInt(type.split('_')[1].replace('lv', ''));
    const problems = [];
    const problemSet = new Set();
    let tryCount = 0;
    while (problems.length < 20 && tryCount < 200) {
      tryCount++;
      const problem = generateUnitProblems(level, t);
      if (!problemSet.has(problem.question)) {
        problemSet.add(problem.question);
        problems.push(problem);
      }
    }
    return problems;
  }
  const problems = [];
  const problemSet = new Set(); // 중복 방지용
  let tryCount = 0;
  while (problems.length < 20 && tryCount < 200) {
    tryCount++;
    let a = 0, b = 0, q = '', ans: any = 0, hasCarry = false;
    if (type === '한자릿수 + 한자릿수') {
      do {
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * 9) + 1;
        if (op === '덧셈') {
          ans = a + b;
          hasCarry = a + b >= 10;
          q = `${a} + ${b} =`;
        } else if (op === '뺄셈') {
          if (a < b) [a, b] = [b, a];
          ans = a - b;
          hasCarry = a < 10 && b > 0 && a - b < 0;
          q = `${a} - ${b} =`;
        } else if (op === '곱셈') {
          ans = a * b;
          hasCarry = a * b >= 10;
          q = `${a} × ${b} =`;
        } else if (op === '나눗셈') {
          ans = a;
          q = `${a * b} ÷ ${b} =`;
          hasCarry = false;
        }
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '두자릿수 + 한자릿수') {
      do {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 9) + 1;
        if (op === '덧셈') {
          ans = a + b;
          hasCarry = (a % 10) + b >= 10;
          q = `${a} + ${b} =`;
        } else if (op === '뺄셈') {
          if (a < b) [a, b] = [b, a];
          ans = a - b;
          hasCarry = (a % 10) - b < 0;
          q = `${a} - ${b} =`;
        } else if (op === '곱셈') {
          ans = a * b;
          hasCarry = a * b >= 100;
          q = `${a} × ${b} =`;
        } else if (op === '나눗셈') {
          ans = a;
          q = `${a * b} ÷ ${b} =`;
          hasCarry = false;
        }
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '두자릿수 + 두자릿수') {
      do {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 90) + 10;
        if (op === '덧셈') {
          ans = a + b;
          hasCarry = (a % 10) + (b % 10) >= 10;
          q = `${a} + ${b} =`;
        } else if (op === '뺄셈') {
          if (a < b) [a, b] = [b, a];
          ans = a - b;
          hasCarry = (a % 10) - (b % 10) < 0;
          q = `${a} - ${b} =`;
        } else if (op === '곱셈') {
          ans = a * b;
          hasCarry = a * b >= 1000;
          q = `${a} × ${b} =`;
        } else if (op === '나눗셈') {
          ans = a;
          q = `${a * b} ÷ ${b} =`;
          hasCarry = false;
        }
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '세자릿수 + 세자릿수') {
      do {
        a = Math.floor(Math.random() * 900) + 100;
        b = Math.floor(Math.random() * 900) + 100;
        if (op === '덧셈') {
          ans = a + b;
          hasCarry = (a % 10) + (b % 10) >= 10 || (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) >= 10;
          q = `${a} + ${b} =`;
        } else {
          // 추후 확장 가능
          ans = a + b;
          q = `${a} + ${b} =`;
          hasCarry = false;
        }
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '빈칸 문제 한자릿수') {
      do {
        a = Math.floor(Math.random() * 9) + 1;
        const answer = Math.floor(Math.random() * 9) + 1;
        const b = a + answer;
        ans = answer;
        q = `${a} + □ = ${b}`;
        hasCarry = a + ans >= 10;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '빈칸 문제 두자릿수') {
      do {
        a = Math.floor(Math.random() * 90) + 10;
        const answer = Math.floor(Math.random() * 99) + 1;
        const b = a + answer;
        ans = answer;
        q = `${a} + □ = ${b}`;
        hasCarry = (a % 10) + (ans % 10) >= 10;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '빈칸 문제 세자릿수') {
      do {
        a = Math.floor(Math.random() * 900) + 100;
        const answer = Math.floor(Math.random() * 999) + 1;
        const b = a + answer;
        ans = answer;
        q = `${a} + □ = ${b}`;
        hasCarry = (a % 10) + (ans % 10) >= 10 || (Math.floor(a / 10) % 10) + (Math.floor(ans / 10) % 10) >= 10;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '5 + □ = 10 (빈칸 문제)') {
      b = Math.floor(Math.random() * 9) + 1;
      a = 10 - b;
      q = '5 + □ = 10';
      ans = a;
    }
    // 뺄셈 유형별 문제 생성
    else if (type === '한자릿수 - 한자릿수') {
      do {
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * 9) + 1;
        if (a < b) [a, b] = [b, a];
        ans = a - b;
        hasCarry = a - b < 0;
        q = `${a} - ${b} =`;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '두자릿수 - 한자릿수') {
      do {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 9) + 1;
        if (a < b) [a, b] = [b, a];
        ans = a - b;
        hasCarry = (a % 10) - b < 0;
        q = `${a} - ${b} =`;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '두자릿수 - 두자릿수') {
      do {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 90) + 10;
        if (a < b) [a, b] = [b, a];
        ans = a - b;
        hasCarry = (a % 10) - (b % 10) < 0;
        q = `${a} - ${b} =`;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '세자릿수 - 세자릿수') {
      do {
        a = Math.floor(Math.random() * 900) + 100;
        b = Math.floor(Math.random() * 900) + 100;
        if (a < b) [a, b] = [b, a];
        ans = a - b;
        hasCarry = (a % 10) - (b % 10) < 0 || (Math.floor(a / 10) % 10) - (Math.floor(b / 10) % 10) < 0;
        q = `${a} - ${b} =`;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '빈칸 문제 한자릿수(뺄셈)') {
      do {
        a = Math.floor(Math.random() * 9) + 1;
        const answer = Math.floor(Math.random() * 9) + 1;
        const b = a - answer;
        if (b < 0) continue;
        ans = answer;
        q = `${a} - □ = ${b}`;
        hasCarry = a - ans < 0;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '빈칸 문제 두자릿수(뺄셈)') {
      do {
        a = Math.floor(Math.random() * 90) + 10;
        const answer = Math.floor(Math.random() * 99) + 1;
        const b = a - answer;
        if (b < 0) continue;
        ans = answer;
        q = `${a} - □ = ${b}`;
        hasCarry = (a % 10) - (answer % 10) < 0;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    } else if (type === '빈칸 문제 세자릿수(뺄셈)') {
      do {
        a = Math.floor(Math.random() * 900) + 100;
        const answer = Math.floor(Math.random() * 999) + 1;
        const b = a - answer;
        if (b < 0) continue;
        ans = answer;
        q = `${a} - □ = ${b}`;
        hasCarry = (a % 10) - (answer % 10) < 0 || (Math.floor(a / 10) % 10) - (Math.floor(answer / 10) % 10) < 0;
      } while (
        (carry === 'with' && !hasCarry) ||
        (carry === 'without' && hasCarry)
      );
    }
    // 곱셈 유형별 문제 생성
    else if (type === '한자릿수 × 한자릿수') {
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
      ans = a * b;
      q = `${a} × ${b} =`;
    } else if (type === '두자릿수 × 한자릿수') {
      a = Math.floor(Math.random() * 90) + 10;
      b = Math.floor(Math.random() * 9) + 1;
      ans = a * b;
      q = `${a} × ${b} =`;
    } else if (type === '두자릿수 × 두자릿수') {
      a = Math.floor(Math.random() * 90) + 10;
      b = Math.floor(Math.random() * 90) + 10;
      ans = a * b;
      q = `${a} × ${b} =`;
    } else if (type === '빈칸 문제 한자릿수(곱셈)') {
      a = Math.floor(Math.random() * 9) + 1;
      const answer = Math.floor(Math.random() * 9) + 1;
      const b = a * answer;
      ans = answer;
      q = `${a} × □ = ${b}`;
    } else if (type === '빈칸 문제 두자릿수(곱셈)') {
      a = Math.floor(Math.random() * 90) + 10;
      const answer = Math.floor(Math.random() * 9) + 1;
      const b = a * answer;
      ans = answer;
      q = `${a} × □ = ${b}`;
    }
    // 나눗셈 유형별 문제 생성 (중복X, 나머지 있는/없는 문제 섞기)
    else if (type === '두자릿수 ÷ 한자릿수') {
      b = Math.floor(Math.random() * 8) + 2; // 2~9
      const qVal = Math.floor(Math.random() * 90) + 10; // 10~99
      if (Math.random() < 0.5) {
        a = b * qVal;
        if (a < 10 || a > 99) continue; // 두자릿수만 허용
        ans = { q: qVal, r: 0 };
      } else {
        const rVal = Math.floor(Math.random() * b);
        if (rVal === 0) continue;
        a = b * qVal + rVal;
        if (a < 10 || a > 99) continue; // 두자릿수만 허용
        ans = { q: qVal, r: rVal };
      }
      q = `${a} ÷ ${b} =`;
    } else if (type === '세자릿수 ÷ 한자릿수') {
      b = Math.floor(Math.random() * 8) + 2; // 2~9
      const qVal = Math.floor(Math.random() * 900) + 100; // 100~999
      if (Math.random() < 0.5) {
        a = b * qVal;
        if (a < 100 || a > 999) continue; // 세자릿수만 허용
        ans = { q: qVal, r: 0 };
      } else {
        const rVal = Math.floor(Math.random() * b);
        if (rVal === 0) continue;
        a = b * qVal + rVal;
        if (a < 100 || a > 999) continue; // 세자릿수만 허용
        ans = { q: qVal, r: rVal };
      }
      q = `${a} ÷ ${b} =`;
    } else if (type === '세자릿수 ÷ 두자릿수') {
      let found = false;
      for (let try2 = 0; try2 < 300 && !found; try2++) {
        b = Math.floor(Math.random() * 90) + 10; // 10~99
        const qVal = Math.floor(Math.random() * 10) + 1; // 몫 1~10로 제한(세자릿수 범위 보장)
        if (Math.random() < 0.5) {
          a = b * qVal;
          if (a < 100 || a > 999) continue; // 세자릿수만 허용
          ans = { q: qVal, r: 0 };
        } else {
          const rVal = Math.floor(Math.random() * b);
          if (rVal === 0) continue;
          a = b * qVal + rVal;
          if (a < 100 || a > 999) continue; // 세자릿수만 허용
          ans = { q: qVal, r: rVal };
        }
        q = `${a} ÷ ${b} =`;
        if (!problemSet.has(q)) {
          found = true;
          break;
        }
      }
      if (!found) continue;
    }
    // 빈칸 문제 한자릿수(나눗셈)
    else if (type === '빈칸 문제 한자릿수(나눗셈)') {
      // 두자릿수 ÷ □ = (몫: 1~9), 나머지 랜덤
      let found = false;
      for (let try2 = 0; try2 < 200 && !found; try2++) {
        const qVal = Math.floor(Math.random() * 9) + 1; // 몫 1~9
        const b = Math.floor(Math.random() * 9) + 1; // 빈칸(1~9)
        if (b === 0) continue;
        let rVal = Math.floor(Math.random() * b); // 나머지
        let a = b * qVal + rVal;
        if (a < 10 || a > 99) continue; // 두자릿수만
        q = `${a} ÷ □ = (몫: ${qVal}, 나머지: ${rVal})`;
        ans = b;
        if (!problemSet.has(q)) {
          found = true;
          break;
        }
      }
      if (!found) continue;
      problemSet.add(q);
      problems.push({ question: q, answer: ans });
      continue;
    }
    // 빈칸 문제 두자릿수(나눗셈)
    else if (type === '빈칸 문제 두자릿수(나눗셈)') {
      // 세자릿수 ÷ □ = (몫: 10~99), 나머지 랜덤
      let found = false;
      for (let try2 = 0; try2 < 200 && !found; try2++) {
        const qVal = Math.floor(Math.random() * 90) + 10; // 몫 10~99
        const b = Math.floor(Math.random() * 90) + 10; // 빈칸(10~99)
        if (b === 0) continue;
        let rVal = Math.floor(Math.random() * b); // 나머지
        let a = b * qVal + rVal;
        if (a < 100 || a > 999) continue; // 세자릿수만
        q = `${a} ÷ □ = (몫: ${qVal}, 나머지: ${rVal})`;
        ans = b;
        if (!problemSet.has(q)) {
          found = true;
          break;
        }
      }
      if (!found) continue;
      problemSet.add(q);
      problems.push({ question: q, answer: ans });
      continue;
    }
    // 분수 연산
    if (op === '분수') {
      // a/b (1~9/2~9), c/d (1~9/2~9)
      const numer1 = Math.floor(Math.random() * 9) + 1;
      const denom1 = Math.floor(Math.random() * 8) + 2;
      const numer2 = Math.floor(Math.random() * 9) + 1;
      const denom2 = Math.floor(Math.random() * 8) + 2;
      let resNumer = 0, resDenom = 0;
      if (type.includes('덧셈') || type === '분수') {
        resNumer = numer1 * denom2 + numer2 * denom1;
        resDenom = denom1 * denom2;
        q = `${numer1}/${denom1} + ${numer2}/${denom2} =`;
      } else if (type.includes('뺄셈')) {
        // A/B > C/D가 되도록 생성
        // numer1/denom1 > numer2/denom2
        if (numer1 * denom2 <= numer2 * denom1) continue;
        resNumer = numer1 * denom2 - numer2 * denom1;
        resDenom = denom1 * denom2;
        q = `${numer1}/${denom1} - ${numer2}/${denom2} =`;
      } else if (type.includes('곱셈')) {
        resNumer = numer1 * numer2;
        resDenom = denom1 * denom2;
        q = `${numer1}/${denom1} × ${numer2}/${denom2} =`;
      } else if (type.includes('나눗셈')) {
        // 분수 나눗셈: a/b ÷ c/d = (a*d)/(b*c)
        resNumer = numer1 * denom2;
        resDenom = denom1 * numer2;
        q = `${numer1}/${denom1} ÷ ${numer2}/${denom2} =`;
      } else {
        resNumer = numer1 * denom2 + numer2 * denom1;
        resDenom = denom1 * denom2;
        q = `${numer1}/${denom1} + ${numer2}/${denom2} =`;
      }
      ans = `${resNumer}/${resDenom}`;
      problems.push({ question: q, answer: ans });
      continue;
    }
    // 소수 연산
    if (op === '소수') {
      let a, b, ans, q, hasCarry = false;
      // 소수점 자릿수 결정
      let decimalPlaces = 1;
      if (type.includes('두자릿수')) decimalPlaces = 2;
      // 덧셈/뺄셈 carry/borrow 판별
      if (type.startsWith('소수 덧셈')) {
        do {
          a = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
          b = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
          ans = (parseFloat(a) + parseFloat(b)).toFixed(decimalPlaces + 1);
          q = `${a} + ${b} =`;
          // 올림 판별: 소수점 아래 마지막 자리 합이 10 이상이면 올림
          const aDec = parseInt(a.split('.')[1] || '0', 10);
          const bDec = parseInt(b.split('.')[1] || '0', 10);
          const sumDec = aDec + bDec;
          hasCarry = sumDec >= Math.pow(10, decimalPlaces);
        } while (
          (carry === 'with' && !hasCarry) ||
          (carry === 'without' && hasCarry)
        );
      } else if (type.startsWith('소수 뺄셈')) {
        do {
          a = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
          b = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
          if (parseFloat(a) < parseFloat(b)) [a, b] = [b, a];
          ans = (parseFloat(a) - parseFloat(b)).toFixed(decimalPlaces + 1);
          q = `${a} - ${b} =`;
          // 내림 판별: a의 소수점 아래가 b보다 작으면 내림
          const aDec = parseInt(a.split('.')[1] || '0', 10);
          const bDec = parseInt(b.split('.')[1] || '0', 10);
          hasCarry = aDec < bDec;
        } while (
          (carry === 'with' && !hasCarry) ||
          (carry === 'without' && hasCarry)
        );
      } else if (type.startsWith('소수 곱셈')) {
        a = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
        b = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
        // 부동소수점 정밀도 문제 해결을 위해 정수로 변환하여 계산
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const aDecimalPlaces = (a.toString().split('.')[1] || '').length;
        const bDecimalPlaces = (b.toString().split('.')[1] || '').length;
        const totalDecimalPlaces = aDecimalPlaces + bDecimalPlaces;
        
        // 정수로 변환하여 계산
        const aInt = Math.round(aNum * Math.pow(10, aDecimalPlaces));
        const bInt = Math.round(bNum * Math.pow(10, bDecimalPlaces));
        const resultInt = aInt * bInt;
        const result = resultInt / Math.pow(10, totalDecimalPlaces);
        
        ans = result.toFixed(Math.min(totalDecimalPlaces, decimalPlaces + 1));
        q = `${a} × ${b} =`;
      } else if (type.startsWith('소수 나눗셈')) {
        a = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
        b = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
        // 부동소수점 정밀도 문제 해결을 위해 정수로 변환하여 계산
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        if (bNum === 0) {
          ans = '?';
        } else {
          const aDecimalPlaces = (a.toString().split('.')[1] || '').length;
          const bDecimalPlaces = (b.toString().split('.')[1] || '').length;
          const maxDecimalPlaces = Math.max(aDecimalPlaces, bDecimalPlaces);
          
          // 정수로 변환하여 계산
          const aInt = Math.round(aNum * Math.pow(10, maxDecimalPlaces));
          const bInt = Math.round(bNum * Math.pow(10, maxDecimalPlaces));
          const resultInt = aInt / bInt;
          const result = resultInt / Math.pow(10, maxDecimalPlaces);
          
          ans = result.toFixed(decimalPlaces + 1);
        }
        q = `${a} ÷ ${b} =`;
      } else {
        a = (Math.random() * 9 + 0.1).toFixed(1);
        b = (Math.random() * 9 + 0.1).toFixed(1);
        ans = (parseFloat(a) + parseFloat(b)).toFixed(2);
        q = `${a} + ${b} =`;
      }
      problems.push({ question: q, answer: ans });
      continue;
    }
    // 정수 연산
    if (op === '정수') {
      a = Math.floor(Math.random() * 199) - 99; // -99 ~ 99
      b = Math.floor(Math.random() * 199) - 99;
      if (type.includes('덧셈') || type === '정수') {
        ans = a + b;
        q = `${a} + ${b} =`;
      } else if (type.includes('뺄셈')) {
        ans = a - b;
        q = `${a} - ${b} =`;
      } else if (type.includes('곱셈')) {
        ans = a * b;
        q = `${a} × ${b} =`;
      } else if (type.includes('나눗셈')) {
        ans = b !== 0 ? (a / b).toFixed(2) : '?';
        q = `${a} ÷ ${b} =`;
      } else {
        ans = a + b;
        q = `${a} + ${b} =`;
      }
      problems.push({ question: q, answer: ans });
      continue;
    }
    // 비교 연산 문제 생성 (0~99, 기호 3종)
    if (op === '비교 연산') {
      while (problems.length < 20 && tryCount < 200) {
        tryCount++;
        a = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100);
        // 문제 문자열
        q = `${a} □ ${b}`;
        // 실제 정답(논리적 정답)
        let answer = '';
        if (a > b) answer = '>';
        else if (a < b) answer = '<';
        else answer = '=';
        if (problemSet.has(q)) continue;
        problemSet.add(q);
        problems.push({ question: q, answer });
      }
      return problems;
    }
    // 중복 체크
    if (problemSet.has(q)) continue;
    problemSet.add(q);
    problems.push({ question: q, answer: ans });
  }
  return problems;
}

// 새로운 카테고리 문제 생성 함수들
function generateDecimalProblems(level: number): { question: string; answer: number } {
  if (level === 1) {
    // 1-digit decimal addition/subtraction
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const decimalA = a + Math.random() * 0.9;
    const decimalB = b + Math.random() * 0.9;
    const operation = Math.random() < 0.5 ? '+' : '-';
    
    if (operation === '+') {
      return {
        question: `${decimalA.toFixed(1)} + ${decimalB.toFixed(1)} =`,
        answer: parseFloat((decimalA + decimalB).toFixed(1))
      };
    } else {
      const larger = Math.max(decimalA, decimalB);
      const smaller = Math.min(decimalA, decimalB);
      return {
        question: `${larger.toFixed(1)} - ${smaller.toFixed(1)} =`,
        answer: parseFloat((larger - smaller).toFixed(1))
      };
    }
  } else if (level === 2) {
    // 2-digit decimal addition/subtraction, decimal × integer
    const operation = Math.random() < 0.33 ? '+' : Math.random() < 0.5 ? '-' : '×';
    
    if (operation === '+' || operation === '-') {
      const a = Math.floor(Math.random() * 99) + 1;
      const b = Math.floor(Math.random() * 99) + 1;
      const decimalA = a + Math.random() * 0.99;
      const decimalB = b + Math.random() * 0.99;
      
      if (operation === '+') {
        return {
          question: `${decimalA.toFixed(2)} + ${decimalB.toFixed(2)} =`,
          answer: parseFloat((decimalA + decimalB).toFixed(2))
        };
      } else {
        const larger = Math.max(decimalA, decimalB);
        const smaller = Math.min(decimalA, decimalB);
        return {
          question: `${larger.toFixed(2)} - ${smaller.toFixed(2)} =`,
          answer: parseFloat((larger - smaller).toFixed(2))
        };
      }
    } else {
      // decimal × integer
      const decimal = Math.floor(Math.random() * 99) + 1 + Math.random() * 0.99;
      const integer = Math.floor(Math.random() * 9) + 1;
      const decimalStr = decimal.toFixed(2);
      const decimalPlaces = 2;
      
      // 정수로 변환하여 계산
      const decimalInt = Math.round(decimal * Math.pow(10, decimalPlaces));
      const resultInt = decimalInt * integer;
      const result = resultInt / Math.pow(10, decimalPlaces);
      
      return {
        question: `${decimalStr} × ${integer} =`,
        answer: parseFloat(result.toFixed(2))
      };
    }
  } else {
    // decimal ÷ integer, decimal × decimal (round to 2 decimal places)
    const operation = Math.random() < 0.5 ? '÷' : '×';
    
    if (operation === '÷') {
      const integer = Math.floor(Math.random() * 8) + 2; // 2-9
      const result = Math.floor(Math.random() * 99) + 1 + Math.random() * 0.99;
      const decimal = result * integer;
      return {
        question: `${decimal.toFixed(2)} ÷ ${integer} =`,
        answer: parseFloat(result.toFixed(2))
      };
    } else {
      const decimal1 = Math.floor(Math.random() * 99) + 1 + Math.random() * 0.99;
      const decimal2 = Math.floor(Math.random() * 99) + 1 + Math.random() * 0.99;
      const decimal1Str = decimal1.toFixed(2);
      const decimal2Str = decimal2.toFixed(2);
      const decimalPlaces = 2;
      
      // 정수로 변환하여 계산
      const decimal1Int = Math.round(decimal1 * Math.pow(10, decimalPlaces));
      const decimal2Int = Math.round(decimal2 * Math.pow(10, decimalPlaces));
      const resultInt = decimal1Int * decimal2Int;
      const result = resultInt / Math.pow(10, decimalPlaces * 2);
      
      return {
        question: `${decimal1Str} × ${decimal2Str} =`,
        answer: parseFloat(result.toFixed(2))
      };
    }
  }
}

function generateMixedProblems(level: number): { question: string; answer: number } {
  if (level === 1) {
    // No parentheses, order of operations
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const c = Math.floor(Math.random() * 9) + 1;
    const operations = ['+', '-', '×'];
    const op1 = operations[Math.floor(Math.random() * operations.length)];
    const op2 = operations[Math.floor(Math.random() * operations.length)];
    
    let question = `${a} ${op1} ${b} ${op2} ${c}`;
    let answer = 0;
    
    if (op1 === '×' && op2 !== '×') {
      answer = a * b;
      if (op2 === '+') answer += c;
      else answer -= c;
    } else if (op2 === '×' && op1 !== '×') {
      answer = b * c;
      if (op1 === '+') answer = a + answer;
      else answer = a - answer;
    } else {
      if (op1 === '+') answer = a + b;
      else if (op1 === '-') answer = a - b;
      else answer = a * b;
      
      if (op2 === '+') answer += c;
      else if (op2 === '-') answer -= c;
      else answer *= c;
    }
    
    return {
      question: `${question} =`,
      answer: answer
    };
  } else if (level === 2) {
    // With parentheses
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const c = Math.floor(Math.random() * 9) + 1;
    const operations = ['+', '-', '×'];
    const op1 = operations[Math.floor(Math.random() * operations.length)];
    const op2 = operations[Math.floor(Math.random() * operations.length)];
    
    let question = `(${a} ${op1} ${b}) ${op2} ${c}`;
    let answer = 0;
    
    // Calculate inside parentheses first
    if (op1 === '+') answer = a + b;
    else if (op1 === '-') answer = a - b;
    else answer = a * b;
    
    // Then apply second operation
    if (op2 === '+') answer += c;
    else if (op2 === '-') answer -= c;
    else answer *= c;
    
    return {
      question: `${question} =`,
      answer: answer
    };
  } else {
    // With parentheses and multiple operations
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const c = Math.floor(Math.random() * 9) + 1;
    const d = Math.floor(Math.random() * 9) + 1;
    
    const question = `${a} + (${b} × ${c}) - ${d}`;
    const answer = a + (b * c) - d;
    
    return {
      question: `${question} =`,
      answer: answer
    };
  }
}

function generateFactorProblems(level: number, t: any): { question: string; answer: number } {
  if (level === 1) {
    // Find a multiple
    const base = Math.floor(Math.random() * 9) + 2; // 2-10
    const multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
    const multiple = base * multiplier;
    
    return {
      question: `${base}${t('factorMultipleLv1').replace('{multiple}', multiple.toString())}`,
      answer: multiple - base
    };
  } else if (level === 2) {
    // Find a divisor
    const number = Math.floor(Math.random() * 50) + 10; // 10-59
    const divisors = [];
    for (let i = 1; i <= number; i++) {
      if (number % i === 0) divisors.push(i);
    }
    const randomDivisor = divisors[Math.floor(Math.random() * divisors.length)];
    
    return {
      question: `${number}${t('factorMultipleLv2').replace('{divisor}', randomDivisor.toString())}`,
      answer: divisors[divisors.indexOf(randomDivisor) + 1] || number
    };
  } else {
    // GCD or LCM of two numbers
    const isGCD = Math.random() < 0.5;
    
    if (isGCD) {
      // GCD - 서로소가 아닌 수들로 문제 생성
      let a, b;
      let attempts = 0;
      do {
        // 공약수가 있는 수들로 생성
        const commonFactor = Math.floor(Math.random() * 8) + 2; // 2-9
        const factor1 = Math.floor(Math.random() * 8) + 2; // 2-9
        const factor2 = Math.floor(Math.random() * 8) + 2; // 2-9
        a = commonFactor * factor1;
        b = commonFactor * factor2;
        attempts++;
      } while (a === b && attempts < 10); // 같은 수가 나오지 않도록
      
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      return {
        question: `${a}${t('factorMultipleLv3Gcd').replace('{b}', b.toString())}`,
        answer: gcd(a, b)
      };
    } else {
      // LCM
      const a = Math.floor(Math.random() * 20) + 10; // 10-29
      const b = Math.floor(Math.random() * 20) + 10; // 10-29
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      const lcm = (a * b) / gcd(a, b);
      return {
        question: `${a}${t('factorMultipleLv3Lcm').replace('{b}', b.toString())}`,
        answer: lcm
      };
    }
  }
}

function generateUnitProblems(level: number, t: any): { question: string; answer: number | string } {
  if (level === 1) {
    // Length (cm ↔ m)
    const isCmToM = Math.random() < 0.5;
    if (isCmToM) {
      const cm = Math.floor(Math.random() * 900) + 100; // 100-999 cm
      return {
        question: `${cm}${t('unitConversionLv1CmToM')}`,
        answer: cm / 100
      };
    } else {
      const m = Math.floor(Math.random() * 9) + 1; // 1-9 m
      const cm = Math.floor(Math.random() * 100); // 0-99 cm
      const totalCm = m * 100 + cm;
      return {
        question: `${m}.${cm.toString().padStart(2, '0')}${t('unitConversionLv1MToCm')}`,
        answer: totalCm
      };
    }
  } else if (level === 2) {
    // Weight (g ↔ kg)
    const isGToKg = Math.random() < 0.5;
    if (isGToKg) {
      const g = Math.floor(Math.random() * 9000) + 1000; // 1000-9999 g
      return {
        question: `${g}${t('unitConversionLv2GToKg')}`,
        answer: g / 1000
      };
    } else {
      const kg = Math.floor(Math.random() * 9) + 1; // 1-9 kg
      const g = Math.floor(Math.random() * 1000); // 0-999 g
      const totalG = kg * 1000 + g;
      return {
        question: `${kg}.${g.toString().padStart(3, '0')}${t('unitConversionLv2KgToG')}`,
        answer: totalG
      };
    }
  } else {
    // Time calculation (hh:mm ± minutes)
    const isAddition = Math.random() < 0.5;
    const hours = Math.floor(Math.random() * 12) + 1; // 1-12 hours
    const minutes = Math.floor(Math.random() * 60); // 0-59 minutes
    const addMinutes = Math.floor(Math.random() * 60) + 1; // 1-60 minutes
    
    if (isAddition) {
      let newHours = hours;
      let newMinutes = minutes + addMinutes;
      if (newMinutes >= 60) {
        newHours += Math.floor(newMinutes / 60);
        newMinutes = newMinutes % 60;
      }
      if (newHours > 12) newHours = newHours % 12;
      if (newHours === 0) newHours = 12;
      
      return {
        question: `${hours}${t('unitConversionLv3TimeAdd').replace('{minutes}', minutes.toString()).replace('{addMinutes}', addMinutes.toString())}`,
        answer: `${newHours}시 ${newMinutes}분`
      };
    } else {
      let newHours = hours;
      let newMinutes = minutes - addMinutes;
      if (newMinutes < 0) {
        newHours -= Math.ceil(Math.abs(newMinutes) / 60);
        newMinutes = 60 + (newMinutes % 60);
      }
      if (newHours <= 0) newHours = 12 + (newHours % 12);
      
      return {
        question: `${hours}${t('unitConversionLv3TimeSub').replace('{minutes}', minutes.toString()).replace('{subMinutes}', addMinutes.toString())}`,
        answer: `${newHours}시 ${newMinutes}분`
      };
    }
  }
}

// [문제 유형 미리보기용 예시 생성 함수 추가]
function getBlankExample(type: string, carry: 'all' | 'with' | 'without', t: any) {
  if (type.startsWith('빈칸 문제')) {
    // 임시로 1개만 생성
    const ex = generateProblems('덧셈', type, carry, t)[0];
    return ex?.question || '';
  }
  return '';
}

// 문제 유형 번역 매핑 함수
const getProblemTypeLabel = (t: any, value: string) => {
  const mapping: { [key: string]: string } = {
    '한자릿수 + 한자릿수': t('singleDigitAddition'),
    '두자릿수 + 한자릿수': t('doubleDigitSingleAddition'),
    '두자릿수 + 두자릿수': t('doubleDigitAddition'),
    '세자릿수 + 세자릿수': t('tripleDigitAddition'),
    '한자릿수 - 한자릿수': t('singleDigitSubtraction'),
    '두자릿수 - 한자릿수': t('doubleDigitSingleSubtraction'),
    '두자릿수 - 두자릿수': t('doubleDigitSubtraction'),
    '세자릿수 - 세자릿수': t('tripleDigitSubtraction'),
    '한자릿수 × 한자릿수': t('singleDigitMultiplication'),
    '두자릿수 × 한자릿수': t('doubleDigitSingleMultiplication'),
    '두자릿수 × 두자릿수': t('doubleDigitMultiplication'),
    '두자릿수 ÷ 한자릿수': t('doubleDigitDivision'),
    '세자릿수 ÷ 한자릿수': t('tripleDigitDivision'),
    '세자릿수 ÷ 두자릿수': t('tripleDigitDoubleDivision'),
    '빈칸 문제 한자릿수': t('blankSingleDigit'),
    '빈칸 문제 두자릿수': t('blankDoubleDigit'),
    '빈칸 문제 세자릿수': t('blankTripleDigit'),
    '빈칸 문제 한자릿수(뺄셈)': t('blankSingleDigitSubtraction'),
    '빈칸 문제 두자릿수(뺄셈)': t('blankDoubleDigitSubtraction'),
    '빈칸 문제 세자릿수(뺄셈)': t('blankTripleDigitSubtraction'),
    '빈칸 문제 한자릿수(곱셈)': t('blankSingleDigitMultiplication'),
    '빈칸 문제 두자릿수(곱셈)': t('blankDoubleDigitMultiplication'),
    '빈칸 문제 한자릿수(나눗셈)': t('blankSingleDigitDivision'),
    '빈칸 문제 두자릿수(나눗셈)': t('blankDoubleDigitDivision'),
    '분수 덧셈': t('fractionAddition'),
    '분수 뺄셈': t('fractionSubtraction'),
    '분수 곱셈': t('fractionMultiplication'),
    '분수 나눗셈': t('fractionDivision'),
    '소수 덧셈 (소수점 한자릿수)': t('decimalAdditionSingle'),
    '소수 덧셈 (소수점 두자릿수)': t('decimalAdditionDouble'),
    '소수 뺄셈 (소수점 한자릿수)': t('decimalSubtractionSingle'),
    '소수 뺄셈 (소수점 두자릿수)': t('decimalSubtractionDouble'),
    '소수 곱셈 (소수점 한자릿수)': t('decimalMultiplicationSingle'),
    '소수 곱셈 (소수점 두자릿수)': t('decimalMultiplicationDouble'),
    '소수 나눗셈 (소수점 한자릿수)': t('decimalDivisionSingle'),
    '소수 나눗셈 (소수점 두자릿수)': t('decimalDivisionDouble'),
    'A ㅁ B 비교 연산': t('comparisonOperationType'),
    // 새로운 카테고리들
    'decimal_lv1': `${t('decimalOperation')} Lv1`,
    'decimal_lv2': `${t('decimalOperation')} Lv2`,
    'decimal_lv3': `${t('decimalOperation')} Lv3`,
    'mixed_lv1': `${t('mixedOperation')} Lv1`,
    'mixed_lv2': `${t('mixedOperation')} Lv2`,
    'mixed_lv3': `${t('mixedOperation')} Lv3`,
    'factor_lv1': `${t('factorMultiple')} Lv1`,
    'factor_lv2': `${t('factorMultiple')} Lv2`,
    'factor_lv3': `${t('factorMultiple')} Lv3`,
    'unit_lv1': `${t('unitConversion')} Lv1`,
    'unit_lv2': `${t('unitConversion')} Lv2`,
    'unit_lv3': `${t('unitConversion')} Lv3`,
  };
  return mapping[value] || value;
};

// 문제 유형 필터링 함수 추가
const problemTypes = [
  { label: '한자릿수 + 한자릿수', value: '한자릿수 + 한자릿수' },
  { label: '두자릿수 + 한자릿수', value: '두자릿수 + 한자릿수' },
  { label: '두자릿수 + 두자릿수', value: '두자릿수 + 두자릿수' },
  { label: '세자릿수 + 세자릿수', value: '세자릿수 + 세자릿수' },
  { label: '한자릿수 - 한자릿수', value: '한자릿수 - 한자릿수' },
  { label: '두자릿수 - 한자릿수', value: '두자릿수 - 한자릿수' },
  { label: '두자릿수 - 두자릿수', value: '두자릿수 - 두자릿수' },
  { label: '세자릿수 - 세자릿수', value: '세자릿수 - 세자릿수' },
  { label: '한자릿수 × 한자릿수', value: '한자릿수 × 한자릿수' },
  { label: '두자릿수 × 한자릿수', value: '두자릿수 × 한자릿수' },
  { label: '두자릿수 × 두자릿수', value: '두자릿수 × 두자릿수' },
  { label: '빈칸 문제 한자릿수(곱셈)', value: '빈칸 문제 한자릿수(곱셈)' },
  { label: '빈칸 문제 두자릿수(곱셈)', value: '빈칸 문제 두자릿수(곱셈)' },
  { label: '두자릿수 ÷ 한자릿수', value: '두자릿수 ÷ 한자릿수' },
  { label: '세자릿수 ÷ 한자릿수', value: '세자릿수 ÷ 한자릿수' },
  { label: '세자릿수 ÷ 두자릿수', value: '세자릿수 ÷ 두자릿수' },
  { label: '빈칸 문제 한자릿수', value: '빈칸 문제 한자릿수' },
  { label: '빈칸 문제 두자릿수', value: '빈칸 문제 두자릿수' },
  { label: '빈칸 문제 세자릿수', value: '빈칸 문제 세자릿수' },
  { label: '빈칸 문제 한자릿수(뺄셈)', value: '빈칸 문제 한자릿수(뺄셈)' },
  { label: '빈칸 문제 두자릿수(뺄셈)', value: '빈칸 문제 두자릿수(뺄셈)' },
  { label: '빈칸 문제 세자릿수(뺄셈)', value: '빈칸 문제 세자릿수(뺄셈)' }
];

const fractionTypes = [
  { label: '분수 덧셈', value: '분수 덧셈' },
  { label: '분수 뺄셈', value: '분수 뺄셈' },
  { label: '분수 곱셈', value: '분수 곱셈' },
  { label: '분수 나눗셈', value: '분수 나눗셈' },
];

// [소수 문제 유형 세분화]
const decimalTypes = [
  { label: '소수 덧셈 (소수점 한자릿수)', value: '소수 덧셈 (소수점 한자릿수)' },
  { label: '소수 덧셈 (소수점 두자릿수)', value: '소수 덧셈 (소수점 두자릿수)' },
  { label: '소수 뺄셈 (소수점 한자릿수)', value: '소수 뺄셈 (소수점 한자릿수)' },
  { label: '소수 뺄셈 (소수점 두자릿수)', value: '소수 뺄셈 (소수점 두자릿수)' },
  { label: '소수 곱셈 (소수점 한자릿수)', value: '소수 곱셈 (소수점 한자릿수)' },
  { label: '소수 곱셈 (소수점 두자릿수)', value: '소수 곱셈 (소수점 두자릿수)' },
  { label: '소수 나눗셈 (소수점 한자릿수)', value: '소수 나눗셈 (소수점 한자릿수)' },
  { label: '소수 나눗셈 (소수점 두자릿수)', value: '소수 나눗셈 (소수점 두자릿수)' },
];

// 새로운 카테고리 문제 유형들
const getDecimalCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('decimalOperation')} Lv1`, value: 'decimal_lv1' },
  { label: `${t('decimalOperation')} Lv2`, value: 'decimal_lv2' },
  { label: `${t('decimalOperation')} Lv3`, value: 'decimal_lv3' },
];

const getMixedCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('mixedOperation')} Lv1`, value: 'mixed_lv1' },
  { label: `${t('mixedOperation')} Lv2`, value: 'mixed_lv2' },
  { label: `${t('mixedOperation')} Lv3`, value: 'mixed_lv3' },
];

const getFactorCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('factorMultiple')} Lv1`, value: 'factor_lv1' },
  { label: `${t('factorMultiple')} Lv2`, value: 'factor_lv2' },
  { label: `${t('factorMultiple')} Lv3`, value: 'factor_lv3' },
];

const getUnitCategoryTypes = (t: any): Array<{label: string, value: string}> => [
  { label: `${t('unitConversion')} Lv1`, value: 'unit_lv1' },
  { label: `${t('unitConversion')} Lv2`, value: 'unit_lv2' },
  { label: `${t('unitConversion')} Lv3`, value: 'unit_lv3' },
];

function getFilteredProblemTypes(op: string, t: any) {
  if (op === '비교 연산') {
    return [
      { label: getProblemTypeLabel(t, 'A ㅁ B 비교 연산'), value: 'A ㅁ B 비교 연산' }
    ];
  }
  if (op === '덧셈') {
    return problemTypes.filter(type =>
      typeof type.value === 'string' && (
        type.value.includes('+') ||
        (type.value.startsWith('빈칸 문제') &&
          !type.value.includes('(뺄셈)') &&
          !type.value.includes('(곱셈)') &&
          !type.value.includes('(나눗셈)'))
      )
    ).map(type => ({
      label: getProblemTypeLabel(t, type.value),
      value: type.value
    }));
  }
  if (op === '뺄셈') {
    return problemTypes.filter(type =>
      typeof type.value === 'string' && (
        type.value.includes('-') ||
        (type.value.startsWith('빈칸 문제') && type.value.includes('(뺄셈)'))
      )
    ).map(type => ({
      label: getProblemTypeLabel(t, type.value),
      value: type.value
    }));
  }
  if (op === '곱셈') {
    return problemTypes.filter(type =>
      typeof type.value === 'string' && (
        type.value.includes('×') ||
        (type.value.startsWith('빈칸 문제') && type.value.includes('(곱셈)'))
      )
    ).map(type => ({
      label: getProblemTypeLabel(t, type.value),
      value: type.value
    }));
  }
  if (op === '나눗셈') {
    return problemTypes.filter(type =>
      typeof type.value === 'string' && (
        type.value.includes('÷') ||
        (type.value.startsWith('빈칸 문제') && type.value.includes('(나눗셈)'))
      )
    ).map(type => ({
      label: getProblemTypeLabel(t, type.value),
      value: type.value
    }));
  }
  if (op === '분수') {
    return fractionTypes.map(type => ({
      label: getProblemTypeLabel(t, type.value),
      value: type.value
    }));
  }
  if (op === '소수') {
    return decimalTypes.map(type => ({
      label: getProblemTypeLabel(t, type.value),
      value: type.value
    }));
  }
  if (op === '소수연산') {
    return getDecimalCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (op === '혼합연산') {
    return getMixedCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (op === '약수배수') {
    return getFactorCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  if (op === '단위변환') {
    return getUnitCategoryTypes(t).map((type: any) => ({
      label: type.label,
      value: type.value
    }));
  }
  // 분수 등 기타 연산은 추후 확장
  return problemTypes.map(type => ({
    label: getProblemTypeLabel(t, type.value),
    value: type.value
  }));
}

interface ElemPageProps {
}

const ElemPage: React.FC<ElemPageProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [op, setOp] = useState(() => {
    const savedOp = localStorage.getItem('lastOperation');
    return savedOp || '덧셈';
  });
  const [type, setType] = useState('한자릿수 + 한자릿수');
  // carry: 'all'(섞어서), 'with'(올림만), 'without'(올림없음)
  const [carry, setCarry] = useState<'all' | 'with' | 'without'>('all');
  // 제한 시간 사용 여부
  const [useLimit, setUseLimit] = useState(false);
  // 제한 시간(분)
  const [limit, setLimit] = useState(5);
  const [showTypeList, setShowTypeList] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);
  // [문제 유형 미리보기용 예시 상태]
  const [example, setExample] = useState('');

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const problems = generateProblems(op, type, carry, t);
    localStorage.setItem('problems', JSON.stringify(problems));
    localStorage.setItem('limit', useLimit ? String(limit * 60) : '');
    navigate('/elem/problems');
  };

  // 올림 옵션 라디오 버튼 핸들러
  const handleCarry = (val: 'all' | 'with' | 'without') => {
    setCarry(val);
  };

  // 제한 시간 up/down
  const handleLimitChange = (delta: number) => {
    setLimit(prev => Math.max(1, prev + delta));
  };

  // 커스텀 드롭다운 외부 클릭 닫기
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setShowTypeList(false);
      }
    }
    if (showTypeList) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showTypeList]);

  React.useEffect(() => {
    if (type.startsWith('빈칸 문제') && !['소수연산', '혼합연산', '약수배수', '단위변환'].includes(op)) {
      setExample(getBlankExample(type, carry, t));
    } else {
      setExample('');
    }
  }, [type, carry, op, t]);

  // 연산 종류 변경 시 문제 유형도 자동 변경
  React.useEffect(() => {
    const filtered = getFilteredProblemTypes(op, t);
    if (filtered.length > 0) {
      // 분수 연산일 때는 fractionTypes의 첫 번째 값으로 명확히 지정
      if (op === '분수') {
        setType(fractionTypes[0].value);
      } else if (op === '소수연산') {
        setType(getDecimalCategoryTypes(t)[0].value);
      } else if (op === '혼합연산') {
        setType(getMixedCategoryTypes(t)[0].value);
      } else if (op === '약수배수') {
        setType(getFactorCategoryTypes(t)[0].value);
      } else if (op === '단위변환') {
        setType(getUnitCategoryTypes(t)[0].value);
      } else {
        setType(filtered[0].value);
      }
    }
    // eslint-disable-next-line
  }, [op, t]);

  // 한자릿수 - 한자릿수 및 빈칸 문제 한자릿수(뺄셈) 선택 시 내림있는 계산만 옵션 자동 변경
  React.useEffect(() => {
    if (op === '뺄셈' && 
        (type === '한자릿수 - 한자릿수' || 
         type === '빈칸 문제 한자릿수(뺄셈)') && 
        carry === 'with') {
      setCarry('all');
    }
  }, [op, type, carry]);

  // carry 옵션 라벨 동적 처리
  const carryLabels = op === '뺄셈'
    ? {
        with: t('borrowWith'),
        without: t('borrowWithout'),
        all: t('borrowAll'),
      }
    : {
        with: t('carryWith'),
        without: t('carryWithout'),
        all: t('carryAll'),
      };

  // 라디오 버튼 노출 조건 함수 추가
  const showDecimalCarryRadio = (
    (type === '소수 덧셈 (소수점 한자릿수)' ||
    type === '소수 덧셈 (소수점 두자릿수)' ||
    type === '소수 뺄셈 (소수점 한자릿수)' ||
    type === '소수 뺄셈 (소수점 두자릿수)') &&
    op === '소수'
  );

  // 연산 종류 배열 추가 (덧셈 위에 비교 연산)
  const operationTypes: { label: string; value: string; disabled?: boolean }[] = [
    { label: t('comparisonOperation'), value: '비교 연산' },
    { label: t('addition'), value: '덧셈' },
    { label: t('subtraction'), value: '뺄셈' },
    { label: t('multiplication'), value: '곱셈' },
    { label: t('division'), value: '나눗셈' },
    { label: t('fraction'), value: '분수' },
    { label: t('decimalOperation'), value: '소수연산' },
    { label: t('mixedOperation'), value: '혼합연산' },
    { label: t('factorMultiple'), value: '약수배수' },
    { label: t('unitConversion'), value: '단위변환' },
  ];

  return (
    <div className="elem-page">
      <div className="header">
        <HomeButton />
        <LanguageSelector />
      </div>
      {/* 상단 광고 */}
      <AdComponent slot="elempage-banner-1" size="banner" className="top-ad" />
      <form onSubmit={handleGenerate} className="elem-form">
        <div className="elem-emoji">✏️</div>
        <h2 className="elem-title">
          {t('elemTitle')}
        </h2>
                 {/* 빈칸 문제 예시 미리보기 */}
         {type.startsWith('빈칸 문제') && example && !['소수연산', '혼합연산', '약수배수', '단위변환'].includes(op) && (
           <div className="example-preview">
             {t('example')} {example.split('□').map((part, idx, arr) => (
               idx < arr.length - 1 ? (
                 <React.Fragment key={idx}>
                   {part}
                   <span style={{ fontSize: 26, fontWeight: 900, margin: '0 4px', verticalAlign: 'middle' }}>□</span>
                 </React.Fragment>
               ) : part
             ))}
           </div>
         )}
         
         {/* 소수 연산 주의사항 */}
         {op === '소수연산' && (
           <div className="example-preview" style={{ 
             backgroundColor: '#fef3c7', 
             border: '1px solid #f59e0b', 
             borderRadius: '8px', 
             padding: '12px 16px',
             marginBottom: '16px',
             color: '#92400e',
             fontSize: '14px',
             fontWeight: '500'
           }}>
             {t('decimalWarning')}
           </div>
         )}
        {/* 연산 종류 */}
        <div className="form-group">
          <label className="form-label">{t('operationType')}</label>
          <select value={op} onChange={e => {
            const newOp = e.target.value;
            setOp(newOp);
            localStorage.setItem('lastOperation', newOp);
          }} className="form-select">
            {operationTypes.map(opt => (
              <option 
                key={opt.value} 
                value={opt.value} 
                disabled={opt.disabled}
                style={opt.disabled ? { color: '#999', fontStyle: 'italic' } : {}}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* 문제 유형 (드롭다운) */}
        <div className="form-group" ref={typeRef}>
          <label className="form-label">{t('problemType')}</label>
          {op === '비교 연산' ? (
            <select
              className="form-select"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{ minWidth: 180 }}
            >
              {getFilteredProblemTypes(op, t).map(problemType => (
                <option key={problemType.value} value={problemType.value}>{problemType.label}</option>
              ))}
            </select>
          ) : (
            <div
              className="custom-dropdown"
              onClick={() => setShowTypeList(v => !v)}
            >
              {getProblemTypeLabel(t, type)}
              <span className="dropdown-arrow">▼</span>
              {showTypeList && (
                <ul className="dropdown-list">
                  {getFilteredProblemTypes(op, t).map(problemType => (
                    <li
                      key={problemType.value}
                      onClick={() => {
                        setType(problemType.value);
                        setTimeout(() => setShowTypeList(false), 0);
                      }}
                      className={`dropdown-item ${problemType.value === type ? 'selected' : ''}`}
                    >
                      {problemType.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {/* 올림/내림 옵션 (라디오 버튼처럼 동작) */}
        {(op === '덧셈' || op === '뺄셈') && !['소수연산', '혼합연산', '약수배수', '단위변환'].includes(op) ? (
          <div className="radio-group">
            <label className={`radio-option ${carry === 'with' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                checked={carry === 'with'} 
                onChange={() => handleCarry('with')}
                disabled={op === '뺄셈' && (
                  type === '한자릿수 - 한자릿수' ||
                  type === '빈칸 문제 한자릿수(뺄셈)'
                )}
              />
              <span style={{ 
                color: (op === '뺄셈' && (
                  type === '한자릿수 - 한자릿수' ||
                  type === '빈칸 문제 한자릿수(뺄셈)'
                )) ? '#ccc' : 'inherit',
                fontStyle: (op === '뺄셈' && (
                  type === '한자릿수 - 한자릿수' ||
                  type === '빈칸 문제 한자릿수(뺄셈)'
                )) ? 'italic' : 'normal'
              }}>
                {carryLabels.with}
                {op === '뺄셈' && (
                  type === '한자릿수 - 한자릿수' ||
                  type === '빈칸 문제 한자릿수(뺄셈)'
                ) && t('impossible')}
              </span>
            </label>
            <label className={`radio-option ${carry === 'without' ? 'selected' : ''}`}>
              <input type="radio" checked={carry === 'without'} onChange={() => handleCarry('without')} />
              <span>{carryLabels.without}</span>
            </label>
            <label className={`radio-option ${carry === 'all' ? 'selected' : ''}`}>
              <input type="radio" checked={carry === 'all'} onChange={() => handleCarry('all')} />
              <span>{carryLabels.all}</span>
            </label>
          </div>
        ) : op === '소수' && showDecimalCarryRadio ? (
          <div className="radio-group">
            <label className={`radio-option ${carry === 'with' ? 'selected' : ''}`}>
              <input type="radio" checked={carry === 'with'} onChange={() => handleCarry('with')} />
              <span>{carryLabels.with}</span>
            </label>
            <label className={`radio-option ${carry === 'without' ? 'selected' : ''}`}>
              <input type="radio" checked={carry === 'without'} onChange={() => handleCarry('without')} />
              <span>{carryLabels.without}</span>
            </label>
            <label className={`radio-option ${carry === 'all' ? 'selected' : ''}`}>
              <input type="radio" checked={carry === 'all'} onChange={() => handleCarry('all')} />
              <span>{carryLabels.all}</span>
            </label>
          </div>
        ) : null}
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
      <AdComponent slot="elempage-rectangle-1" size="rectangle" className="bottom-ad" />
    </div>
  );
};

export default ElemPage; 