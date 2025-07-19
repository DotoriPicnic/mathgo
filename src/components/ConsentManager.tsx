import React, { useState, useEffect } from 'react';
import './ConsentManager.css';

interface ConsentManagerProps {
  onConsentChange: (consent: boolean) => void;
}

const ConsentManager: React.FC<ConsentManagerProps> = ({ onConsentChange }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<boolean | null>(null);

  // 유럽 지역 확인 함수
  const isEuropeanUser = (): boolean => {
    // EEA, 영국, 스위스 국가 코드
    const europeanCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 
      'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 
      'SE', 'GB', 'CH', 'NO', 'LI', 'IS'
    ];
    
    // 브라우저 언어로 간단히 판단 (실제로는 IP 기반 서비스 사용 권장)
    const userLanguage = navigator.language.toUpperCase();
    const userCountry = userLanguage.split('-')[1] || userLanguage;
    
    return europeanCountries.includes(userCountry);
  };

  useEffect(() => {
    // 저장된 동의 상태 확인
    const savedConsent = localStorage.getItem('adsense-consent');
    
    if (savedConsent !== null) {
      const consentValue = savedConsent === 'true';
      setConsent(consentValue);
      onConsentChange(consentValue);
    } else if (isEuropeanUser()) {
      // 유럽 사용자이고 동의 상태가 없으면 배너 표시
      setShowBanner(true);
    } else {
      // 유럽이 아닌 사용자는 기본적으로 동의
      setConsent(true);
      onConsentChange(true);
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    setConsent(true);
    setShowBanner(false);
    localStorage.setItem('adsense-consent', 'true');
    onConsentChange(true);
  };

  const handleDecline = () => {
    setConsent(false);
    setShowBanner(false);
    localStorage.setItem('adsense-consent', 'false');
    onConsentChange(false);
  };

  const handleManage = () => {
    // 상세 설정 모달 표시 (필요시 구현)
    console.log('상세 설정 모달');
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="consent-banner">
      <div className="consent-content">
        <div className="consent-text">
          <h3>🍪 쿠키 및 개인정보 동의</h3>
          <p>
            당사는 개인화된 광고를 제공하기 위해 쿠키를 사용합니다. 
            이는 서비스 개선과 맞춤형 콘텐츠 제공에 도움이 됩니다.
          </p>
          <p>
            <strong>수집되는 정보:</strong> 광고 식별자, 디바이스 정보, 사용 패턴
          </p>
          <p>
            <strong>사용 목적:</strong> 개인화된 광고 제공, 서비스 개선
          </p>
        </div>
        <div className="consent-buttons">
          <button 
            className="consent-button decline" 
            onClick={handleDecline}
          >
            거부
          </button>
          <button 
            className="consent-button manage" 
            onClick={handleManage}
          >
            상세 설정
          </button>
          <button 
            className="consent-button accept" 
            onClick={handleAccept}
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentManager; 