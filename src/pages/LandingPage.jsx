import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Droplet,
  Cpu,
  Activity,
  ArrowRight,
  Lock,
  Mail,
  User,
  CheckCircle,
  Eye,
  EyeOff,
  Leaf,
  Zap,
  Shield,
  Layers,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Simple X icon ── */
const XIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const features = [
  {
    icon: Droplet,
    title: 'Precision Hydration',
    desc: 'Volumetric delivery down to the millilitre. Zero water wasted, every irrigation cycle accounted for.',
  },
  {
    icon: Cpu,
    title: 'ESP32 Mesh Telemetry',
    desc: 'Real-time multi-node sensing. Temperature, humidity, soil moisture — all streamed wirelessly.',
  },
  {
    icon: Leaf,
    title: 'AI Plant Classifier',
    desc: 'Neural morphology engine identifies your crop species and configures the optimal FAO-56 Kc profile.',
  },
];

const LandingPage = () => {
  const { handleLogin, isAuthenticated } = useApp();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn]   = useState(true);
  const [email, setEmail]               = useState('admin@swams.io');
  const [password, setPassword]         = useState('admin123');
  const [name, setName]                 = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms]     = useState(true);

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggingIn) {
      const success = handleLogin(email, password);
      if (success) { setShowAuthModal(false); navigate('/dashboard'); }
    } else {
      alert('Registration simulated. Please login with: admin@swams.io / admin123');
      setIsLoggingIn(true);
    }
  };

  /* shared input style */
  const inputStyle = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: 8,
    padding: '12px 12px 12px 42px',
    color: '#1A1A1A',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans relative overflow-hidden"
      style={{ background: '#FAFBF9', color: '#1A1A1A' }}
    >
      {/* ── Background Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(30,94,58,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Navigation ── */}
      <header
        className="sticky top-0 w-full z-40 flex justify-between items-center px-6 md:px-12 h-16"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        {/* Logo */}
        <span
          className="font-extrabold text-2xl tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", color: '#1E5E3A' }}
        >
          SWaMS
        </span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Hardware', 'Ecosystem'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ fontFamily: "'Syne', sans-serif", color: '#6B7280' }}
              onMouseEnter={e => (e.target.style.color = '#1E5E3A')}
              onMouseLeave={e => (e.target.style.color = '#6B7280')}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setIsLoggingIn(true); setShowAuthModal(true); }}
          className="font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full cursor-pointer text-white"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: '#1E5E3A',
          }}
        >
          Launch App
        </motion.button>
      </header>

      {/* ── Hero Section ── */}
      <section
        className="relative flex-1 flex items-center py-20 px-6 md:px-16 z-10"
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-7"
          >
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
              style={{ background: 'rgba(30,94,58,0.06)', border: '1px solid rgba(30,94,58,0.15)' }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#1E5E3A' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#1E5E3A' }}></span>
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: '#1E5E3A' }}>
                Autonomous System Active
              </span>
            </div>

            {/* Headline */}
            <h1
              className="leading-[1.05] font-extrabold"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                color: '#1A1A1A',
              }}
            >
              Smart Water.{' '}
              <span style={{ color: '#1E5E3A' }}>Healthy Plants.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-lg" style={{ color: '#6B7280' }}>
              SWaMS bridges hardware telemetry and predictive irrigation. Deploy neural vision morphology classifiers alongside ESP32 mesh networks to eliminate water waste — permanently.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setIsLoggingIn(true); setShowAuthModal(true); }}
                className="flex items-center gap-2 font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg cursor-pointer transition-colors text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: '#1E5E3A',
                }}
              >
                🌿 Get Started
                <ArrowRight size={16} />
              </motion.button>

              <a
                href="#features"
                className="flex items-center font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-all cursor-pointer"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  border: '1px solid #1E5E3A',
                  color: '#1E5E3A',
                }}
              >
                📖 Learn More
              </a>
            </div>
          </motion.div>

          {/* Right: Visual mockup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div
              className="rounded-2xl p-6 overflow-hidden relative group"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
              }}
            >
              {/* Plant image */}
              <div className="relative aspect-video rounded-xl overflow-hidden" style={{ background: '#FAFBF9' }}>
                <img
                  alt="Smart Water Plant Visual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ opacity: 0.85 }}
                  src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />

                {/* AI vision overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[80%] h-[75%] relative" style={{ border: '1px solid rgba(30,94,58,0.4)' }}>
                    <div
                      className="absolute top-2 left-2 text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', color: '#1E5E3A' }}
                    >
                      [ Foliage Scan: 98.4% Match ]
                    </div>
                    <div
                      className="absolute bottom-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', color: '#6B7280' }}
                    >
                      Kc Target: 0.95
                    </div>
                    {/* corners */}
                    {[
                      'top-0 left-0 border-t-2 border-l-2',
                      'top-0 right-0 border-t-2 border-r-2',
                      'bottom-0 left-0 border-b-2 border-l-2',
                      'bottom-0 right-0 border-b-2 border-r-2',
                    ].map((cls, i) => (
                      <div
                        key={i}
                        className={`absolute w-4 h-4 ${cls}`}
                        style={{ borderColor: '#1E5E3A', margin: '-1px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-2 gap-4 mt-5">
                {[
                  { label: 'MESH TELEMETRY', value: '5.2', unit: 'L/min', sub: 'Valve Actuation Active', subColor: '#1E5E3A' },
                  { label: 'SOIL RETENTION', value: '42.0', unit: '%', sub: 'Sandy-Loam Profile', subColor: '#6B7280' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4 rounded-xl"
                    style={{ background: '#FAFBF9', border: '1px solid #E5E7EB' }}
                  >
                    <div className="text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                      {s.label}
                    </div>
                    <div className="text-xl font-mono font-bold" style={{ color: '#1A1A1A' }}>
                      {s.value} <span className="text-xs" style={{ color: s.subColor }}>{s.unit}</span>
                    </div>
                    <div className="text-[10px] mt-1 font-semibold flex items-center gap-1" style={{ color: s.subColor }}>
                      <Activity size={10} />
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 px-6 md:px-16 relative z-10" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-extrabold mb-3"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1A1A1A' }}
            >
              Built for Serious Growers
            </h2>
            <p style={{ color: '#6B7280' }}>Three pillars of precision plant intelligence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-2xl group transition-all duration-300"
                  style={{
                    background: '#FAFBF9',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.15)' }}
                  >
                    <Icon size={22} style={{ color: '#1E5E3A' }} />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hardware Section ── */}
      <section id="hardware" className="py-24 px-6 md:px-16 relative z-10" style={{ background: '#FAFBF9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-extrabold mb-3"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1A1A1A' }}
            >
              Industrial-Grade IoT Hardware
            </h2>
            <p style={{ color: '#6B7280' }}>Robust hardware components deployed at the network edge.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: 'ESP32 Mesh Transceivers',
                desc: 'Multi-node ESP32 controllers establish a resilient sub-GHz mesh topology that passes sensor values even in deep remote fields.',
              },
              {
                icon: Droplet,
                title: 'YF-S201 Flow Sensor',
                desc: 'Pulse-based Hall effect flow meters detect exact water throughput in real-time, enforcing precision volumetric irrigation bounds.',
              },
              {
                icon: Zap,
                title: '12V Solenoid Relays',
                desc: 'Low-draw solenoid controllers interface with physical relays, enabling instant autonomous micro-dosing and safety overrides.',
              }
            ].map((hw, i) => {
              const Icon = hw.icon;
              return (
                <motion.div
                  key={hw.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="p-8 rounded-2xl"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.15)' }}
                  >
                    <Icon size={22} style={{ color: '#1E5E3A' }} />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
                  >
                    {hw.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{hw.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Ecosystem Section ── */}
      <section id="ecosystem" className="py-24 px-6 md:px-16 relative z-10" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-extrabold mb-3"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1A1A1A' }}
            >
              The Agricultural Ecosystem
            </h2>
            <p style={{ color: '#6B7280' }}>Adaptive data loops integrating crop science with physical infrastructure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: 'FAO-56 Evapotranspiration',
                desc: 'Uses real-time local thermal sensors to compute active crop water demands using verified FAO-56 agricultural guidelines.',
              },
              {
                icon: Network,
                title: 'Cultivar Database Mappings',
                desc: 'Instantly correlates foliage morphology scans with a rich internal encyclopedia of cultivars to align water programs.',
              },
              {
                icon: Shield,
                title: 'Soil Porosity Calibration',
                desc: 'Classifies soil structures from sandy to clay-rich models, adjusting target soil moisture retention targets automatically.',
              }
            ].map((eco, i) => {
              const Icon = eco.icon;
              return (
                <motion.div
                  key={eco.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="p-8 rounded-2xl"
                  style={{
                    background: '#FAFBF9',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.15)' }}
                  >
                    <Icon size={22} style={{ color: '#1E5E3A' }} />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
                  >
                    {eco.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{eco.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Auth Modal ── */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0"
              style={{ background: 'rgba(30,94,58,0.2)', backdropFilter: 'blur(8px)' }}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 22, stiffness: 150 }}
              className="relative w-full max-w-lg h-full flex flex-col justify-between p-8 md:p-12 z-10"
              style={{
                background: '#FFFFFF',
                borderLeft: '1px solid #E5E7EB',
                boxShadow: '-20px 0 80px rgba(0,0,0,0.05)',
              }}
            >
              <div>
                {/* Modal header */}
                <div className="flex justify-between items-center mb-10">
                  <span
                    className="font-extrabold text-2xl"
                    style={{ fontFamily: "'Syne', sans-serif", color: '#1E5E3A' }}
                  >
                    SWaMS Gateway
                  </span>
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="p-2 rounded-lg transition-opacity hover:opacity-70 cursor-pointer"
                    style={{ background: '#FAFBF9', border: '1px solid #E5E7EB', color: '#6B7280' }}
                  >
                    <XIcon size={18} />
                  </button>
                </div>

                {/* Mode tabs */}
                <div
                  className="flex p-1.5 rounded-lg mb-8 relative"
                  style={{ background: '#FAFBF9', border: '1px solid #E5E7EB' }}
                >
                  <div
                    className="absolute inset-y-1.5 rounded-md transition-all duration-300"
                    style={{
                      left: '6px',
                      width: 'calc(50% - 6px)',
                      background: '#1E5E3A',
                      transform: isLoggingIn ? 'translateX(0)' : 'translateX(calc(100% + 0px))',
                    }}
                  />
                  {[
                    { label: 'Login', active: isLoggingIn, onClick: () => setIsLoggingIn(true) },
                    { label: 'Register', active: !isLoggingIn, onClick: () => setIsLoggingIn(false) },
                  ].map((tab) => (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={tab.onClick}
                      className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider relative z-10 cursor-pointer"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: tab.active ? '#FFFFFF' : '#6B7280',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLoggingIn && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: '#9CA3AF' }} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ajay Garg"
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = '#1E5E3A')}
                          onBlur={e => (e.target.style.borderColor = '#D1D5DB')}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: '#9CA3AF' }} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="operator@swams.io"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1E5E3A')}
                        onBlur={e => (e.target.style.borderColor = '#D1D5DB')}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                        Password
                      </label>
                      {isLoggingIn && (
                        <a href="#" className="text-xs hover:opacity-80" style={{ color: '#1E5E3A' }}>Forgot?</a>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: '#9CA3AF' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ ...inputStyle, paddingRight: 44 }}
                        onFocus={e => (e.target.style.borderColor = '#1E5E3A')}
                        onBlur={e => (e.target.style.borderColor = '#D1D5DB')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-70 cursor-pointer"
                        style={{ color: '#6B7280' }}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {isLoggingIn && (
                    <div
                      className="p-3 rounded-lg text-xs"
                      style={{ background: 'rgba(30,94,58,0.05)', border: '1px solid rgba(30,94,58,0.1)', color: '#1E5E3A' }}
                    >
                      💡 Demo: <span className="font-bold" style={{ color: '#1A1A1A' }}>admin@swams.io / admin123</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      style={{ accentColor: '#1E5E3A' }}
                    />
                    <label htmlFor="agree" className="text-xs cursor-pointer select-none" style={{ color: '#6B7280' }}>
                      I authorize SWaMS telemetry collection & audit guidelines
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={!agreeTerms}
                    className="w-full py-4 rounded-lg font-extrabold text-sm tracking-wider uppercase mt-2 cursor-pointer transition-colors disabled:opacity-50 text-white"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: '#1E5E3A',
                    }}
                  >
                    {isLoggingIn ? '🌿 Enter Dashboard' : 'Create Account'}
                  </motion.button>
                </form>
              </div>

              <div className="text-[10px] pt-6" style={{ borderTop: '1px solid #E5E7EB', color: '#6B7280' }}>
                SWaMS Command Console v4.2 · TLS 1.3 enforced · All flows logged.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
