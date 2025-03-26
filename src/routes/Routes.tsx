import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ResumeBuilderPage from '../pages/ResumeBuilderPage';

// import ResumeBuilderPage from './pages/ResumeBuilderPage'; // Placeholder

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<ResumeBuilderPage />} />
            {/* <Route path="/builder" element={<ResumeBuilderPage />} /> */}
        </Routes>
    </Router>
);

export default AppRoutes;
