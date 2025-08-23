import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '0.75rem',
          transition: 'all 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language')}
      >
        <span style={{ fontSize: '1.125rem' }}>{currentLanguage.flag}</span>
        <span style={{ 
          fontWeight: '500', 
          color: '#374151',
          display: window.innerWidth >= 640 ? 'block' : 'none'
        }}>
          {currentLanguage.name}
        </span>
        <svg 
          style={{
            width: '1rem',
            height: '1rem',
            color: '#6b7280',
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          marginTop: '0.5rem',
          width: '12rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #d1d5db',
          padding: '0.5rem 0',
          zIndex: 50
        }}>
          {languages.map((language) => (
            <button
              key={language.code}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                color: i18n.language === language.code ? '#1d4ed8' : '#374151',
                backgroundColor: i18n.language === language.code ? '#dbeafe' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (i18n.language !== language.code) {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (i18n.language !== language.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span style={{ fontSize: '1.125rem' }}>{language.flag}</span>
              <span style={{ fontWeight: '500' }}>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
