import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import HomeButton from "../components/HomeButton";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <HomeButton />
      <div className="main-container">
        <h1 className="main-title">초등 수학 문제 생성기</h1>
        <p className="main-subtitle">초등학생을 위한 맞춤형 수학 문제를 만들어보세요!</p>
        <p className="main-description">초등 수학 연산 문제를 자동으로 생성해주는 서비스입니다. 모바일 환경에서도 간편하게 사용할 수 있습니다.</p>
        
        <div className="start-button-container">
          <Link to="/elem" className="start-button">
            시작하기
          </Link>
        </div>
        
        <div className="feature-cards">
          <div className="feature-card">
            <h3>📝 다양한 유형</h3>
            <p>덧셈, 뺄셈, 곱셈, 나눗셈 문제를 제공합니다</p>
          </div>
          
          <div className="feature-card">
            <h3>⏰ 타이머 기능</h3>
            <p>시간 제한을 설정하여 실전 연습을 할 수 있습니다</p>
          </div>
          
          <div className="feature-card">
            <h3>📄 PDF 출력</h3>
            <p>문제를 PDF로 출력하여 오프라인에서도 사용할 수 있습니다</p>
          </div>
          
          <div className="feature-card">
            <h3>📱 모바일 친화적</h3>
            <p>모바일 환경에서도 편리하게 사용할 수 있습니다</p>
          </div>
        </div>
        
        <div className="footer">
          <p>초등학생 수학 학습을 위한 무료 도구입니다</p>
          <p>
            문의/건의: <a href="mailto:calcuriofficial@gmail.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>calcuriofficial@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 