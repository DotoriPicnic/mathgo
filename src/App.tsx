import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage';
import ElemPage from './pages/ElemPage';
import ProblemPage from './pages/ProblemPage';
import ResultPage from './pages/ResultPage';
import QrAnswerPage from './pages/QrAnswerPage';

function App() {
  return (
    <Router basename="/mathgo">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/elem" element={<ElemPage />} />
          <Route path="/elem/problems" element={<ProblemPage />} />
          <Route path="/elem/result" element={<ResultPage />} />
          <Route path="/qr-answer" element={<QrAnswerPage />} />
        </Routes>
    </Router>
  );
}

export default App;
