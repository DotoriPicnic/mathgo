# 초등 수학 문제 생성기 (MathGo)

초등학생을 위한 맞춤형 수학 문제를 자동으로 생성해주는 웹 애플리케이션입니다.
추후 중, 고등학교 문제까지 생성해볼 예정입니다.

## 주요 기능

- **다양한 연산**: 덧셈, 뺄셈, 곱셈, 나눗셈 문제 생성
- **문제 유형**: 한자릿수, 두자릿수, 세자릿수 연산 및 빈칸 문제
- **올림/내림 옵션**: 올림/내림이 있는 문제만, 없는 문제만, 또는 섞어서 생성
- **타이머 기능**: 시간 제한을 설정하여 실전 연습 가능
- **PDF 출력**: 문제를 PDF로 출력하여 오프라인에서도 사용 가능
- **모바일 친화적**: 모바일 환경에서도 편리하게 사용 가능

## 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **PDF Generation**: jsPDF + html2canvas
- **QR Code**: qrcode.react

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 배포

이 프로젝트는 Vercel을 통해 배포됩니다.

### Vercel 배포 방법

1. [Vercel](https://vercel.com)에 가입하고 로그인
2. GitHub 저장소를 연결
3. 프로젝트를 import
4. 자동으로 빌드 및 배포됨

### 환경 변수

현재 특별한 환경 변수 설정이 필요하지 않습니다.

## 프로젝트 구조

```
src/
├── pages/          # 페이지 컴포넌트
│   ├── MainPage.tsx
│   ├── ElemPage.tsx
│   ├── ProblemPage.tsx
│   ├── ResultPage.tsx
│   └── QrAnswerPage.tsx
├── App.tsx         # 메인 앱 컴포넌트
└── main.tsx        # 앱 진입점
```

## 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다. 

