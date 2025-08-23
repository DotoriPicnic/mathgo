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
            <h3>{t('featureCard1.title')}</h3>
            <p>{t('featureCard1.description')}</p>
          </div>
          
          <div className="feature-card">
            <h3>{t('featureCard2.title')}</h3>
            <p>{t('featureCard2.description')}</p>
          </div>
          
          <div className="feature-card">
            <h3>{t('featureCard3.title')}</h3>
            <p>{t('featureCard3.description')}</p>
          </div>
          
          <div className="feature-card">
            <h3>{t('featureCard4.title')}</h3>
            <p>{t('featureCard4.description')}</p>
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