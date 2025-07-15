import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      {/* 광고 영역 (왼쪽) */}
      <div style={{ flex: 1, background: '#f0f0f0', minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>광고 영역</span>
      </div>
      {/* 메인 컨텐츠 */}
      <div style={{ flex: 3, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>연산 문제집 생성기</h1>
        <p>초등학교, 중학교, 고등학교 연산 문제를 쉽고 빠르게 생성하세요!</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
          <button style={{ fontSize: 20, padding: '16px 32px' }} onClick={() => window.location.href = '/elem'}>초등학교</button>
          <button style={{ fontSize: 20, padding: '16px 32px' }} disabled>중학교 (서비스 예정)</button>
          <button style={{ fontSize: 20, padding: '16px 32px' }} disabled>고등학교 (서비스 예정)</button>
        </div>
      </div>
      {/* 광고 영역 (오른쪽) */}
      <div style={{ flex: 1, background: '#f0f0f0', minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>광고 영역</span>
      </div>
    </div>
  );
};

export default MainPage; 