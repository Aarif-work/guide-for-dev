import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, FileCode, Beaker, Brain, Sparkles, User, Bot, HelpCircle } from 'lucide-react';

export default function AskDoubt() {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState(null);
    const [activeMode, setActiveMode] = useState('detailed');

    const handleSearch = () => {
        if (!query.trim()) return;
        setIsSearching(true);
        setResult(null);

        // Simulated AI response
        setTimeout(() => {
            setResult({
                query: query,
                simple: "CORS (Cross-Origin Resource Sharing) is like a security guard for web browsers. It stops websites from different developers from talking to each other unless they specifically say it's okay. This prevents malicious sites from stealing data from your bank's website when you have it open in another tab.",
                detailed: "CORS is a browser-implemented security mechanism that uses HTTP headers to tell browsers to give a web application running at one origin access to selected resources from a different origin. It works by having the browser send a 'preflight' request (OPTIONS) to the server to verify the cross-origin request is safe and allowed by the server's policy.",
                code: `// Express.js CORS configuration
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'https://trusted-app.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/api/data', (req, res) => {
  res.json({ message: 'Success!' });
});`
            });
            setIsSearching(false);
        }, 1500);
    };

    return (
        <div className="ask-doubt-container max-w-4xl mx-auto py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <Sparkles className="text-accent-primary" />
                    AI Engineering Assistant
                </h1>
                <p className="text-secondary max-w-xl mx-auto">
                    Ask any technical question. I'll explain it simply, deeply, and provide code examples.
                </p>
            </div>

            <div className="search-bar-wrapper glass-panel p-2 flex gap-2 mb-12">
                <div className="flex-1 relative flex items-center">
                    <Search className="absolute left-4 text-muted" size={20} />
                    <input
                        type="text"
                        className="input-field pl-12 h-14 border-none bg-transparent"
                        placeholder="e.g. How does garbage collection work in V8?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button onClick={handleSearch} disabled={isSearching} className="btn btn-primary px-8">
                    {isSearching ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div> : "Ask"}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!result && !isSearching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-4 mt-8 opacity-50"
                    >
                        {["React Hooks", "Docker Containers", "JWT Auth", "PostgreSQL Indexes"].map(tag => (
                            <button key={tag} onClick={() => { setQuery(tag); }} className="badge bg-white/5 border-white/10 p-2 cursor-pointer hover:bg-white/10">
                                {tag}
                            </button>
                        ))}
                    </motion.div>
                )}

                {isSearching && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center py-20 text-muted"
                    >
                        <div className="brain-loading-spinner text-accent-primary mb-4 p-4 rounded-full border border-border-color">
                            <Brain size={48} className="animate-pulse" />
                        </div>
                        <p>Analyzing technical documentation...</p>
                    </motion.div>
                )}

                {result && !isSearching && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="result-area space-y-6"
                    >
                        <div className="mode-toggle glass-panel p-1 flex self-start w-fit">
                            <button
                                onClick={() => setActiveMode('simple')}
                                className={`mode-btn ${activeMode === 'simple' ? 'active' : ''}`}
                            >
                                Simple
                            </button>
                            <button
                                onClick={() => setActiveMode('detailed')}
                                className={`mode-btn ${activeMode === 'detailed' ? 'active' : ''}`}
                            >
                                Deep Dive
                            </button>
                            <button
                                onClick={() => setActiveMode('code')}
                                className={`mode-btn ${activeMode === 'code' ? 'active' : ''}`}
                            >
                                Code Example
                            </button>
                        </div>

                        <section className="card glass-panel p-8 border-accent-primary/20 bg-accent-primary/5 min-h-[300px]">
                            {activeMode === 'simple' && (
                                <div className="animate-fade-in">
                                    <h3 className="flex items-center gap-2 mb-4 text-accent-tertiary">
                                        <HelpCircle size={20} /> Beginner Friendly Explanation
                                    </h3>
                                    <p className="text-xl leading-relaxed font-medium">
                                        {result.simple}
                                    </p>
                                </div>
                            )}

                            {activeMode === 'detailed' && (
                                <div className="animate-fade-in">
                                    <h3 className="flex items-center gap-2 mb-4 text-accent-primary">
                                        <Brain size={20} /> Detailed Technical Breakdown
                                    </h3>
                                    <p className="text-secondary leading-relaxed text-lg">
                                        {result.detailed}
                                    </p>
                                    <div className="mt-6 flex gap-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted border-l-2 border-accent-primary pl-2">Security</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted border-l-2 border-accent-primary pl-2">Network</span>
                                    </div>
                                </div>
                            )}

                            {activeMode === 'code' && (
                                <div className="animate-fade-in">
                                    <h3 className="flex items-center gap-2 mb-4 text-accent-secondary">
                                        <FileCode size={20} /> Implementation Code
                                    </h3>
                                    <pre className="code-block mt-4">
                                        <code>{result.code}</code>
                                    </pre>
                                </div>
                            )}
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .search-bar-wrapper {
          border-radius: var(--radius-2xl);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .search-bar-wrapper:focus-within {
          border-color: var(--accent-primary);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .mode-btn {
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        
        .mode-btn.active {
          background: var(--bg-tertiary);
          color: var(--accent-primary);
          font-weight: 600;
        }

        .brain-loading-spinner {
          background: rgba(99, 102, 241, 0.1);
        }
      `}</style>
        </div>
    );
}
