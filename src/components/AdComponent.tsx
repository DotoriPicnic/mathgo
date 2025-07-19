import React, { useEffect } from 'react';
import './AdComponent.css';

// Window 객체에 광고 관련 속성 추가
declare global {
  interface Window {
    adsbygoogle?: any[];
    coupang?: any;
  }
}

interface AdComponentProps {
  size?: 'banner' | 'sidebar' | 'rectangle';
  className?: string;
  userConsent?: boolean;
}

const AdComponent: React.FC<AdComponentProps> = ({ size = 'banner', className = '', userConsent = true }) => {
  // 광고 활성화 여부 확인 (Vite에서는 import.meta.env 사용)
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';
  
  // 유럽 사용자의 동의 여부 확인
  const canShowAds = adsEnabled && userConsent;
  
  useEffect(() => {
    if (!canShowAds) return;
    
    // Google AdSense 스크립트 로드
    if (!window.adsbygoogle) {
      const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
      if (publisherId) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }
  }, [adsEnabled]);

  // AdSense 광고 로드
  useEffect(() => {
    if (canShowAds && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.log('AdSense 광고 로드 중 오류:', error);
      }
    }
  }, [canShowAds]);

  const getAdSize = () => {
    switch (size) {
      case 'sidebar':
        return { width: 300, height: 600 };
      case 'rectangle':
        return { width: 300, height: 250 };
      case 'banner':
      default:
        return { width: 728, height: 90 };
    }
  };

  const adSize = getAdSize();

  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
  const adSlot = import.meta.env.VITE_ADSENSE_BANNER_SLOT;
  
  if (!canShowAds || !publisherId || !adSlot) {
    return null;
  }
  
  return (
    <div className={`ad-container adsense ${className}`} style={{ 
      width: adSize.width, 
      height: adSize.height, 
      margin: '20px auto',
      textAlign: 'center'
    }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdComponent; 