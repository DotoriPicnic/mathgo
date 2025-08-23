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
  slot: string;
  size?: 'banner' | 'sidebar' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
}

const AdComponent: React.FC<AdComponentProps> = ({ 
  slot, 
  size = 'banner', 
  className = '',
  style = {}
}) => {
  // 광고 활성화 여부 확인 (Vite에서는 import.meta.env 사용)
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true' || true; // 기본적으로 활성화
  
  // 유럽 사용자의 동의 여부 확인
  const canShowAds = true; // AdSense 활성화
  
  useEffect(() => {
    if (!canShowAds) return;
    
    // Google AdSense 스크립트는 이미 index.html에 로드되어 있음
    // 추가 스크립트 로드 불필요
  }, [adsEnabled]);

  // AdSense 광고 로드
  useEffect(() => {
    if (canShowAds) {
      try {
        // AdSense 스크립트가 로드될 때까지 대기
        const loadAd = () => {
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            // 스크립트가 아직 로드되지 않았다면 잠시 후 재시도
            setTimeout(loadAd, 100);
          }
        };
        loadAd();
      } catch (error) {
        console.log('AdSense 광고 로드 중 오류:', error);
      }
    }
  }, [canShowAds, slot]);

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

  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-9155718443189068';
  
  if (!canShowAds || !publisherId || !slot) {
    return null;
  }
  
  return (
    <div 
      className={`ad-container adsense ${className}`} 
      style={{ 
        width: adSize.width, 
        height: adSize.height, 
        margin: '20px auto',
        textAlign: 'center',
        ...style
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdComponent; 