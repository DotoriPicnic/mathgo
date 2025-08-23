import React from 'react';
import Navigation from '../components/Navigation';

const TermsOfService: React.FC = () => {
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
          이용약관
        </h1>

        <div style={{ lineHeight: '1.8', color: '#374151' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>최종 업데이트:</strong> 2024년 12월 19일
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제1조 (목적)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            이 약관은 Calcuri(이하 "회사")가 제공하는 초등 수학 문제집 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제2조 (정의)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <li>"서비스"란 회사가 제공하는 초등 수학 문제 생성 및 학습 도구를 의미합니다.</li>
            <li>"이용자"란 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
            <li>"콘텐츠"란 서비스 내에서 제공되는 모든 정보, 자료, 문제 등을 의미합니다.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제3조 (서비스의 제공)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            회사는 다음과 같은 서비스를 제공합니다:
          </p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <li>초등 수학 연산 문제 자동 생성</li>
            <li>PDF 형태의 문제지 출력</li>
            <li>타이머 기능을 통한 학습 관리</li>
            <li>모바일 및 PC 환경 지원</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제4조 (서비스 이용)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            1. 서비스는 무료로 제공되며, 별도의 회원가입 없이 이용할 수 있습니다.<br/>
            2. 이용자는 서비스를 이용함에 있어 관련 법령 및 이 약관을 준수해야 합니다.<br/>
            3. 회사는 서비스의 품질 향상을 위해 서비스 내용을 변경하거나 중단할 수 있습니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제5조 (지적재산권)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            1. 서비스 내 모든 콘텐츠에 대한 지적재산권은 회사에 귀속됩니다.<br/>
            2. 이용자는 서비스를 통해 생성된 문제지를 개인 학습 목적으로만 사용할 수 있습니다.<br/>
            3. 상업적 이용, 재배포, 수정 등은 허용되지 않습니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제6조 (면책조항)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.<br/>
            2. 회사는 이용자가 서비스를 이용하여 얻은 정보로 인한 손해에 대해 책임을 지지 않습니다.<br/>
            3. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대해 책임을 지지 않습니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제7조 (약관의 변경)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다. 변경된 약관은 공지일로부터 효력이 발생합니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제8조 (준거법 및 관할법원)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            1. 이 약관은 대한민국 법률에 따라 규율되고 해석됩니다.<br/>
            2. 서비스 이용으로 발생한 분쟁에 대해 소송이 필요할 경우 회사의 본사 소재지를 관할하는 법원을 관할법원으로 합니다.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            제9조 (문의 및 연락처)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            서비스 이용과 관련된 문의사항은 다음 연락처로 문의해 주시기 바랍니다.
          </p>
          <div style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <p><strong>이메일:</strong> calcuriofficial@gmail.com</p>
            <p><strong>웹사이트:</strong> https://www.calcuri.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
