import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LogInPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
