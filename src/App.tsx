import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import MainPage from './pages/MainPage';
import ElemPage from './pages/ElemPage';
import ProblemPage from './pages/ProblemPage';
import ResultPage from './pages/ResultPage';
import QrAnswerPage from './pages/QrAnswerPage';
import ConsentManager from './components/ConsentManager';

function App() {
  const [userConsent, setUserConsent] = useState<boolean>(true);

  const handleConsentChange = (consent: boolean) => {
    setUserConsent(consent);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/elem" element={<ElemPage userConsent={userConsent} />} />
          <Route path="/elem/problems" element={<ProblemPage userConsent={userConsent} />} />
          <Route path="/elem/result" element={<ResultPage userConsent={userConsent} />} />
          <Route path="/qr-answer" element={<QrAnswerPage />} />
        </Routes>
        <ConsentManager onConsentChange={handleConsentChange} />
    </Router>
  );
}

export default App;
