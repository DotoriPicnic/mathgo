import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 한국어 번역
const ko = {
  translation: {
    mainTitle: '초등 수학 문제집',
    mainSubtitle: '초등학생을 위한 맞춤형 수학 문제를 만들어보세요!',
    mainDescription: '초등 수학 연산 문제를 자동으로 생성해주는 서비스입니다. 모바일 환경에서도 간편하게 사용할 수 있습니다.',
    startButton: '시작하기',
    footerDescription: '초등학생 수학 학습을 위한 무료 도구입니다',
    contactEmail: '문의/건의:',
    language: '언어',
    korean: '한국어',
    english: 'English',
    chinese: '中文'
  }
};

// 영어 번역
const en = {
  translation: {
    mainTitle: 'Elementary Math Workbook',
    mainSubtitle: 'Create customized math problems for elementary students!',
    mainDescription: 'A service that automatically generates elementary math operation problems. Easy to use even on mobile devices.',
    startButton: 'Get Started',
    footerDescription: 'Free tool for elementary math learning',
    contactEmail: 'Contact/Suggestions:',
    language: 'Language',
    korean: '한국어',
    english: 'English',
    chinese: '中文'
  }
};

// 중국어 번역
const zh = {
  translation: {
    mainTitle: '小学数学练习册',
    mainSubtitle: '为小学生创建定制数学题！',
    mainDescription: '自动生成小学数学运算题的服务。在移动设备上也能轻松使用。',
    startButton: '开始使用',
    footerDescription: '小学生数学学习的免费工具',
    contactEmail: '联系/建议：',
    language: '语言',
    korean: '한국어',
    english: 'English',
    chinese: '中文'
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
