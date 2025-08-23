import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 hover:scale-105"
      aria-label="홈으로"
    >
      <span className="text-lg">🏠</span>
      <span className="font-medium">홈</span>
    </Link>
  );
};

export default HomeButton; 