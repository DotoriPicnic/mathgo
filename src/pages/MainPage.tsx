import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./MainPage.css";
import HomeButton from "../components/HomeButton";
import LanguageSelector from "../components/LanguageSelector";

const MainPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="main-page">
      <div className="header">
        <HomeButton />
        <LanguageSelector />
      </div>
      <div className="main-container">
        <h1 className="main-title">{t('mainTitle')}</h1>
        <p className="main-subtitle">{t('mainSubtitle')}</p>
        <p className="main-description">{t('mainDescription')}</p>
        
        <div className="start-button-container">
          <Link to="/elem" className="start-button">
            {t('startButton')}
          </Link>
        </div>
        
        <div className="feature-cards">
          <div className="feature-card">
            <h3>📝 다양한 유형</h3>
            <p>덧셈, 뺄셈, 곱셈, 나눗셈 문제를 제공합니다</p>
          </div>
          
          <div className="feature-card">
            <h3>⏰ 타이머 기능</h3>
            <p>시간 제한을 설정하여 실전 연습을 할 수 있습니다</p>
          </div>
          
          <div className="feature-card">
            <h3>📄 PDF 출력</h3>
            <p>문제를 PDF로 출력하여 오프라인에서도 사용할 수 있습니다</p>
          </div>
          
          <div className="feature-card">
            <h3>📱 모바일 친화적</h3>
            <p>모바일 환경에서도 편리하게 사용할 수 있습니다</p>
          </div>
        </div>
        
        <div className="footer">
          <p>{t('footerDescription')}</p>
          <p>
            {t('contactEmail')} <a href="mailto:calcuriofficial@gmail.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>calcuriofficial@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 