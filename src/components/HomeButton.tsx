import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
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
      <svg width="24" height="24" fill="#2563eb" viewBox="0 0 24 24">
        <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-5h-6v5H4a1 1 0 0 1-1-1V11.5z" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
      </svg>
    </button>
  );
};

export default HomeButton; 