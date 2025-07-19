import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import AdComponent from '../components/AdComponent';
import './ElemPage.css';

// 문제 생성 함수 (연산별, 올림 옵션별)
function generateProblems(
  op: string,
  type: string,
  carry: 'all' | 'with' | 'without',
): { question: string; answer: any }[] {
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
        ans = (parseFloat(a) * parseFloat(b)).toFixed(decimalPlaces + 1);
        q = `${a} × ${b} =`;
      } else if (type.startsWith('소수 나눗셈')) {
        a = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
        b = (Math.random() * (decimalPlaces === 1 ? 9 : 99) + 0.1).toFixed(decimalPlaces);
        ans = parseFloat(b) !== 0 ? (parseFloat(a) / parseFloat(b)).toFixed(decimalPlaces + 1) : '?';
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

// [문제 유형 미리보기용 예시 생성 함수 추가]
function getBlankExample(type: string, carry: 'all' | 'with' | 'without') {
  if (type.startsWith('빈칸 문제')) {
    // 임시로 1개만 생성
    const ex = generateProblems('덧셈', type, carry)[0];
    return ex?.question || '';
  }
  return '';
}

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
  { label: '빈칸 문제 한자릿수(나눗셈)', value: '빈칸 문제 한자릿수(나눗셈)' },
  { label: '빈칸 문제 두자릿수(나눗셈)', value: '빈칸 문제 두자릿수(나눗셈)' },
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

function getFilteredProblemTypes(op: string) {
  if (op === '비교 연산') {
    return [
      { label: 'A ㅁ B 비교 연산', value: 'A ㅁ B 비교 연산' }
    ];
  }
  if (op === '덧셈') {
    return problemTypes.filter(t =>
      typeof t.value === 'string' && (
        t.value.includes('+') ||
        (t.value.startsWith('빈칸 문제') &&
          !t.value.includes('(뺄셈)') &&
          !t.value.includes('(곱셈)') &&
          !t.value.includes('(나눗셈)'))
      )
    );
  }
  if (op === '뺄셈') {
    return problemTypes.filter(t =>
      typeof t.value === 'string' && (
        t.value.includes('-') ||
        (t.value.startsWith('빈칸 문제') && t.value.includes('(뺄셈)'))
      )
    );
  }
  if (op === '곱셈') {
    return problemTypes.filter(t =>
      typeof t.value === 'string' && (
        t.value.includes('×') ||
        (t.value.startsWith('빈칸 문제') && t.value.includes('(곱셈)'))
      )
    );
  }
  if (op === '나눗셈') {
    return problemTypes.filter(t =>
      typeof t.value === 'string' && (
        t.value.includes('÷') ||
        (t.value.startsWith('빈칸 문제') && t.value.includes('(나눗셈)'))
      )
    );
  }
  if (op === '분수') {
    return fractionTypes;
  }
  if (op === '소수') {
    return decimalTypes;
  }
  // 분수 등 기타 연산은 추후 확장
  return problemTypes;
}

const ElemPage: React.FC = () => {
  const navigate = useNavigate();
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
    const problems = generateProblems(op, type, carry);
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
    if (type.startsWith('빈칸 문제')) {
      setExample(getBlankExample(type, carry));
    } else {
      setExample('');
    }
  }, [type, carry]);

  // 연산 종류 변경 시 문제 유형도 자동 변경
  React.useEffect(() => {
    const filtered = getFilteredProblemTypes(op);
    if (filtered.length > 0) {
      // 분수 연산일 때는 fractionTypes의 첫 번째 값으로 명확히 지정
      if (op === '분수') {
        setType(fractionTypes[0].value);
      } else {
        setType(filtered[0].value);
      }
    }
    // eslint-disable-next-line
  }, [op]);

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
        with: '내림 있는 계산만',
        without: '내림 없는 계산만',
        all: '섞어서',
      }
    : {
        with: '올림 있는 계산만',
        without: '올림 없는 계산만',
        all: '섞어서',
      };

  // 라디오 버튼 노출 조건 함수 추가
  const showDecimalCarryRadio = (
    type === '소수 덧셈 (소수점 한자릿수)' ||
    type === '소수 덧셈 (소수점 두자릿수)' ||
    type === '소수 뺄셈 (소수점 한자릿수)' ||
    type === '소수 뺄셈 (소수점 두자릿수)'
  );

  // 연산 종류 배열 추가 (덧셈 위에 비교 연산)
  const operationTypes = [
    { label: '비교 연산', value: '비교 연산' },
    { label: '덧셈', value: '덧셈' },
    { label: '뺄셈', value: '뺄셈' },
    { label: '곱셈', value: '곱셈' },
    { label: '나눗셈', value: '나눗셈' },
    { label: '분수', value: '분수' },
    { label: '소수 (서비스 준비중)', value: '소수', disabled: true },
  ];

  return (
    <div className="elem-page">
      <HomeButton />
      {/* 상단 광고 */}
      <AdComponent type="adsense" size="banner" className="top-ad" />
      <form onSubmit={handleGenerate} className="elem-form">
        <div className="elem-emoji">✏️</div>
        <h2 className="elem-title">
          초등학교 연산 문제 생성
        </h2>
        {/* 빈칸 문제 예시 미리보기 */}
        {type.startsWith('빈칸 문제') && example && (
          <div className="example-preview">
            예시: {example.split('□').map((part, idx, arr) => (
              idx < arr.length - 1 ? (
                <React.Fragment key={idx}>
                  {part}
                  <span style={{ fontSize: 26, fontWeight: 900, margin: '0 4px', verticalAlign: 'middle' }}>□</span>
                </React.Fragment>
              ) : part
            ))}
          </div>
        )}
        {/* 연산 종류 */}
        <div className="form-group">
          <label className="form-label">연산 종류:</label>
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
          <label className="form-label">문제 유형:</label>
          {op === '비교 연산' ? (
            <select
              className="form-select"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{ minWidth: 180 }}
            >
              {getFilteredProblemTypes(op).map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          ) : (
            <div
              className="custom-dropdown"
              onClick={() => setShowTypeList(v => !v)}
            >
              {(op === '분수'
                ? fractionTypes.find(t => t.value === type)
                : op === '소수'
                  ? decimalTypes.find(t => t.value === type)
                  : problemTypes.find(t => t.value === type)
              )?.label}
              <span className="dropdown-arrow">▼</span>
              {showTypeList && (
                <ul className="dropdown-list">
                  {getFilteredProblemTypes(op).map(t => (
                    <li
                      key={t.value}
                      onClick={() => {
                        setType(t.value);
                        setTimeout(() => setShowTypeList(false), 0);
                      }}
                      className={`dropdown-item ${t.value === type ? 'selected' : ''}`}
                    >
                      {t.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {/* 올림/내림 옵션 (라디오 버튼처럼 동작) */}
        {op === '덧셈' || op === '뺄셈' ? (
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
                ) && ' (불가능)'}
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
          <label className="form-label">제한 시간:</label>
          <div className="time-limit-row">
            <div className="time-limit-checkbox">
              <input type="checkbox" checked={useLimit} onChange={e => setUseLimit(e.target.checked)} />
              <span style={{ color: useLimit ? '#222' : '#aaa', fontWeight: 500 }}>제한 시간 사용</span>
            </div>
            <input type="number" min={1} value={limit} disabled={!useLimit} onChange={e => setLimit(Math.max(1, Number(e.target.value)))} className="time-limit-input" />
            <div className="time-limit-buttons">
              <button type="button" disabled={!useLimit} onClick={() => handleLimitChange(1)} className="time-limit-button">▲</button>
              <button type="button" disabled={!useLimit} onClick={() => handleLimitChange(-1)} className="time-limit-button">▼</button>
            </div>
            <span style={{ color: useLimit ? '#222' : '#aaa', fontWeight: 500 }}>분</span>
          </div>
        </div>
        <button type="submit" className="submit-button">문제 생성</button>
      </form>
      {/* 하단 광고 */}
      <AdComponent type="coupang" size="rectangle" className="bottom-ad" />
    </div>
  );
};

export default ElemPage; 