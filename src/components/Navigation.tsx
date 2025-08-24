import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const menuItems = [
    { path: '/elem', label: t('elementary'), icon: '📚', active: true },
    { path: '/middle', label: t('middle'), icon: '📖', active: true },
    { path: '/high', label: t('high'), icon: '📘', active: false },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 1rem'
      }} className="lg:block">
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '4rem'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'inherit'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: '#2563eb',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>C</span>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>Calcuri</span>
              </Link>
            </div>

            {/* Center Menu */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.active ? item.path : '#'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    color: isActive(item.path) ? '#1d4ed8' : '#4b5563',
                    backgroundColor: isActive(item.path) ? '#dbeafe' : 'transparent',
                    opacity: item.active ? 1 : 0.5,
                    cursor: item.active ? 'pointer' : 'not-allowed'
                  }}
                  onMouseEnter={(e) => {
                    if (item.active && !isActive(item.path)) {
                      e.currentTarget.style.color = '#2563eb';
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.active && !isActive(item.path)) {
                      e.currentTarget.style.color = '#4b5563';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={(e) => {
                    if (!item.active) {
                      e.preventDefault();
                    }
                  }}
                >
                  <span>{item.icon}</span>
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                  {!item.active && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>({t('preparing')})</span>}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <LanguageSelector />
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '0.75rem',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span>🏠</span>
                <span>{t('home')}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 1rem'
      }} className="lg:hidden">
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '4rem'
          }}>
            {/* Logo */}
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: '#2563eb',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>C</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>Calcuri</span>
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: '#4b5563',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'colors 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div style={{
              borderTop: '1px solid #e5e7eb',
              backgroundColor: 'white',
              padding: '0.5rem'
            }}>
              <div style={{ padding: '0.5rem' }}>
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.active ? item.path : '#'}
                    onClick={(e) => {
                      if (!item.active) {
                        e.preventDefault();
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      transition: 'colors 0.2s',
                      textDecoration: 'none',
                      color: isActive(item.path) ? '#1d4ed8' : '#4b5563',
                      backgroundColor: isActive(item.path) ? '#dbeafe' : 'transparent',
                      marginBottom: '0.25rem',
                      opacity: item.active ? 1 : 0.5,
                      cursor: item.active ? 'pointer' : 'not-allowed'
                    }}
                    onMouseEnter={(e) => {
                      if (item.active && !isActive(item.path)) {
                        e.currentTarget.style.color = '#2563eb';
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (item.active && !isActive(item.path)) {
                        e.currentTarget.style.color = '#4b5563';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                    <span style={{ fontWeight: '500' }}>{item.label}</span>
                    {!item.active && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>({t('preparing')})</span>}
                  </Link>
                ))}
                <div style={{
                  paddingTop: '1rem',
                  paddingBottom: '0.75rem',
                  borderTop: '1px solid #e5e7eb',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1rem'
                  }}>
                    <LanguageSelector />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
