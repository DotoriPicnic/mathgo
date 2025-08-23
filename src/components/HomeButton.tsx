import React from 'react';
import './HomeButton.css';

const HomeButton: React.FC = () => {
  const handleClick = () => {
    // 간단하게 window.location 사용
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleClick}
      className="home-button"
      aria-label="홈으로"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#374151" strokeWidth="2" fill="none"/>
        <polyline points="9,22 9,12 15,12 15,22" stroke="#374151" strokeWidth="2" fill="none"/>
      </svg>
      <span>홈</span>
    </button>
  );
};

export default HomeButton; 