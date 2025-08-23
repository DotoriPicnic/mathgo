import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";
import AdComponent from "../components/AdComponent";

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0fdfa 100%)'
    }}>
      <Navigation />
      
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '5rem 1rem 4rem',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1.5rem'
            }}>
              {t('mainTitle')}
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              marginBottom: '2rem',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {t('mainSubtitle')}
            </p>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '3rem',
              maxWidth: '32rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {t('mainDescription')}
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to="/elem" className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                {t('startButton')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '2.5rem',
          width: '5rem',
          height: '5rem',
          backgroundColor: '#bfdbfe',
          borderRadius: '50%',
          opacity: 0.2,
          animation: 'pulse 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10rem',
          right: '5rem',
          width: '4rem',
          height: '4rem',
          backgroundColor: '#99f6e4',
          borderRadius: '50%',
          opacity: 0.2,
          animation: 'pulse 2s infinite 1s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5rem',
          left: '5rem',
          width: '3rem',
          height: '3rem',
          backgroundColor: '#fde68a',
          borderRadius: '50%',
          opacity: 0.2,
          animation: 'pulse 2s infinite 0.5s'
        }}></div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              {t('featuresTitle')}
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563'
            }}>
              {t('featuresSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#dbeafe',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📝</span>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {t('featureCard1.title')}
              </h3>
              <p style={{ color: '#4b5563' }}>
                {t('featureCard1.description')}
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#ccfbf1',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>⏰</span>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {t('featureCard2.title')}
              </h3>
              <p style={{ color: '#4b5563' }}>
                {t('featureCard2.description')}
              </p>
            </div>

            {/* 인피드 광고 */}
            <AdComponent 
              slot="mainpage-infeed-1" 
              size="rectangle"
              style={{ 
                gridColumn: 'span 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#fef3c7',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📄</span>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {t('featureCard3.title')}
              </h3>
              <p style={{ color: '#4b5563' }}>
                {t('featureCard3.description')}
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#f3e8ff',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📱</span>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {t('featureCard4.title')}
              </h3>
              <p style={{ color: '#4b5563' }}>
                {t('featureCard4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer 위 배너 광고 */}
      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '0 1rem',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <AdComponent 
          slot="mainpage-banner-1" 
          size="banner"
        />
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f9fafb', padding: '3rem 0' }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
              {t('footerDescription')}
            </p>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
              {t('contactEmail')} 
              <a 
                href="mailto:calcuriofficial@gmail.com" 
                style={{ color: '#2563eb', textDecoration: 'underline', marginLeft: '0.25rem' }}
              >
                calcuriofficial@gmail.com
              </a>
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/privacy" 
                style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                개인정보처리방침
              </Link>
              <Link 
                to="/terms" 
                style={{ 
                  color: '#6b7280', 
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage; 