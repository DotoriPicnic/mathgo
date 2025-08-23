import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";

const MainPage: React.FC = () => {
  const { t } = useTranslation();
  
  const popularUnits = [
    {
      title: "덧셈과 뺄셈",
      description: "기본 연산 마스터하기",
      icon: "➕",
      color: "#3b82f6",
      path: "/elem"
    },
    {
      title: "곱셈과 나눗셈",
      description: "구구단부터 나눗셈까지",
      icon: "✖️",
      color: "#14b8a6",
      path: "/elem"
    },
    {
      title: "분수 연산",
      description: "분수의 덧셈과 뺄셈",
      icon: "🔢",
      color: "#f59e0b",
      path: "/elem"
    },
    {
      title: "소수 연산",
      description: "소수점 계산 연습",
      icon: "📊",
      color: "#8b5cf6",
      path: "/elem"
    }
  ];

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
              <button className="btn-secondary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                무료 체험하기
              </button>
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

      {/* Popular Units Section */}
      <section style={{ padding: '4rem 0' }}>
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
              인기 단원
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563'
            }}>
              가장 많이 풀리는 수학 문제들을 확인해보세요
            </p>
          </div>

          {/* Desktop Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {popularUnits.map((unit, index) => (
              <Link
                key={index}
                to={unit.path}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: unit.color,
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{unit.icon}</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  {unit.title}
                </h3>
                <p style={{ color: '#4b5563' }}>
                  {unit.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
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
              주요 기능
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563'
            }}>
              Calcuri만의 특별한 학습 도구들을 경험해보세요
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
            <p style={{ color: '#4b5563' }}>
              {t('contactEmail')} 
              <a 
                href="mailto:calcuriofficial@gmail.com" 
                style={{ color: '#2563eb', textDecoration: 'underline', marginLeft: '0.25rem' }}
              >
                calcuriofficial@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage; 