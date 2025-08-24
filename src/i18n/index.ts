import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 한국어 번역
const ko = {
  translation: {
    // 메인 페이지
    mainTitle: '초등 수학 문제집',
    mainSubtitle: '초등학생을 위한 맞춤형 수학 문제를 만들어보세요!',
    mainDescription: '초등 수학 연산 문제를 자동으로 생성해주는 서비스입니다. 모바일 환경에서도 간편하게 사용할 수 있습니다.',
    startButton: '시작하기',
    footerDescription: '초등학생 수학 학습을 위한 무료 도구입니다',
    contactEmail: '문의/건의:',
    
    // 네비게이션
    elementary: '초등',
    middle: '중등',
    high: '고등',
    preparing: '준비중',
    home: '홈',
    
    // 주요 기능 섹션
    featuresTitle: '주요 기능',
    featuresSubtitle: 'Calcuri만의 특별한 학습 도구들을 경험해보세요',
    
    // 기능 카드
    featureCard1: {
      title: '📝 다양한 유형',
      description: '덧셈, 뺄셈, 곱셈, 나눗셈 문제를 제공합니다'
    },
    featureCard2: {
      title: '⏰ 타이머 기능',
      description: '시간 제한을 설정하여 실전 연습을 할 수 있습니다'
    },
    featureCard3: {
      title: '📄 PDF 출력',
      description: '문제를 PDF로 출력하여 오프라인에서도 사용할 수 있습니다'
    },
    featureCard4: {
      title: '📱 모바일 친화적',
      description: '모바일 환경에서도 편리하게 사용할 수 있습니다'
    },
    
    // 언어 선택
    language: '언어',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    
    // ElemPage
    elemTitle: '초등학교 연산 문제 생성',
    operationType: '연산 종류:',
    problemType: '문제 유형:',
    timeLimit: '제한 시간:',
    useTimeLimit: '제한 시간 사용',
    minutes: '분',
    generateProblems: '문제 생성',
    example: '예시:',
    
    // 연산 종류
    comparisonOperation: '비교 연산',
    addition: '덧셈',
    subtraction: '뺄셈',
    multiplication: '곱셈',
    division: '나눗셈',
    fraction: '분수',
    decimal: '소수 (서비스 준비중)',
    
    // 올림/내림 옵션
    carryWith: '올림 있는 계산만',
    carryWithout: '올림 없는 계산만',
    carryAll: '섞어서',
    borrowWith: '내림 있는 계산만',
    borrowWithout: '내림 없는 계산만',
    borrowAll: '섞어서',
    impossible: ' (불가능)',
    
    // 문제 유형들
    singleDigitAddition: '한자릿수 + 한자릿수',
    doubleDigitSingleAddition: '두자릿수 + 한자릿수',
    doubleDigitAddition: '두자릿수 + 두자릿수',
    tripleDigitAddition: '세자릿수 + 세자릿수',
    singleDigitSubtraction: '한자릿수 - 한자릿수',
    doubleDigitSingleSubtraction: '두자릿수 - 한자릿수',
    doubleDigitSubtraction: '두자릿수 - 두자릿수',
    tripleDigitSubtraction: '세자릿수 - 세자릿수',
    singleDigitMultiplication: '한자릿수 × 한자릿수',
    doubleDigitSingleMultiplication: '두자릿수 × 한자릿수',
    doubleDigitMultiplication: '두자릿수 × 두자릿수',
    doubleDigitDivision: '두자릿수 ÷ 한자릿수',
    tripleDigitDivision: '세자릿수 ÷ 한자릿수',
    tripleDigitDoubleDivision: '세자릿수 ÷ 두자릿수',
    
    // 빈칸 문제
    blankSingleDigit: '빈칸 문제 한자릿수',
    blankDoubleDigit: '빈칸 문제 두자릿수',
    blankTripleDigit: '빈칸 문제 세자릿수',
    blankSingleDigitSubtraction: '빈칸 문제 한자릿수(뺄셈)',
    blankDoubleDigitSubtraction: '빈칸 문제 두자릿수(뺄셈)',
    blankTripleDigitSubtraction: '빈칸 문제 세자릿수(뺄셈)',
    blankSingleDigitMultiplication: '빈칸 문제 한자릿수(곱셈)',
    blankDoubleDigitMultiplication: '빈칸 문제 두자릿수(곱셈)',
    blankSingleDigitDivision: '빈칸 문제 한자릿수(나눗셈)',
    blankDoubleDigitDivision: '빈칸 문제 두자릿수(나눗셈)',
    
    // 분수 연산
    fractionAddition: '분수 덧셈',
    fractionSubtraction: '분수 뺄셈',
    fractionMultiplication: '분수 곱셈',
    fractionDivision: '분수 나눗셈',
    
    // 소수 연산
    decimalAdditionSingle: '소수 덧셈 (소수점 한자릿수)',
    decimalAdditionDouble: '소수 덧셈 (소수점 두자릿수)',
    decimalSubtractionSingle: '소수 뺄셈 (소수점 한자릿수)',
    decimalSubtractionDouble: '소수 뺄셈 (소수점 두자릿수)',
    decimalMultiplicationSingle: '소수 곱셈 (소수점 한자릿수)',
    decimalMultiplicationDouble: '소수 곱셈 (소수점 두자릿수)',
    decimalDivisionSingle: '소수 나눗셈 (소수점 한자릿수)',
    decimalDivisionDouble: '소수 나눗셈 (소수점 두자릿수)',
    
    // 비교 연산
    comparisonOperationType: 'A ㅁ B 비교 연산',
    
    // 새로운 카테고리들
    decimalOperation: '소수 연산',
    mixedOperation: '혼합 연산',
    factorMultiple: '약수와 배수',
    unitConversion: '단위 변환',
    
    // 소수 연산 주의사항
    decimalWarning: '⚠️ 주의사항: 소수 연산에서는 소수점 세자리에서 반올림하여 소수점 두자리까지만 표시됩니다.',
    
    // ProblemPage
    problemWorkbook: '연산문제집',
    fractionOperation: '분수 연산',
    quotient: '몫',
    remainder: '나머지',
    includeAnswer: '정답 포함',
    savePDF: 'PDF 저장',
    gradeProblems: '채점하기',
    timeLeft: '남은 시간',
    submitAnswers: '답안 제출',
    
    // ResultPage
    noProblemsToGrade: '채점할 문제가 없습니다.',
    generateProblemsFirst: '메인 화면에서 문제를 먼저 생성해 주세요.',
    correctAnswer: '정답',
    retryProblems: '다시 풀기',
    goToMain: '메인으로',
    
    // 공통
    back: '뒤로',
    next: '다음',
    submit: '제출',
    cancel: '취소',
    save: '저장',
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    success: '성공했습니다'
  }
};

