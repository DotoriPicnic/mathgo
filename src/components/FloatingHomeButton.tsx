import React from 'react';
import { Link } from 'react-router-dom';

const FloatingHomeButton: React.FC = () => {
  return (
    <Link
      to="/"
      className="floating-home lg:hidden"
      aria-label="홈으로"
    >
      <span className="text-xl">🏠</span>
    </Link>
  );
};

export default FloatingHomeButton;
