import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ko', name: t('korean'), flag: '🇰🇷' },
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'zh', name: t('chinese'), flag: '🇨🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language')}
      >
        <span className="flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
