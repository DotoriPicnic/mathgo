import React from 'react';

const HomeButton: React.FC = () => {
  const handleClick = () => {
    // 간단하게 window.location 사용
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 20,
        right: 24,
        zIndex: 100,
        background: 'white',
        border: '2px solid #2563eb',
        borderRadius: '50%',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      aria-label="홈으로"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#2563eb" strokeWidth="2" fill="none"/>
        <polyline points="9,22 9,12 15,12 15,22" stroke="#2563eb" strokeWidth="2" fill="none"/>
      </svg>
    </button>
  );
};

export default HomeButton; 