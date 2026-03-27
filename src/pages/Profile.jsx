import { motion } from 'framer-motion';
import { UserCircle, Mail, MapPin, Zap, Calendar, Award, Share2, Settings, History, CheckCircle } from 'lucide-react';

export default function Profile() {
    const userData = {
        name: "Alex Johnson",
        username: "@ajohnson_dev",
        email: "alex@devguide.ai",
        location: "Amsterdam, NL",
        level: 4,
        xp: 340,
        nextLevelXp: 500,
        streak: 12,
        joinDate: "January 2026",
        history: [
            { id: 1, topic: "Understanding Event Loop", date: "Today", xp: "+45" },
            { id: 2, topic: "Docker Containers vs VMs", date: "Yesterday", xp: "+30" },
            { id: 3, topic: "SQL Indexing Techniques", date: "2 days ago", xp: "+50" },
            { id: 4, topic: "Mock Interview: Senior Eng", date: "3 days ago", xp: "+120" }
        ]
    };

    const progressPercentage = (userData.xp / userData.nextLevelXp) * 100;

    return (
        <div className="profile-container max-w-5xl mx-auto py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card glass-panel profile-banner p-1 relative overflow-hidden mb-10"
            >
                <div className="banner-bg h-32 w-full absolute top-0 left-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-20"></div>
                <div className="p-8 relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end">
                    <div className="avatar-wrapper flex-shrink-0">
                        <div className="w-32 h-32 rounded-3xl bg-bg-tertiary border-4 border-bg-primary flex items-center justify-center text-accent-primary shadow-lg overflow-hidden relative">
                            <UserCircle size={100} strokeWidth={1} />
                            <div className="absolute bottom-1 right-1 bg-success p-1.5 rounded-full border-2 border-bg-primary"></div>
                        </div>
                    </div>

                    <div className="user-info flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">{userData.name}</h1>
                                <p className="text-muted">{userData.username}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-secondary px-3 py-2 flex items-center gap-2 text-sm"><Settings size={16} /> Edit Profile</button>
                                <button className="btn btn-primary px-3 py-2 flex items-center gap-2 text-sm"><Share2 size={16} /> Share Stats</button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-secondary">
                            <span className="flex items-center gap-1"><Mail size={16} className="text-muted" /> {userData.email}</span>
                            <span className="flex items-center gap-1"><MapPin size={16} className="text-muted" /> {userData.location}</span>
                            <span className="flex items-center gap-1"><Calendar size={16} className="text-muted" /> Joined {userData.joinDate}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="card glass-panel p-6">
                        <h3 className="section-title mb-6 flex items-center gap-2"><History size={18} /> Recent Activity</h3>
                        <div className="space-y-4">
                            {userData.history.map(item => (
                                <div key={item.id} className="activity-item flex items-center justify-between p-4 bg-bg-tertiary/50 border border-border-color rounded-xl hover:border-accent-primary/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle className="text-success" size={20} />
                                        <div>
                                            <p className="font-medium text-sm">{item.topic}</p>
                                            <p className="text-xs text-muted">{item.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-success">{item.xp} XP</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 text-xs font-bold text-accent-primary uppercase tracking-widest py-2 border-t border-border-color">View Full History</button>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="card glass-panel p-6 border-accent-tertiary/20">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="section-title flex items-center gap-2"><Award size={18} /> Level Stats</h3>
                            <div className="badge badge-level">Level {userData.level}</div>
                        </div>

                        <div className="pb-6 border-b border-border-color mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-muted uppercase">Progress to Lvl {userData.level + 1}</span>
                                <span className="text-sm font-bold">{userData.xp} / {userData.nextLevelXp} XP</span>
                            </div>
                            <div className="progress-container h-3">
                                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="stat-card p-4 bg-bg-tertiary/30 rounded-xl text-center">
                                <Zap className="mx-auto mb-2 text-warning" size={24} fill="currentColor" />
                                <p className="text-xl font-bold">{userData.streak}</p>
                                <p className="text-[10px] uppercase font-bold text-muted">Days Streak</p>
                            </div>
                            <div className="stat-card p-4 bg-bg-tertiary/30 rounded-xl text-center">
                                <CheckCircle className="mx-auto mb-2 text-success" size={24} />
                                <p className="text-xl font-bold">142</p>
                                <p className="text-[10px] uppercase font-bold text-muted">Quiz Won</p>
                            </div>
                        </div>
                    </section>

                    <section className="card glass-panel p-6 overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 opacity-10 text-accent-secondary">
                            <Award size={120} />
                        </div>
                        <h3 className="section-title mb-4">Current Goals</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs">
                                <input type="checkbox" checked readOnly className="accent-accent-primary" />
                                <span className="text-secondary">Complete 10 Daily Topics</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <input type="checkbox" readOnly className="accent-accent-primary" />
                                <span className="text-secondary">Finish Senior Interview Mode</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <input type="checkbox" readOnly className="accent-accent-primary" />
                                <span className="text-secondary">Achieve 30 Day Streak</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <style jsx>{`
        .profile- banner {
          border-radius: var(--radius-2xl);
        }
        
        .section-title {
           font-family: var(--font-display);
           font-weight: 700;
           font-size: 1.125rem;
           color: var(--text-primary);
        }

        .grid {
          display: grid;
        }

        @media (min-width: 1024px) {
           .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
           .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
           .lg\\:col-span-2 { grid-column: span 2 / span 2; }
        }

        .space-y-8 > * + * { margin-top: 2rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-3 > * + * { margin-top: 0.75rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
      `}</style>
        </div>
    );
}
