import { motion } from 'framer-motion';
import { Terminal, MessageSquare, ChevronRight, Zap, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export default function Dashboard() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('devguide_auth') === 'true';

    const user = {
        name: isAuthenticated ? "Alex" : "Developer",
        level: isAuthenticated ? 4 : 1,
        xp: isAuthenticated ? 340 : 0,
        nextLevelXp: 500,
        streak: isAuthenticated ? 12 : 0,
        completedTopics: isAuthenticated ? 45 : 0
    };

    const progressPercentage = (user.xp / user.nextLevelXp) * 100;

    return (
        <motion.div
            className="dashboard-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Top Banner */}
            <section className="content-padding pb-0">
                <header className="mb-8">
                    <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-2">
                        {isAuthenticated ? "Welcome back, " : "Welcome, "}
                        <span className="text-accent-primary">{user.name}</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-secondary">
                        {isAuthenticated
                            ? "Continue your engineering journey today."
                            : "Start your journey to engineering mastery today."}
                    </motion.p>
                </header>

                <div className="dashboard-hero-grid">
                    {/* Daily Topic Preview (White Card on Dark Background) */}
                    <motion.div variants={itemVariants} className="card flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="badge badge-level">Today's Topic</span>
                                <span className="text-xs text-muted font-bold">March 27</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Understanding Node.js Event Loop</h2>
                            <p className="text-secondary text-sm mb-6 line-clamp-2">
                                Master asynchronous behavior, libuv, and the phases of the Event Loop.
                            </p>
                        </div>
                        <Link to="/learning" className="btn btn-primary w-full mt-auto">
                            Start Learning
                        </Link>
                    </motion.div>

                    {/* Progress Card (White Card on Dark Background) */}
                    <motion.div variants={itemVariants} className="card profile-summary">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="badge badge-level" style={{ background: 'var(--accent-primary)', color: 'white' }}>Lvl {user.level}</div>
                                <div>
                                    <h3 className="text-lg font-bold">{isAuthenticated ? "Your Progress" : "Guest Mode"}</h3>
                                    <p className="text-xs text-muted font-bold">{user.xp} / {user.nextLevelXp} XP</p>
                                </div>
                            </div>
                            {isAuthenticated && (
                                <div className="flex items-center gap-1 text-warning">
                                    <Zap size={18} fill="currentColor" />
                                    <span className="font-bold text-sm">{user.streak} Day Streak</span>
                                </div>
                            )}
                        </div>
                        <div className="progress-container mb-6 bg-border-color">
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <div className="flex justify-between border-t border-border-color pt-4">
                            <div>
                                <span className="block text-2xl font-bold">{user.completedTopics}</span>
                                <span className="text-xs font-bold text-muted uppercase">Topics</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold">{isAuthenticated ? "12" : "0"}</span>
                                <span className="text-xs font-bold text-muted uppercase">Interviews</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bottom Section similar to 'Our recommendations' in the image */}
            <section className="light-section content-padding text-center">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-10">
                    Quick Actions
                </motion.h2>

                <div className="quick-action-cards flex gap-6 justify-center flex-wrap">
                    <motion.div variants={itemVariants} className="flex-1 min-w-[250px] max-w-sm text-left relative group">
                        <div className="absolute top-4 right-4 z-10">
                            <span className="badge" style={{ backgroundColor: 'var(--success)', color: 'white' }}>AI</span>
                        </div>
                        <div
                            className="card h-full flex flex-col hover:border-accent-primary transition-colors cursor-pointer bg-light shadow-sm"
                            onClick={() => navigate('/interview')}
                        >
                            <div className="bg-bg-primary h-40 flex items-center justify-center rounded-lg mb-4 border border-border-color group-hover:bg-accent-primary group-hover:text-white transition-colors text-accent-primary">
                                <Terminal size={48} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Mock Interview</h3>
                            <p className="text-sm text-secondary">Simulate a technical interview with AI feedback.</p>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex-1 min-w-[250px] max-w-sm text-left relative group">
                        <div className="absolute top-4 right-4 z-10">
                            <span className="badge" style={{ backgroundColor: 'var(--accent-tertiary)', color: 'white' }}>Live</span>
                        </div>
                        <div
                            className="card h-full flex flex-col hover:border-accent-tertiary transition-colors cursor-pointer bg-light shadow-sm"
                            onClick={() => navigate('/ask-doubt')}
                        >
                            <div className="bg-bg-primary h-40 flex items-center justify-center rounded-lg mb-4 border border-border-color group-hover:bg-accent-tertiary group-hover:text-white transition-colors text-accent-tertiary">
                                <MessageSquare size={48} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Ask a Doubt</h3>
                            <p className="text-sm text-secondary">Get simple, detailed, or code-based explanations.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style jsx>{`
        .dashboard-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        @media (max-width: 900px) {
          .dashboard-hero-grid {
            grid-template-columns: 1fr;
          }
        }

        .bg-light {
          background-color: var(--bg-light);
        }
      `}</style>
        </motion.div>
    );
}
