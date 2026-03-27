import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Lightbulb, ChevronRight, CheckCircle2, Info, ChevronDown, CheckCircle, Brain } from 'lucide-react';

export default function DailyLearning() {
    const [activeTab, setActiveTab] = useState('explanation');
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const topicData = {
        title: "Understanding HTTP vs HTTPS",
        simpleExplanation: {
            whatIsIt: "HTTP is a protocol used to transfer data between a browser and a server.",
            whyIsItUsed: "It is used to load websites and send requests across the internet.",
            keyIdea: "HTTPS is a secure version of HTTP that protects data using encryption."
        },
        deepExplanation: {
            definition: "HTTP (HyperText Transfer Protocol) is an application-layer protocol used for communication between web clients and servers. HTTPS (HyperText Transfer Protocol Secure) is an extension of HTTP that incorporates SSL/TLS to securely encrypt the communication.",
            howItWorks: "In standard HTTP, data is transmitted as plain text, meaning anyone intercepting the traffic can read it. In HTTPS, a TLS (Transport Layer Security) handshake occurs before data transfer, establishing a symmetrically encrypted session that scrambles all data before transmission.",
            keyConcepts: [
                "SSL/TLS Handshake",
                "Symmetric and Asymmetric Encryption",
                "Data Integrity (preventing tampering)",
                "Authentication (via digital certificates)"
            ],
            purpose: "HTTPS is critical to protect sensitive user data from man-in-the-middle (MITM) attacks, ensuring secure communication, data integrity, and establishing trust between the user and the website.",
            specialNote: "HTTPS is required for modern web applications, especially for login systems, e-commerce checkouts, and APIs that transmit personal data."
        },
        codeExample: `// Simple Example showing an HTTPS server in Node.js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-crt.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello Secure World\\n');
}).listen(443, () => {
  console.log('Server securely running on port 443');
});`,
        interviewQuestions: [
            { q: "What is the primary difference between HTTP and HTTPS at the transport layer?", a: "HTTP uses standard TCP on port 80. HTTPS uses TCP on port 443 with a TLS/SSL encryption layer wrapped around the standard HTTP payload." },
            { q: "Explain the TLS handshake process briefly.", a: "The client and server exchange hello messages, negotiate cryptographic algorithms, the server sends its certificate, keys are exchanged, and a secure symmetric session key is generated to encrypt the rest of the communication." }
        ],
        quiz: [
            {
                id: 1,
                question: "Which port does HTTPS typically use by default?",
                options: ["80", "8080", "443", "4000"],
                correctIndex: 2
            },
            {
                id: 2,
                question: "What encryption framework is used to secure HTTPS traffic today?",
                options: ["WEP", "TLS", "MD5", "Plaintext"],
                correctIndex: 1
            }
        ]
    };

    const handleAnswerSelect = (qId, optionIndex) => {
        setSelectedAnswers({ ...selectedAnswers, [qId]: optionIndex });
    };

    const handleSubmitQuiz = () => {
        setQuizSubmitted(true);
    };

    return (
        <motion.div
            className="learning-container content-padding animate-fade-in"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <header className="mb-8">
                <div className="flex gap-2 items-center mb-2">
                    <span className="badge badge-xp">Earn up to 50 XP</span>
                    <span className="text-muted text-xs font-bold uppercase tracking-wider">• 15 min read</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{topicData.title}</h1>
            </header>

            {/* Tabs Navigation */}
            <div className="tabs-nav mb-8 p-1 bg-bg-secondary rounded-lg inline-flex flex-wrap gap-2 w-full sm:w-auto border border-border-color">
                {['explanation', 'code', 'quiz', 'interview'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="content-area max-w-4xl">
                <AnimatePresence mode="wait">
                    {activeTab === 'explanation' && (
                        <motion.div
                            key="exp"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-12"
                        >
                            <section className="card card-static bg-success/5 border-success/20">
                                <h3 className="flex items-center gap-2 mb-6 text-success text-xl">
                                    <CheckCircle size={24} />
                                    Simple Explanation
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold mb-1 text-sm text-success uppercase tracking-wider">What is it</h4>
                                        <p className="text-lg font-medium">{topicData.simpleExplanation.whatIsIt}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1 text-sm text-success uppercase tracking-wider">Why it is used</h4>
                                        <p className="text-lg font-medium">{topicData.simpleExplanation.whyIsItUsed}</p>
                                    </div>
                                    <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                                        <h4 className="font-bold mb-1 text-sm text-success uppercase tracking-wider">Key Idea</h4>
                                        <p className="text-lg font-bold">{topicData.simpleExplanation.keyIdea}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="card card-static bg-accent-tertiary/5 border-accent-tertiary/20">
                                <h3 className="flex items-center gap-2 mb-6 text-accent-tertiary text-xl">
                                    <Brain size={24} />
                                    Deep Explanation
                                </h3>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-bold mb-2 pb-2 border-b border-border-color/50 flex items-center gap-2">
                                            <span className="bg-accent-tertiary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
                                            Definition
                                        </h4>
                                        <p className="text-lg text-secondary leading-relaxed mt-2">{topicData.deepExplanation.definition}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2 pb-2 border-b border-border-color/50 flex items-center gap-2">
                                            <span className="bg-accent-tertiary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
                                            How It Works
                                        </h4>
                                        <p className="text-lg text-secondary leading-relaxed mt-2">{topicData.deepExplanation.howItWorks}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-3 pb-2 border-b border-border-color/50 flex items-center gap-2">
                                            <span className="bg-accent-tertiary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">3</span>
                                            Key Concepts / Components
                                        </h4>
                                        <ul className="list-disc list-inside space-y-2 text-lg text-secondary pl-2">
                                            {topicData.deepExplanation.keyConcepts.map((item, idx) => (
                                                <li key={idx}><span className="text-primary font-medium">{item}</span></li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2 pb-2 border-b border-border-color/50 flex items-center gap-2">
                                            <span className="bg-accent-tertiary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">4</span>
                                            Advantages / Purpose
                                        </h4>
                                        <p className="text-lg text-secondary leading-relaxed mt-2">{topicData.deepExplanation.purpose}</p>
                                    </div>

                                    {topicData.deepExplanation.specialNote && (
                                        <div className="bg-bg-primary p-5 rounded-xl border border-warning/30 flex gap-4">
                                            <Info className="flex-shrink-0 text-warning" size={24} />
                                            <div>
                                                <h4 className="font-bold text-warning mb-1">Special Note</h4>
                                                <p className="text-secondary font-medium">{topicData.deepExplanation.specialNote}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {activeTab === 'code' && (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <section className="card">
                                <h3 className="flex items-center gap-2 mb-4 text-xl">
                                    <Code size={20} />
                                    Practical Example
                                </h3>
                                <pre className="code-block rounded-xl">
                                    <code>{topicData.codeExample}</code>
                                </pre>
                            </section>
                        </motion.div>
                    )}

                    {activeTab === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="quiz-header mb-6">
                                <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
                                <p className="text-muted font-medium">Select the correct answer to earn XP</p>
                            </div>

                            {topicData.quiz.map((q) => (
                                <div key={q.id} className="card quiz-card mb-6 border-border-color shadow-sm">
                                    <p className="mb-4 font-bold text-lg">{q.question}</p>
                                    <div className="options-grid flex flex-col gap-3">
                                        {q.options.map((opt, idx) => {
                                            const isSelected = selectedAnswers[q.id] === idx;
                                            const isCorrect = q.correctIndex === idx;
                                            let classBtn = "option-btn font-medium w-full text-left";
                                            if (quizSubmitted) {
                                                if (isCorrect) classBtn += " correct";
                                                else if (isSelected) classBtn += " wrong";
                                                else classBtn += " opacity-50";
                                            } else if (isSelected) {
                                                classBtn += " selected";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={quizSubmitted}
                                                    className={classBtn}
                                                    onClick={() => handleAnswerSelect(q.id, idx)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-accent-primary border-4' : 'border-border-color'}`}></div>
                                                        <span className="flex-1">{opt}</span>
                                                        {quizSubmitted && isCorrect && <CheckCircle2 size={20} className="text-success" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {!quizSubmitted ? (
                                <button
                                    className="btn btn-primary w-full py-4 text-lg"
                                    disabled={Object.keys(selectedAnswers).length < topicData.quiz.length}
                                    onClick={handleSubmitQuiz}
                                >
                                    Submit Answers
                                </button>
                            ) : (
                                <div className="card flex items-center justify-between p-6 border-success bg-success/5">
                                    <div className="flex items-center gap-4 text-success">
                                        <CheckCircle2 size={32} />
                                        <div>
                                            <span className="font-bold text-xl block">Perfect Score!</span>
                                            <span className="text-sm">+50 XP earned today</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Return Home</button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'interview' && (
                        <motion.div
                            key="int"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {topicData.interviewQuestions.map((iq, i) => (
                                <InterviewItem key={i} question={iq.q} answer={iq.a} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
        .tab-btn {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 700;
          transition: all 0.2s ease;
          background: transparent;
        }
        
        .tab-btn:hover:not(.active) {
          color: var(--text-primary);
        }
        
        .tab-btn.active {
          background: var(--bg-primary);
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }
        
        .option-btn {
          padding: 1rem 1.25rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        
        .option-btn:hover:not(:disabled) {
          border-color: var(--accent-primary);
          background: var(--bg-secondary);
        }
        
        .option-btn.selected {
          border-color: var(--accent-primary);
          background: rgba(244, 91, 37, 0.05); /* very light orange */
        }
        
        .option-btn.correct {
          border-color: var(--success);
          background: rgba(16, 185, 129, 0.1);
        }
        
        .option-btn.wrong {
          border-color: var(--danger);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
        </motion.div>
    );
}

function InterviewItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card shadow-sm border-border-color">
            <button
                className="flex items-start justify-between w-full text-left gap-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-lg">{question}</span>
                <ChevronDown
                    size={24}
                    className="flex-shrink-0 text-muted"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-border-color text-secondary">
                            <span className="text-xs font-bold text-accent-tertiary uppercase tracking-widest block mb-2">Ideal Answer</span>
                            <p className="text-lg leading-relaxed">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
