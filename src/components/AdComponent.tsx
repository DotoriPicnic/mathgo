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
  type: 'adsense' | 'coupang';
  size?: 'banner' | 'sidebar' | 'rectangle';
  className?: string;
  userConsent?: boolean;
}

const AdComponent: React.FC<AdComponentProps> = ({ type, size = 'banner', className = '', userConsent = true }) => {
  // 광고 활성화 여부 확인 (Vite에서는 import.meta.env 사용)
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';
  
  // 유럽 사용자의 동의 여부 확인
  const canShowAds = adsEnabled && userConsent;
  
  useEffect(() => {
    if (!canShowAds) return;
    
    // Google AdSense 스크립트 로드
    if (type === 'adsense' && !window.adsbygoogle) {
      const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
      if (publisherId) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }

    // 쿠팡 파트너스 스크립트 로드
    if (type === 'coupang' && !window.coupang) {
      const script = document.createElement('script');
      script.src = 'https://ads-partners.coupang.com/g.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [type, adsEnabled]);

  // AdSense 광고 로드
  useEffect(() => {
    if (type === 'adsense' && canShowAds && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.log('AdSense 광고 로드 중 오류:', error);
      }
    }
  }, [type, canShowAds]);

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

  if (type === 'adsense') {
    const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
    const adSlot = import.meta.env.VITE_ADSENSE_BANNER_SLOT;
    
    if (!canShowAds || !publisherId || !adSlot) {
      return (
        <div className={`ad-container adsense ${className} hidden`} style={{ 
          width: adSize.width, 
          height: adSize.height, 
          margin: '20px auto',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#6c757d', fontSize: '14px' }}>광고 영역</span>
        </div>
      );
    }
    
    return (
      <div className={`ad-container adsense ${className}`} style={{ 
        width: adSize.width, 
        height: adSize.height, 
        margin: '20px auto',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    );
  }

  if (type === 'coupang') {
    const trackingId = import.meta.env.VITE_COUPANG_TRACKING_ID;
    const campaignId = import.meta.env.VITE_COUPANG_CAMPAIGN_ID;
    
    if (!canShowAds || !trackingId || !campaignId) {
      return (
        <div className={`ad-container coupang ${className} hidden`} style={{ 
          width: adSize.width, 
          height: adSize.height, 
          margin: '20px auto',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#6c757d', fontSize: '14px' }}>광고 영역</span>
        </div>
      );
    }
    
    return (
      <div className={`ad-container coupang ${className}`} style={{ 
        width: adSize.width, 
        height: adSize.height, 
        margin: '20px auto',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <a href="https://www.coupang.com/np/search?component=&q=&channel=user&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&isAddedCart=&ratingCount=&categoryId=&categoryGroup=&productSets=&productCamp=&manualCategoryId=&productId=&inStock=&includeDeliveryFee=&searchId=&isCorrect=true&searchIndex=1" 
           target="_blank" 
           rel="noopener noreferrer"
           data-link-name="coupang_ad">
          <img 
            src={`https://ads-partners.coupang.com/cgi-bin/click?e=${trackingId}&c=${campaignId}`}
            alt="쿠팡 광고"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </a>
      </div>
    );
  }

  return null;
};

export default AdComponent; 