// 영어 번역
const en = {
  translation: {
    // 메인 페이지
    mainTitle: 'Elementary Math Workbook',
    mainSubtitle: 'Create customized math problems for elementary students!',
    mainDescription: 'A service that automatically generates elementary math operation problems. Easy to use even on mobile devices.',
    startButton: 'Get Started',
    footerDescription: 'Free tool for elementary math learning',
    contactEmail: 'Contact/Suggestions:',
    
    // 네비게이션
    elementary: 'Elementary',
    middle: 'Middle',
    high: 'High',
    preparing: 'Preparing',
    home: 'Home',
    
    // 주요 기능 섹션
    featuresTitle: 'Key Features',
    featuresSubtitle: 'Experience Calcuri\'s special learning tools',
    
    // 기능 카드
    featureCard1: {
      title: '📝 Various Types',
      description: 'Provides addition, subtraction, multiplication, and division problems'
    },
    featureCard2: {
      title: '⏰ Timer Function',
      description: 'Set time limits for real practice sessions'
    },
    featureCard3: {
      title: '📄 PDF Export',
      description: 'Export problems as PDF for offline use'
    },
    featureCard4: {
      title: '📱 Mobile Friendly',
      description: 'Convenient to use on mobile devices'
    },
    
    // 언어 선택
    language: 'Language',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    
    // ElemPage
    elemTitle: 'Elementary Math Problem Generator',
    operationType: 'Operation Type:',
    problemType: 'Problem Type:',
    timeLimit: 'Time Limit:',
    useTimeLimit: 'Use Time Limit',
    minutes: 'minutes',
    generateProblems: 'Generate Problems',
    example: 'Example:',
    
    // 연산 종류
    comparisonOperation: 'Comparison',
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    fraction: 'Fraction',
    decimal: 'Decimal (Coming Soon)',
    
    // 올림/내림 옵션
    carryWith: 'With Carry Only',
    carryWithout: 'Without Carry Only',
    carryAll: 'Mixed',
    borrowWith: 'With Borrow Only',
    borrowWithout: 'Without Borrow Only',
    borrowAll: 'Mixed',
    impossible: ' (Impossible)',
    
    // 문제 유형들
    singleDigitAddition: 'Single Digit + Single Digit',
    doubleDigitSingleAddition: 'Double Digit + Single Digit',
    doubleDigitAddition: 'Double Digit + Double Digit',
    tripleDigitAddition: 'Triple Digit + Triple Digit',
    singleDigitSubtraction: 'Single Digit - Single Digit',
    doubleDigitSingleSubtraction: 'Double Digit - Single Digit',
    doubleDigitSubtraction: 'Double Digit - Double Digit',
    tripleDigitSubtraction: 'Triple Digit - Triple Digit',
    singleDigitMultiplication: 'Single Digit × Single Digit',
    doubleDigitSingleMultiplication: 'Double Digit × Single Digit',
    doubleDigitMultiplication: 'Double Digit × Double Digit',
    doubleDigitDivision: 'Double Digit ÷ Single Digit',
    tripleDigitDivision: 'Triple Digit ÷ Single Digit',
    tripleDigitDoubleDivision: 'Triple Digit ÷ Double Digit',
    
    // 빈칸 문제
    blankSingleDigit: 'Blank Problem Single Digit',
    blankDoubleDigit: 'Blank Problem Double Digit',
    blankTripleDigit: 'Blank Problem Triple Digit',
    blankSingleDigitSubtraction: 'Blank Problem Single Digit (Subtraction)',
    blankDoubleDigitSubtraction: 'Blank Problem Double Digit (Subtraction)',
    blankTripleDigitSubtraction: 'Blank Problem Triple Digit (Subtraction)',
    blankSingleDigitMultiplication: 'Blank Problem Single Digit (Multiplication)',
    blankDoubleDigitMultiplication: 'Blank Problem Double Digit (Multiplication)',
    blankSingleDigitDivision: 'Blank Problem Single Digit (Division)',
    blankDoubleDigitDivision: 'Blank Problem Double Digit (Division)',
    
    // 분수 연산
    fractionAddition: 'Fraction Addition',
    fractionSubtraction: 'Fraction Subtraction',
    fractionMultiplication: 'Fraction Multiplication',
    fractionDivision: 'Fraction Division',
    
    // 소수 연산
    decimalAdditionSingle: 'Decimal Addition (1 decimal place)',
    decimalAdditionDouble: 'Decimal Addition (2 decimal places)',
    decimalSubtractionSingle: 'Decimal Subtraction (1 decimal place)',
    decimalSubtractionDouble: 'Decimal Subtraction (2 decimal places)',
    decimalMultiplicationSingle: 'Decimal Multiplication (1 decimal place)',
    decimalMultiplicationDouble: 'Decimal Multiplication (2 decimal places)',
    decimalDivisionSingle: 'Decimal Division (1 decimal place)',
    decimalDivisionDouble: 'Decimal Division (2 decimal places)',
    
    // 비교 연산
    comparisonOperationType: 'A □ B Comparison',
    
    // 새로운 카테고리들
    decimalOperation: 'Decimal Operation',
    mixedOperation: 'Mixed Operation',
    factorMultiple: 'Factors and Multiples',
    unitConversion: 'Unit Conversion',
    
    // 소수 연산 주의사항
    decimalWarning: '⚠️ Note: In decimal operations, results are rounded to two decimal places from three decimal places.',
    
    // ProblemPage
    problemWorkbook: 'Math Workbook',
    fractionOperation: 'Fraction Operation',
    quotient: 'Quotient',
    remainder: 'Remainder',
    includeAnswer: 'Include Answer',
    savePDF: 'Save PDF',
    gradeProblems: 'Grade Problems',
    timeLeft: 'Time Left',
    submitAnswers: 'Submit Answers',
    
    // ResultPage
    noProblemsToGrade: 'No problems to grade.',
    generateProblemsFirst: 'Please generate problems from the main page first.',
    correctAnswer: 'Correct Answer',
    retryProblems: 'Try Again',
    goToMain: 'Go to Main',
    
    // 공통
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success'
  }
};

