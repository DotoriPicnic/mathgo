import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MainPage from './pages/MainPage';
import ElemPage from './pages/ElemPage';
import MiddlePage from './pages/MiddlePage';
import ProblemPage from './pages/ProblemPage';
import ResultPage from './pages/ResultPage';
import QrAnswerPage from './pages/QrAnswerPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ConsentManager from './components/ConsentManager';
import FloatingHomeButton from './components/FloatingHomeButton';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/elem" element={<ElemPage />} />
            <Route path="/middle" element={<MiddlePage />} />
            <Route path="/elem/problems" element={<ProblemPage />} />
            <Route path="/middle/problems" element={<ProblemPage />} />
            <Route path="/elem/result" element={<ResultPage />} />
            <Route path="/middle/result" element={<ResultPage />} />
            <Route path="/qr-answer" element={<QrAnswerPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <FloatingHomeButton />
        <ConsentManager onConsentChange={() => {}} />
      </div>
    </Router>
  );
}

export default App;
