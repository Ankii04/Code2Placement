import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// User Pages
import Dashboard from './pages/Dashboard';
import SubtopicsList from './pages/SubtopicsList';
import {
    DSATopicsList,
    DSATopicDetail,
    QuestionsList,
    QuestionDetail,
    InterviewQA,
    DailyChallenge,
    Forum,
    Profile,
    RoadmapsPage,
    ResourcesPage
} from './pages/PlaceholderPages';

// New Feature Pages
import SkillDashboard from './pages/SkillDashboard';
import MockInterview from './pages/MockInterview';
import ResumeAnalysis from './pages/ResumeAnalysis';
import Courses from './pages/Courses';
import TPOPanel from './pages/TPOPanel';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Admin Pages
import { AdminDashboard, ManageTopics, ManageQuestions, ManageUsers } from './pages/admin/AdminPages';
import ManageContent from './pages/admin/ManageContent';


const AppContent = () => {
    const location = useLocation();
    // Regex to match /problems/:id or /questions/:id
    const isCodingPage = location.pathname.match(/\/problems\/[a-zA-Z0-9]+/) ||
        location.pathname.match(/\/questions\/[a-zA-Z0-9]+/);

    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/roadmaps" element={<RoadmapsPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />

                    {/* Protected User Routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/topics" element={
                        <ProtectedRoute>
                            <DSATopicsList />
                        </ProtectedRoute>
                    } />
                    <Route path="/topics/:topicId/subtopics" element={
                        <ProtectedRoute>
                            <SubtopicsList />
                        </ProtectedRoute>
                    } />
                    <Route path="/topics/:topicId/subtopics/:subtopicId" element={
                        <ProtectedRoute>
                            <DSATopicDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/topics/:id" element={
                        <ProtectedRoute>
                            <DSATopicDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/questions" element={
                        <ProtectedRoute>
                            <QuestionsList />
                        </ProtectedRoute>
                    } />
                    <Route path="/questions/:id" element={
                        <ProtectedRoute>
                            <QuestionDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/problems/:id" element={
                        <ProtectedRoute>
                            <QuestionDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/interview-qa" element={
                        <ProtectedRoute>
                            <InterviewQA />
                        </ProtectedRoute>
                    } />
                    <Route path="/daily-challenge" element={
                        <ProtectedRoute>
                            <DailyChallenge />
                        </ProtectedRoute>
                    } />
                    <Route path="/forum" element={
                        <ProtectedRoute>
                            <Forum />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    {/* New Feature Routes */}
                    <Route path="/skill-dashboard" element={
                        <ProtectedRoute>
                            <SkillDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/mock-interview" element={
                        <ProtectedRoute>
                            <MockInterview />
                        </ProtectedRoute>
                    } />
                    <Route path="/resume-analysis" element={
                        <ProtectedRoute>
                            <ResumeAnalysis />
                        </ProtectedRoute>
                    } />
                    <Route path="/courses" element={
                        <ProtectedRoute>
                            <Courses />
                        </ProtectedRoute>
                    } />
                    <Route path="/tpo" element={
                        <ProtectedRoute>
                            <TPOPanel />
                        </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    } />
                    <Route path="/admin/topics" element={
                        <AdminRoute>
                            <ManageTopics />
                        </AdminRoute>
                    } />
                    <Route path="/admin/content" element={
                        <AdminRoute>
                            <ManageContent />
                        </AdminRoute>
                    } />
                    <Route path="/admin/questions" element={
                        <AdminRoute>
                            <ManageQuestions />
                        </AdminRoute>
                    } />
                    <Route path="/admin/users" element={
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute>
                    } />
                </Routes>
            </main>
            {/* Hide footer on coding pages to prevent double scrolling */}
            {!isCodingPage && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
