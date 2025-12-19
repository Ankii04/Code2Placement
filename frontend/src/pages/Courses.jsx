import { useState, useEffect } from 'react';
import api from '../services/api';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ category: '', creator: '' });

    useEffect(() => {
        fetchCourses();
    }, [filter]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams(filter);
            const { data } = await api.get(`/courses?${params}`);
            setCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCourseDetails = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            const [courseRes, progressRes] = await Promise.all([
                api.get(`/courses/${courseId}`),
                token ? api.get(`/courses/${courseId}/progress`) : Promise.resolve({ data: null })
            ]);

            setSelectedCourse(courseRes.data);
            setProgress(progressRes.data);
        } catch (error) {
            console.error('Failed to fetch course details:', error);
        }
    };

    const markVideoComplete = async (videoId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to track progress');
                return;
            }

            const { data } = await api.post(
                `/courses/${selectedCourse._id}/videos/${videoId}/complete`,
                {}
            );

            setProgress(data);
        } catch (error) {
            console.error('Failed to mark video complete:', error);
        }
    };

    const isVideoCompleted = (videoId) => {
        return progress?.completedVideos?.some(cv => cv.video === videoId);
    };

    if (selectedCourse) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <button className="btn btn-ghost" onClick={() => setSelectedCourse(null)} style={{ marginBottom: '2rem' }}>
                    ← Back to Courses
                </button>

                <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                        <div>
                            <h1>{selectedCourse.title}</h1>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                By {selectedCourse.creator} • {selectedCourse.totalVideos} videos
                            </p>
                        </div>
                        {progress && (
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#6366f1' }}>
                                    {progress.progress}%
                                </div>
                                <div style={{ color: 'var(--text-secondary)' }}>Complete</div>
                            </div>
                        )}
                    </div>

                    <p>{selectedCourse.description}</p>
                </div>

                {/* Modules */}
                {selectedCourse.modules?.map((module, moduleIdx) => (
                    <div key={module._id} className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>
                            {moduleIdx + 1}. {module.title}
                        </h2>

                        {module.videos?.map((video, videoIdx) => (
                            <div key={video._id} className="video-item">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                    <input
                                        type="checkbox"
                                        checked={isVideoCompleted(video._id)}
                                        onChange={() => markVideoComplete(video._id)}
                                        className="video-checkbox"
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600' }}>
                                            {moduleIdx + 1}.{videoIdx + 1} {video.title}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            {Math.floor(video.duration / 60)} min
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm"
                                >
                                    Watch ▶️
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="page-header">
                <h1>Courses</h1>
                <p>Learn from the best creators and master your skills</p>
            </div>

            {/* Filters */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <select
                        className="input"
                        value={filter.category}
                        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="DSA">DSA</option>
                        <option value="Web Development">Web Development</option>
                        <option value="System Design">System Design</option>
                        <option value="CS Fundamentals">CS Fundamentals</option>
                    </select>

                    <select
                        className="input"
                        value={filter.creator}
                        onChange={(e) => setFilter({ ...filter, creator: e.target.value })}
                    >
                        <option value="">All Creators</option>
                        <option value="Striver">Striver</option>
                        <option value="Love Babbar">Love Babbar</option>
                        <option value="CodeWithHarry">CodeWithHarry</option>
                        <option value="Apna College">Apna College</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className="spinner"></div>
                </div>
            ) : courses.length === 0 ? (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No courses found</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="course-card glass-card"
                            onClick={() => fetchCourseDetails(course._id)}
                        >
                            {course.thumbnail && (
                                <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                            )}
                            <div style={{ padding: '1.5rem' }}>
                                <h3>{course.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                                    {course.creator}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <span>📹 {course.totalVideos} videos</span>
                                    <span>⏱️ {Math.floor(course.totalDuration / 60)} hrs</span>
                                </div>
                                <div style={{ marginTop: '1rem' }}>
                                    <span className="level-badge">{course.level}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Courses;
