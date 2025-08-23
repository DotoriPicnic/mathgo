import React from 'react';
import Navigation from '../components/Navigation';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navigation />
      
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          개인정보처리방침
        </h1>

        <div style={{ lineHeight: '1.8', color: '#374151' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>최종 업데이트:</strong> 2024년 12월 19일
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            1. 개인정보 수집 및 이용 목적
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Calcuri(https://www.calcuri.com)는 다음과 같은 목적으로 개인정보를 수집하고 있습니다:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <li>서비스 제공 및 운영</li>
            <li>사용자 경험 개선</li>
            <li>광고 서비스 제공</li>
            <li>고객 지원 및 문의 응답</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            2. 수집하는 개인정보 항목
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            당사는 다음과 같은 개인정보를 수집할 수 있습니다:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <li>IP 주소</li>
            <li>브라우저 정보</li>
            <li>방문 일시 및 페이지</li>
            <li>쿠키 정보</li>
            <li>기기 정보</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            3. 개인정보 보유 및 이용기간
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            수집된 개인정보는 서비스 제공 목적 달성 후 즉시 파기됩니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관됩니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            4. 개인정보의 제3자 제공
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            당사는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우에는 예외로 합니다:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <li>사용자가 사전에 동의한 경우</li>
            <li>법령에 의해 요구되는 경우</li>
            <li>수사기관의 수사목적으로 법령에 정해진 절차에 따라 요구되는 경우</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            5. 개인정보 보호책임자
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <p><strong>개인정보 보호책임자</strong></p>
            <p>이메일: calcuriofficial@gmail.com</p>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            6. 개인정보 처리방침 변경
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            7. 개인정보의 안전성 확보 조치
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            당사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <li>개인정보의 암호화</li>
            <li>해킹 등에 대비한 기술적 대책</li>
            <li>개인정보에 대한 접근 제한</li>
            <li>개인정보 취급 직원의 최소화 및 교육</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