// 중국어 번역
const zh = {
  translation: {
    // 메인 페이지
    mainTitle: '小学数学练习册',
    mainSubtitle: '为小学生创建定制数学题！',
    mainDescription: '自动生成小学数学运算题的服务。在移动设备上也能轻松使用。',
    startButton: '开始使用',
    footerDescription: '小学生数学学习的免费工具',
    contactEmail: '联系/建议：',
    
    // 네비게이션
    elementary: '小学',
    middle: '初中',
    high: '高中',
    preparing: '准备中',
    home: '首页',
    
    // 주요 기능 섹션
    featuresTitle: '主要功能',
    featuresSubtitle: '体验Calcuri独特的学习工具',
    
    // 기능 카드
    featureCard1: {
      title: '📝 多种类型',
      description: '提供加法、减法、乘法、除法题目'
    },
    featureCard2: {
      title: '⏰ 计时功能',
      description: '设置时间限制进行实战练习'
    },
    featureCard3: {
      title: '📄 PDF导出',
      description: '将题目导出为PDF供离线使用'
    },
    featureCard4: {
      title: '📱 移动友好',
      description: '在移动设备上方便使用'
    },
    
    // 언어 선택
    language: '语言',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    
    // ElemPage
    elemTitle: '小学数学题生成器',
    operationType: '运算类型：',
    problemType: '题目类型：',
    timeLimit: '时间限制：',
    useTimeLimit: '使用时间限制',
    minutes: '分钟',
    generateProblems: '生成题目',
    example: '示例：',
    
    // 연산 종류
    comparisonOperation: '比较运算',
    addition: '加法',
    subtraction: '减法',
    multiplication: '乘法',
    division: '除法',
    fraction: '分数',
    decimal: '小数（即将推出）',
    
    // 올림/내림 옵션
    carryWith: '仅进位',
    carryWithout: '仅不进位',
    carryAll: '混合',
    borrowWith: '仅借位',
    borrowWithout: '仅不借位',
    borrowAll: '混合',
    impossible: '（不可能）',
    
    // 문제 유형들
    singleDigitAddition: '一位数 + 一位数',
    doubleDigitSingleAddition: '两位数 + 一位数',
    doubleDigitAddition: '两位数 + 两位数',
    tripleDigitAddition: '三位数 + 三位数',
    singleDigitSubtraction: '一位数 - 一位数',
    doubleDigitSingleSubtraction: '两位数 - 一位数',
    doubleDigitSubtraction: '两位数 - 两位数',
    tripleDigitSubtraction: '三位数 - 三位数',
    singleDigitMultiplication: '一位数 × 一位数',
    doubleDigitSingleMultiplication: '两位数 × 一位数',
    doubleDigitMultiplication: '两位数 × 两位数',
    doubleDigitDivision: '两位数 ÷ 一位数',
    tripleDigitDivision: '三位数 ÷ 一位数',
    tripleDigitDoubleDivision: '三位数 ÷ 两位数',
    
    // 빈칸 문제
    blankSingleDigit: '填空题一位数',
    blankDoubleDigit: '填空题两位数',
    blankTripleDigit: '填空题三位数',
    blankSingleDigitSubtraction: '填空题一位数（减法）',
    blankDoubleDigitSubtraction: '填空题两位数（减法）',
    blankTripleDigitSubtraction: '填空题三位数（减法）',
    blankSingleDigitMultiplication: '填空题一位数（乘法）',
    blankDoubleDigitMultiplication: '填空题两位数（乘法）',
    blankSingleDigitDivision: '填空题一位数（除法）',
    blankDoubleDigitDivision: '填空题两位数（除法）',
    
    // 분수 연산
    fractionAddition: '分数加法',
    fractionSubtraction: '分数减法',
    fractionMultiplication: '分数乘法',
    fractionDivision: '分数除法',
    
    // 소수 연산
    decimalAdditionSingle: '小数加法（一位小数）',
    decimalAdditionDouble: '小数加法（两位小数）',
    decimalSubtractionSingle: '小数减法（一位小数）',
    decimalSubtractionDouble: '小数减法（两位小数）',
    decimalMultiplicationSingle: '小数乘法（一位小数）',
    decimalMultiplicationDouble: '小数乘法（两位小数）',
    decimalDivisionSingle: '小数除法（一位小数）',
    decimalDivisionDouble: '小数除法（两位小数）',
    
    // 비교 연산
    comparisonOperationType: 'A □ B 比较运算',
    
    // 새로운 카테고리들
    decimalOperation: '小数运算',
    mixedOperation: '混合运算',
    factorMultiple: '因数和倍数',
    unitConversion: '单位换算',
    
    // 소수 연산 주의사항
    decimalWarning: '⚠️ 注意：小数运算中，结果从三位小数四舍五入到两位小数。',
    
    // ProblemPage
    problemWorkbook: '运算练习册',
    fractionOperation: '分数运算',
    quotient: '商',
    remainder: '余数',
    includeAnswer: '包含答案',
    savePDF: '保存PDF',
    gradeProblems: '评分',
    timeLeft: '剩余时间',
    submitAnswers: '提交答案',
    
    // ResultPage
    noProblemsToGrade: '没有可评分的题目。',
    generateProblemsFirst: '请先从主页生成题目。',
    correctAnswer: '正确答案',
    retryProblems: '重新练习',
    goToMain: '返回主页',
    
    // 공통
    back: '返回',
    next: '下一步',
    submit: '提交',
    cancel: '取消',
    save: '保存',
    loading: '加载中...',
    error: '发生错误',
    success: '成功'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ko, en, zh },
    fallbackLng: 'ko',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['navigator', 'localStorage', 'cookie'],
      caches: ['localStorage'],
    }
  });

export default i18n;
