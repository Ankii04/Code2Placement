import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Eagerly loaded pages (landing page must be fast)
import HomePage from './pages/HomePage';

// Lazy-loaded pages — only downloaded when user navigates to them
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SubtopicsList = lazy(() => import('./pages/SubtopicsList'));
const DSATopicsList = lazy(() => import('./pages/DSATopicsList'));
const DSATopicDetail = lazy(() => import('./pages/DSATopicDetail'));
const QuestionsList = lazy(() => import('./pages/QuestionsList'));
const QuestionDetail = lazy(() => import('./pages/QuestionDetail'));
const InterviewQA = lazy(() => import('./pages/InterviewQA'));
const DailyChallenge = lazy(() => import('./pages/DailyChallenge'));
const Forum = lazy(() => import('./pages/Forum'));
const Profile = lazy(() => import('./pages/Profile'));
const RoadmapsPage = lazy(() => import('./pages/RoadmapsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));

// New Feature Pages (lazy-loaded)
const SkillDashboard = lazy(() => import('./pages/SkillDashboard'));
const MockInterview = lazy(() => import('./pages/MockInterview'));
const ResumeAnalysis = lazy(() => import('./pages/ResumeAnalysis'));
const Courses = lazy(() => import('./pages/Courses'));

// Admin Pages (lazy-loaded)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageTopics = lazy(() => import('./pages/admin/ManageTopics'));
const ManageQuestions = lazy(() => import('./pages/admin/ManageQuestions'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const ManageContent = lazy(() => import('./pages/admin/ManageContent'));

// Protected Route (small, eagerly loaded)
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Loading spinner for Suspense fallback
const PageLoader = () => (
    <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
    </div>
);

const AppContent = () => {
    const location = useLocation();
    // Regex to match /problems/:id or /questions/:id
    const isCodingPage = location.pathname.match(/\/problems\/[a-zA-Z0-9]+/) ||
        location.pathname.match(/\/questions\/[a-zA-Z0-9]+/);

    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Suspense fallback={<PageLoader />}>
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
                </Suspense>
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
