import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Play, CheckCircle, Award, Terminal, Star } from 'lucide-react';

export default function InterviewMode() {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isFinishing, setIsFinishing] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const startInterview = () => {
        setSessionStarted(true);
        // Initial AI message
        const initialMsg = {
            id: 1,
            sender: 'ai',
            text: "Hello! I'm your AI interviewer. Today we'll focus on Backend Engineering. To start, how would you explain the difference between Monolith and Microservices architecture?"
        };
        setMessages([initialMsg]);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate AI response delay
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                sender: 'ai',
                text: "That's a solid explanation. You mentioned scalability. Can you elaborate on how data consistency is handled in a distributed microservices environment?"
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1500);
    };

    const finishInterview = () => {
        setIsFinishing(true);
        // Simulate feedback generation
        setTimeout(() => {
            setFeedback({
                score: 8.5,
                strengths: ["Clear communication", "Architecture knowledge", "Practical examples"],
                weaknesses: ["Deep technical details in distributed systems", "Database optimization"],
                summary: "Excellent overall performance. You demonstrate a strong grasp of high-level architectural concepts."
            });
            setIsFinishing(false);
        }, 2000);
    };

    if (!sessionStarted) {
        return (
            <div className="interview-setup flex items-center justify-center min-h-[70vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card glass-panel max-w-lg w-full p-10 text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-full bg-accent-primary/20 text-accent-primary">
                            <Terminal size={48} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">AI Mock Interview</h1>
                    <p className="text-secondary mb-8">
                        Practice technical interviews with our AI model.
                        Receive real-time feedback and improve your responses.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center text-sm mb-2 border-b border-border-color pb-2">
                            <span className="text-muted">Domain:</span>
                            <span className="font-bold">Fullstack / Node.js</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-6 border-b border-border-color pb-2">
                            <span className="text-muted">Difficulty:</span>
                            <span className="font-bold text-accent-tertiary">Senior Engineer</span>
                        </div>
                        <button onClick={startInterview} className="btn btn-primary w-full py-4 text-lg">
                            Start Session <Play size={20} className="ml-2" />
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (feedback) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="feedback-view container max-w-2xl mt-10"
            >
                <div className="card glass-panel border-accent-primary overflow-hidden">
                    <div className="bg-accent-primary p-6 text-center text-white">
                        <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Evaluation Complete</p>
                        <div className="text-5xl font-black">{feedback.score}<span className="text-2xl opacity-50">/10</span></div>
                    </div>

                    <div className="p-8 space-y-8">
                        <section>
                            <h3 className="flex items-center gap-2 mb-4 text-success"><CheckCircle size={20} /> Key Strengths</h3>
                            <div className="flex flex-wrap gap-2">
                                {feedback.strengths.map((s, i) => (
                                    <span key={i} className="badge bg-success/10 text-success border-success/20 py-2 px-3 h-auto lowercase text-sm">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="flex items-center gap-2 mb-4 text-warning"><Award size={20} /> Needs Improvement</h3>
                            <div className="flex flex-wrap gap-2">
                                {feedback.weaknesses.map((w, i) => (
                                    <span key={i} className="badge bg-warning/10 text-warning border-warning/20 py-2 px-3 h-auto lowercase text-sm">
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="bg-bg-tertiary p-4 rounded-lg">
                            <p className="text-secondary italic">"{feedback.summary}"</p>
                        </section>

                        <div className="flex gap-4">
                            <button onClick={() => { setFeedback(null); setSessionStarted(false); }} className="btn btn-secondary flex-1">Try Again</button>
                            <button onClick={() => window.location.href = '/'} className="btn btn-primary flex-1">Back to Home</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="chat-container max-w-4xl mx-auto flex flex-col h-[80vh]">
            <header className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">Active Session: Senior Backend Engineer</span>
                </div>
                <button onClick={finishInterview} className="btn-secondary btn px-3 py-1 text-xs">End Interview</button>
            </header>

            <div className="messages-area flex-1 overflow-y-auto mb-4 p-4 glass-panel border-border-color space-y-6">
                {messages.map((msg, index) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-accent-secondary' : 'bg-accent-primary'
                                }`}>
                                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`message-bubble p-4 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-accent-primary text-white rounded-tr-none'
                                    : 'bg-bg-tertiary border border-border-color rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isFinishing && (
                    <div className="flex justify-center py-4">
                        <div className="flex items-center gap-2 text-muted">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-primary border-t-transparent"></div>
                            Evaluating your performance...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your response here..."
                    className="input-field flex-1"
                />
                <button onClick={handleSendMessage} className="btn btn-primary px-4 bg-accent-primary">
                    <Send size={18} />
                </button>
            </div>

            <style jsx>{`
        .chat-container {
          padding-top: 1rem;
        }
        
        .messages-area {
          scrollbar-width: thin;
        }
        
        .message-bubble {
          font-size: 0.95rem;
          line-height: 1.5;
          box-shadow: var(--shadow-sm);
        }

        .input-area {
          margin-bottom: 1rem;
        }
      `}</style>
        </div>
    );
}
