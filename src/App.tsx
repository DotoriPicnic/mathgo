import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage';
import ElemPage from './pages/ElemPage';
import ProblemPage from './pages/ProblemPage';
import ResultPage from './pages/ResultPage';
import QrAnswerPage from './pages/QrAnswerPage';
import ConsentManager from './components/ConsentManager';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/elem" element={<ElemPage />} />
          <Route path="/elem/problems" element={<ProblemPage />} />
          <Route path="/elem/result" element={<ResultPage />} />
          <Route path="/qr-answer" element={<QrAnswerPage />} />
        </Routes>
        <ConsentManager onConsentChange={() => {}} />
    </Router>
  );
}

export default App;
