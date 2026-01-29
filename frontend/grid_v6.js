const IMAGES = {
    hero: "https:
    tower: "https:
    weather: "https:
    demand: "https:
    ai: "https:
    logo: "vector.svg"
};
const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-slate-900 font-sans text-white overflow-x-hidden">
            {}
            <nav className="flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <h1 className="font-protest-guerrilla-regular text-3xl tracking-wider">GRIDX</h1>
                </div>
                <div className="flex gap-8 font-prociono-regular text-sm text-gray-300">
                    <a href="#features" className="hover:text-purple-400 transition-colors">Grid Sensor</a>
                    <a href="#about" className="hover:text-purple-400 transition-colors">About Us</a>
                </div>
            </nav>
            {}
            <header className="relative w-full max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 z-10">
                    <h2 className="font-prociono-regular text-purple-400 text-sm tracking-widest mb-4">
                        AUTONOMOUS ENERGY INTELLIGENCE
                    </h2>
                    <h1 className="font-protest-guerrilla-regular text-6xl md:text-7xl leading-tight mb-6">
                        PREDICT.<br />PREVENT.<br />POWER.
                    </h1>
                    <p className="font-roboto-flex-regular text-gray-400 text-lg mb-8 max-w-md">
                        AI-Powered System to predict electricity demand, optimize load distribution, and prevent power outages before they happen.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-prociono-regular py-4 px-8 rounded-lg text-xl transition-all shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 flex items-center gap-2"
                    >
                        Get Started <span className="text-2xl">→</span>
                    </button>
                </div>
                <div className="md:w-1/2 mt-12 md:mt-0 relative">
                    <div className="absolute inset-0 bg-purple-600 blur-[100px] opacity-20 rounded-full"></div>
                    <img
                        src={IMAGES.tower}
                        alt="High Voltage Tower"
                        className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10"
                    />
                </div>
            </header>
            {}
            <section id="features" className="w-full bg-slate-950 py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors group">
                            <img src={IMAGES.weather} alt="Weather" className="w-16 h-16 mb-6 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                            <h3 className="font-protest-guerrilla-regular text-xl mb-3">Weather Insights</h3>
                            <p className="font-roboto-flex-regular text-gray-400 text-sm">
                                Real-time weather data integration to correlate climatic conditions with grid stress.
                            </p>
                        </div>
                        {}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors group">
                            <img src={IMAGES.demand} alt="Demand" className="w-16 h-16 mb-6 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                            <h3 className="font-protest-guerrilla-regular text-xl mb-3">Demand Prediction</h3>
                            <p className="font-roboto-flex-regular text-gray-400 text-sm">
                                Advanced ML models forecast daily and hourly load requirements with high accuracy.
                            </p>
                        </div>
                        {}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors group">
                            <img src={IMAGES.ai} alt="AI" className="w-16 h-16 mb-6 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                            <h3 className="font-protest-guerrilla-regular text-xl mb-3">AI Support</h3>
                            <p className="font-roboto-flex-regular text-gray-400 text-sm">
                                Autonomous agents suggest actionable decisions to balance load and reduce risk.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("user");
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const endpoint = isLogin ? "/api/login" : "/api/register";
        const payload = isLogin ? { email, password } : { email, password, role };
        try {
            const res = await fetch(`http:
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                onAuthSuccess(data);
            } else {
                setError(data.error || "Authentication failed");
            }
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/30 z-10"></div> {}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 z-10"></div>
                <img
                    src={IMAGES.hero}
                    alt="Smart Grid Background"
                    className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
                />
            </div>
            {}
            <div className="relative z-20 w-full max-w-md p-1">
                {}
                <div className="bg-black/20 backdrop-blur-md border border-purple-500/30 p-8 rounded-3xl shadow-[0_0_60px_rgba(147,51,234,0.3)] relative overflow-hidden hover:shadow-[0_0_80px_rgba(147,51,234,0.5)] transition-shadow duration-500">
                    {}
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <svg className="w-12 h-12 text-purple-500/20" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h2 className="text-4xl font-protest-guerrilla-regular text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 text-center mb-2">
                        {isLogin ? "ACCESS GRID" : "INITIATE"}
                    </h2>
                    <p className="text-gray-400 text-center text-xs font-prociono-regular tracking-[0.2em] mb-8 uppercase">
                        {isLogin ? "Secure Verification Required" : "Join the Grid Network"}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <label className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 block group-focus-within:text-purple-300 transition-colors">Identity / Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono"
                                    placeholder="agent@grid.os"
                                />
                                <div className="absolute right-3 top-3.5 text-green-500/50 text-[10px]">● SECURE</div>
                            </div>
                        </div>
                        <div>
                            <label className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 block">Passkey</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono"
                                placeholder="••••••••"
                            />
                        </div>
                        {!isLogin && (
                            <div>
                                <label className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 block">Clearance Level</label>
                                <div className="relative">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all appearance-none font-mono"
                                    >
                                        <option value="user">Standard Operator</option>
                                        <option value="admin">System Administrator</option>
                                    </select>
                                    <div className="absolute right-4 top-4 pointer-events-none text-purple-500">▼</div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-center text-xs py-2 rounded animate-shake">
                                ⚠ {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-purple-900/30 border border-white/10 uppercase tracking-widest text-sm relative overflow-hidden group"
                        >
                            <span className="relative z-10">{loading ? "Processing..." : (isLogin ? "Authenticate" : "Register Node")}</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 decoration-clone"></div>
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gray-500 hover:text-white text-xs font-roboto-flex-regular transition-colors uppercase tracking-widest hover:underline decoration-purple-500"
                        >
                            {isLogin ? "Create New Identity" : "Return to Login Protocol"}
                        </button>
                    </div>
                    {}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-[10px] text-gray-700 font-mono">GRIDX SECURITY PROTOCOL v2.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
const UserDashboard = ({ user, onLogout }) => {
    const [data, setData] = React.useState(null);
    const [city, setCity] = React.useState("London");
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http:
                const json = await res.json();
                if (!json.error) setData(json);
            } catch (e) { console.error(e); }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [city]);
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden flex flex-col relative selection:bg-purple-500/30">
            {}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https:
            </div>
            {}
            <header className="relative z-50 bg-[#0f172a]/60 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-lg transform transition-all hover:bg-[#0f172a]/80">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-protest-guerrilla-regular tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition-all cursor-default">GRIDX <span className="text-[10px] text-white/50 font-sans tracking-normal border border-white/10 px-1 rounded ml-1">V2.4</span></h1>
                        <span className="text-[10px] text-gray-500 font-mono tracking-[0.3em] uppercase">Autonomous Operator Terminal</span>
                    </div>
                </div>
                {}
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-[#1e293b]/50 border border-white/10 rounded-full pl-4 pr-10 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:bg-[#1e293b] focus:w-64 w-48 transition-all font-mono shadow-inner"
                            placeholder="LOCATE NODE..."
                        />
                        <span className="absolute right-3 top-1.5 text-gray-500 group-focus-within:text-cyan-500 transition-colors">⌕</span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user.email}</div>
                            <div className="text-[9px] text-emerald-500 flex justify-end items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> ONLINE
                            </div>
                        </div>
                        <button onClick={onLogout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-red-500/20 transition-all group">
                            <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </button>
                    </div>
                </div>
            </header>
            {!data ? (
                <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <div className="mt-4 text-cyan-500 font-mono text-xs animate-pulse tracking-widest">ESTABLISHING SECURE UPLINK...</div>
                </div>
            ) : (
                <main className="flex-1 p-6 grid grid-cols-12 gap-6 relative z-10 max-w-[1600px] mx-auto w-full">
                    {}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        {}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {}
                            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl relative group overflow-hidden hover:border-cyan-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Current Load</h3>
                                <div className="text-3xl font-mono font-bold text-white mb-2">{data.grid.current_load} <span className="text-sm text-gray-500 font-normal">MW</span></div>
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-2">
                                    <div className="bg-cyan-500 h-full transition-all duration-1000 shadow-[0_0_10px_#22d3ee]" style={{ width: `${(data.grid.current_load / 2000) * 100}%` }}></div>
                                </div>
                                <div className="text-[10px] text-cyan-400">Target: Satisfactory</div>
                            </div>
                            {}
                            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl relative group overflow-hidden hover:border-purple-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>
                                </div>
                                <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">AI Forecast (+1h)</h3>
                                <div className="text-3xl font-mono font-bold text-white mb-2">{data.agent.prediction} <span className="text-sm text-gray-500 font-normal">MW</span></div>
                                <div className="text-[10px] flex items-center gap-1">
                                    <span className={data.agent.prediction > data.grid.current_load ? "text-orange-400" : "text-green-400"}>
                                        {data.agent.prediction > data.grid.current_load ? "▲ Rising Trend" : "▼ Stable Trend"}
                                    </span>
                                </div>
                            </div>
                            {}
                            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl relative group overflow-hidden hover:border-green-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                                </div>
                                <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Carbon Footprint</h3>
                                <div className="text-3xl font-mono font-bold text-green-400 mb-2">{data.agent.emissions} <span className="text-sm text-gray-500 font-normal text-white">T/h</span></div>
                                <div className="text-[10px] text-gray-400">Eco-Efficiency: <span className="text-white">94%</span></div>
                            </div>
                        </div>
                        {}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[300px]">
                            {}
                            <div className="md:col-span-2 bg-[#0f172a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative flex flex-col">
                                <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4 flex justify-between">
                                    <span>Load vs. Capacity History</span>
                                    <span className="text-cyan-500">LIVE</span>
                                </h3>
                                <div className="flex-1 w-full relative bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden">
                                    {}
                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                            </linearGradient>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                        {}
                                        <path
                                            d={`M0,100 C100,50 300,150 500,${100 - (data.grid.current_load / 25)} S800,50 1200,80 L1200,300 L0,300 Z`}
                                            fill="url(#areaGradient)"
                                        />
                                        <path
                                            d={`M0,100 C100,50 300,150 500,${100 - (data.grid.current_load / 25)} S800,50 1200,80`}
                                            fill="none"
                                            stroke="#06b6d4"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                        />
                                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
                                    </svg>
                                </div>
                            </div>
                            {}
                            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                                <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest absolute top-6 left-6">System Integrity</h3>
                                <div className="relative w-48 h-48 mt-4">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="45"
                                            fill="none"
                                            stroke={data.agent.risk_score > 50 ? "#ef4444" : "#10b981"}
                                            strokeWidth="6"
                                            strokeDasharray={`${(data.agent.risk_score / 100) * 283} 283`}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_currentColor]"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-5xl font-mono font-bold ${data.agent.risk_score > 50 ? 'text-red-500' : 'text-emerald-400'}`}>{data.agent.risk_score}</span>
                                        <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Risk Index</span>
                                    </div>
                                </div>
                                <div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold border ${data.agent.risk_score > 50
                                    ? 'border-red-500/30 bg-red-500/10 text-red-400'
                                    : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                    }`}>
                                    STATUS: {data.agent.status.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="col-span-12 lg:col-span-4 h-full min-h-[600px] flex flex-col">
                        <div className="flex-1 bg-gradient-to-br from-purple-900/10 to-[#0f172a]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl flex flex-col overflow-hidden relative shadow-2xl">
                            {}
                            <div className="p-5 border-b border-white/5 bg-purple-900/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_#a855f7]"></div>
                                    <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Sentinel Copilot</span>
                                </div>
                                <div className="text-[10px] text-purple-500/50 font-mono">ID: AI-9X</div>
                            </div>
                            {}
                            <div className="flex-1 p-4 overflow-y-auto space-y-4 relative">
                                {}
                                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100%_20px]"></div>
                                {}
                                <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 mb-4">
                                    <div className="text-xs text-purple-300 font-bold mb-2">Automated Analysis:</div>
                                    <p className="text-xs text-gray-300 leading-relaxed font-mono opacity-80 border-l-2 border-purple-500/50 pl-3">
                                        {data.agent.explanation}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {data.agent.actions.map((act, i) => (
                                            <span key={i} className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded border border-purple-500/20">{act}</span>
                                        ))}
                                    </div>
                                </div>
                                <ChatWidget />
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};
const AdminDashboard = ({ user, onLogout }) => {
    const [regions, setRegions] = React.useState([]);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    React.useEffect(() => {
        const fetchRegions = async () => {
            try {
                const res = await fetch('http:
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cities: ['London', 'New York', 'Tokyo', 'Berlin', 'Dubai', 'Singapore'] })
                });
                const json = await res.json();
                if (json.regions) setRegions(json.regions);
            } catch (e) { console.error(e); }
        };
        fetchRegions();
        const interval = setInterval(fetchRegions, 30000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden flex flex-col relative">
            {}
            <header className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex justify-between items-center z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                    <h1 className="text-xl font-protest-guerrilla-regular tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">GLOBAL <span className="text-white">COMMAND</span></h1>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-mono hidden md:flex items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-500">NET:</span>
                            <span className="text-white">SECURE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-purple-500">AI NODES:</span>
                            <span className="text-white">{regions.length} ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">STATUS:</span>
                            <span className="text-white">NOMINAL</span>
                        </div>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10"></div>
                    <button onClick={onLogout} className="text-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-4 py-2 rounded transition-all uppercase tracking-wider font-bold">Abort Session</button>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white">☰</button>
                </div>
            </header>
            <div className="flex-1 flex overflow-hidden relative">
                {}
                <div className="absolute inset-0 z-0 bg-[#020617]">
                    <img
                        src="https:
                        className="w-full h-full object-cover filter brightness-100 contrast-125 saturate-150 opacity-40 mix-blend-lighten"
                        alt="Global Map"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
                    {}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full opacity-50">
                            {}
                            {regions.length > 1 && (
                                <path d="M 300 200 L 800 300 L 1200 250 L 1000 500" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                            )}
                        </svg>
                    </div>
                    {}
                    {regions.map((region, i) => {
                        const coords = {
                            'London': { top: '22%', left: '49%' },
                            'New York': { top: '29%', left: '29%' },
                            'Tokyo': { top: '32%', left: '88%' },
                            'Berlin': { top: '21%', left: '53%' },
                            'Dubai': { top: '38%', left: '65%' },
                            'Singapore': { top: '53%', left: '78%' }
                        }[region.city] || { top: `${30 + (i * 10)}%`, left: `${20 + (i * 10)}%` };
                        const isCritical = region.agent.risk_score > 60;
                        return (
                            <div key={i} className="absolute group z-20 hover:z-50" style={{ ...coords }}>
                                <div className="relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isCritical ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isCritical ? 'bg-red-500 box-shadow-[0_0_20px_#ef4444]' : 'bg-green-500'}`}></span>
                                </div>
                                {}
                                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-[#0f172a]/90 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 pointer-events-none w-48">
                                    <div className="text-xs font-bold text-white mb-1 flex justify-between">
                                        <span>{region.city}</span>
                                        <span className={isCritical ? 'text-red-400' : 'text-green-400'}>{region.agent.status}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-400 font-mono">
                                        <div>LOAD: <span className="text-white">{region.load}MW</span></div>
                                        <div>RISK: <span className="text-white">{region.agent.risk_score}</span></div>
                                        <div>TEMP: <span className="text-white">{region.weather.temp_c}°</span></div>
                                        <div>GEN: <span className="text-white">SOLAR</span></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {}
                <div className="w-72 bg-[#0f172a]/80 backdrop-blur-md border-r border-white/5 flex flex-col z-10 h-full relative transform transition-transform duration-300 -translate-x-full md:translate-x-0 absolute md:relative">
                    <div className="p-4 text-[10px] font-bold text-cyan-500 uppercase tracking-widest border-b border-white/5 bg-cyan-900/10">Active Zones</div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 scrolbar-thin scrollbar-thumb-white/10">
                        {regions.map((region, i) => (
                            <div key={i} className="p-3 bg-[#1e293b]/50 border border-white/5 hover:border-cyan-500/30 hover:bg-[#1e293b] rounded transition-all cursor-pointer group">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-xs text-gray-200 group-hover:text-white">{region.city}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${region.agent.risk_score > 50 ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-green-500/30 text-green-400 bg-green-500/10'}`}>
                                        {region.agent.risk_score}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800 h-0.5 rounded-full overflow-hidden mt-2">
                                    <div className={`h-full ${region.agent.risk_score > 50 ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: `${Math.min(region.load / 30, 100)}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {}
                <div className={`w-96 bg-[#0f172a]/90 backdrop-blur-xl border-l border-white/10 flex flex-col z-20 h-full absolute right-0 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 shadow-2xl`}>
                    <div className="p-4 bg-purple-900/10 border-b border-white/5 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Sentinel Uplink</span>
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_#a855f7]"></span>
                        </div>
                        <div className="text-[9px] text-gray-500 font-mono">ENCRYPTED CHANNEL • LATENCY 12ms</div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 relative">
                        {}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100%_20px]"></div>
                        <div className="flex gap-3 mb-6 animate-in slide-in-from-right-4 duration-500">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">🤖</div>
                            <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed shadow-lg">
                                Global Command Online. I am aggregating telemetry from all {regions.length} active nodes.
                                <br /><br />
                                <span className="text-purple-400 font-bold">Alert:</span> System nominal. Ready for queries.
                            </div>
                        </div>
                        {}
                        <ChatWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};    
const ChatWidget = () => {
    const [history, setHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const handleSend = async (e) => {
        e.preventDefault();
        const input = e.target.elements.query;
        const query = input.value;
        if (!query) return;
        setHistory(prev => [...prev, { sender: 'user', text: query }]);
        setLoading(true);
        input.value = '';
        try {
            const res = await fetch('http:
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const json = await res.json();
            setHistory(prev => [...prev, { sender: 'agent', text: json.response }]);
        } catch (err) {
            setHistory(prev => [...prev, { sender: 'agent', text: "Uplink Error: connection failed." }]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {history.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${msg.sender === 'user' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-purple-500/20 border-purple-500/50'}`}>
                        {msg.sender === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className={`border rounded-lg p-3 text-xs leading-relaxed max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-500/10 border-blue-500/20 text-blue-100' : 'bg-purple-500/10 border-purple-500/20 text-gray-200'}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {loading && <div className="text-xs text-purple-500 animate-pulse ml-12">Processing query...</div>}
            <div className="mt-4 pt-4 border-t border-white/5 sticky bottom-0 bg-transparent">
                <form onSubmit={handleSend} className="relative">
                    <input
                        name="query"
                        className="w-full bg-black/50 border border-purple-500/30 rounded-lg pl-3 pr-10 py-3 text-xs text-white focus:outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all font-mono placeholder-purple-500/30"
                        placeholder="Command Query..."
                        autoComplete="off"
                    />
                    <button type="submit" className="absolute right-2 top-2 text-purple-400 hover:text-white p-1 transition-colors">➤</button>
                </form>
            </div>
        </>
    );
};
const App = () => {
    const [view, setView] = React.useState('landing');
    const [user, setUser] = React.useState(null);
    const handleAuthSuccess = (userData) => {
        setUser(userData);
        setView('dashboard');
    };
    const handleLogout = () => {
        setUser(null);
        setView('landing');
    };
    if (view === 'landing') {
        return <LandingPage onGetStarted={() => setView('auth')} />;
    }
    if (view === 'auth') {
        return <Auth onAuthSuccess={handleAuthSuccess} />;
    }
    if (view === 'dashboard' && user) {
        if (user.role === 'admin') {
            return <AdminDashboard user={user} onLogout={handleLogout} />;
        }
        return <UserDashboard user={user} onLogout={handleLogout} />;
    }
    return <div>Loading...</div>;
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);