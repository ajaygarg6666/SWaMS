import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Leaf,
  Database,
  Activity,
  CheckCircle,
  TrendingUp,
  Droplet,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CARD = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
};

const INNER = {
  background: '#FAFBF9',
  border: '1px solid #E5E7EB',
  borderRadius: 12,
};

const Onboarding = () => {
  const {
    onboardingStep,
    setOnboardingStep,
    onboardingPlantImg,
    setOnboardingPlantImg,
    onboardingSoilImg,
    setOnboardingSoilImg,
    isOnboardingAnalyzing,
    onboardingProgress,
    onboardingResult,
    setOnboardingResult,
    startOnboardingAnalysis,
    activeZones,
    setActiveZones,
    addToast,
  } = useApp();

  const navigate = useNavigate();

  const [simulationType, setSimulationType] = useState('vegetable');
  const [zoneName, setZoneName]             = useState('Greenhouse Zone 3');
  const [statusMessage, setStatusMessage]   = useState('Awaiting image upload…');

  const handlePlantClick = () => {
    if (isOnboardingAnalyzing) return;
    const imgs = {
      vegetable: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      succulent: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    };
    setOnboardingPlantImg(imgs[simulationType]);
    addToast('Plant morphology visual loaded.', 'info');
  };

  const handleSoilClick = () => {
    if (isOnboardingAnalyzing) return;
    const imgs = {
      vegetable: 'https://images.unsplash.com/photo-1464241353295-93c2496b12cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      succulent: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    };
    setOnboardingSoilImg(imgs[simulationType]);
    addToast('Topsoil porosity visual loaded.', 'info');
  };

  const handleClear = () => {
    setOnboardingPlantImg(null);
    setOnboardingSoilImg(null);
    setOnboardingResult(null);
    setOnboardingStep(1);
    addToast('Configuration reset. Visual buffers cleared.', 'info');
  };

  const handleAnalyze = () => {
    if (!onboardingPlantImg || !onboardingSoilImg) {
      addToast('Both plant and soil visuals required.', 'error');
      return;
    }
    setOnboardingStep(2);
    const interval = startOnboardingAnalysis();

    const timer = setInterval(() => {
      const logs = [
        'Initializing spectral camera feedback loop…',
        'Correlating chlorophyll foliage signatures…',
        'Scanning particle distribution for soil porosity…',
        'Calculating evapotranspiration curve and Kc coefficients…',
        'Synthesizing zone hydrological profile…',
      ];
      setStatusMessage(logs[Math.floor(Math.random() * logs.length)]);
    }, 600);

    setTimeout(() => {
      clearInterval(timer);
      clearInterval(interval);
      setOnboardingStep(3);
    }, 3200);
  };

  const handleInitializeZone = () => {
    if (!onboardingResult) return;
    const newZone = {
      id: `zone-${Date.now()}`,
      name: zoneName,
      plant: simulationType === 'vegetable' ? 'Roma Tomato' : 'Snake Plant',
      soil:  simulationType === 'vegetable' ? 'Loamy Silt'  : 'Sandy Gravel',
      kc:    parseFloat(onboardingResult.kc),
      moisture: simulationType === 'vegetable' ? 70.0 : 38.0,
    };
    setActiveZones((prev) => [...prev, newZone]);
    addToast(`Zone "${zoneName}" successfully online.`, 'success');
    handleClear();
    navigate('/dashboard');
  };

  /* Step dots */
  const steps = [
    { n: 1, label: 'Upload Visuals' },
    { n: 2, label: 'AI Analysis' },
    { n: 3, label: 'Zone Ready' },
  ];

  const inputStyle = {
    background: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: 8,
    padding: '8px 12px',
    color: '#1A1A1A',
    fontSize: '0.75rem',
    fontWeight: 600,
    outline: 'none',
  };

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6"
        style={{ borderBottom: '1px solid #E5E7EB' }}
      >
        <div>
          <h1
            className="font-extrabold text-3xl"
            style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
          >
            Configure Garden Zone
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Upload crop &amp; soil images to synthesize optimal watering programs.
          </p>
        </div>

        {/* Simulate mode toggle */}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-xl"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
            Simulate:
          </span>
          <div className="flex p-1 rounded-lg" style={{ background: '#FAFBF9' }}>
            {[
              { label: 'Fruiting Veg', val: 'vegetable' },
              { label: 'Succulent',    val: 'succulent' },
            ].map(({ label, val }) => (
              <button
                key={val}
                onClick={() => { handleClear(); setSimulationType(val); }}
                disabled={isOnboardingAnalyzing}
                className="px-3 py-1 rounded text-xs font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: simulationType === val ? '#1E5E3A' : 'transparent',
                  color: simulationType === val ? '#FFFFFF' : '#6B7280',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <div className="flex items-center gap-3 mb-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all"
                style={{
                  background: onboardingStep >= s.n ? '#1E5E3A' : '#FFFFFF',
                  color:      onboardingStep >= s.n ? '#FFFFFF' : '#6B7280',
                  border:     onboardingStep >= s.n ? 'none' : '1px solid #E5E7EB',
                  boxShadow:  onboardingStep === s.n ? '0 0 10px rgba(30,94,58,0.2)' : 'none',
                }}
              >
                {onboardingStep > s.n ? <CheckCircle size={14} /> : s.n}
              </div>
              <span
                className="text-xs font-semibold hidden sm:block"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: onboardingStep >= s.n ? '#1E5E3A' : '#6B7280',
                }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px"
                style={{ background: onboardingStep > s.n ? '#1E5E3A' : '#E5E7EB' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-7 items-start">

        {/* ── Left: Upload / Analysis / Result panels ── */}
        <div className="lg:col-span-7 space-y-5">
          <div
            className="p-6 flex flex-col relative overflow-hidden"
            style={{ ...CARD, minHeight: 420 }}
          >

            {/* Step 1: Upload */}
            {onboardingStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                      style={{ background: 'rgba(30,94,58,0.08)', color: '#1E5E3A', border: '1px solid rgba(30,94,58,0.2)' }}
                    >
                      1
                    </span>
                    <h3
                      className="text-base font-semibold uppercase tracking-wider"
                      style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
                    >
                      Foliage &amp; Soil Visual Captures
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Plant Upload */}
                    <div
                      onClick={handlePlantClick}
                      className="h-60 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer group transition-all relative overflow-hidden"
                      style={{
                        borderColor: onboardingPlantImg ? '#1E5E3A' : '#E5E7EB',
                        background:  onboardingPlantImg ? 'rgba(30,94,58,0.02)' : '#FAFBF9',
                      }}
                      onMouseEnter={(e) => { if (!onboardingPlantImg) e.currentTarget.style.borderColor = '#1E5E3A'; }}
                      onMouseLeave={(e) => { if (!onboardingPlantImg) e.currentTarget.style.borderColor = '#E5E7EB'; }}
                    >
                      {onboardingPlantImg ? (
                        <>
                          <img
                            src={onboardingPlantImg}
                            alt="Plant Preview"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ opacity: 0.85 }}
                          />
                          <div
                            className="absolute inset-0 flex flex-col justify-end p-3"
                            style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 60%)' }}
                          >
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded w-fit"
                              style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.25)', color: '#1E5E3A', fontFamily: "'Syne', sans-serif" }}
                            >
                              ✓ Plant Visual Loaded
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-3">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"
                            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                          >
                            <Leaf size={20} style={{ color: '#6B7280' }} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1A1A1A', fontFamily: "'Syne', sans-serif" }}>
                              Upload Plant Image
                            </h4>
                            <p className="text-[10px] mt-1 max-w-[160px] mx-auto" style={{ color: '#6B7280' }}>
                              Click to select morphology file
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Soil Upload */}
                    <div
                      onClick={handleSoilClick}
                      className="h-60 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer group transition-all relative overflow-hidden"
                      style={{
                        borderColor: onboardingSoilImg ? '#1E5E3A' : '#E5E7EB',
                        background:  onboardingSoilImg ? 'rgba(30,94,58,0.02)' : '#FAFBF9',
                      }}
                      onMouseEnter={(e) => { if (!onboardingSoilImg) e.currentTarget.style.borderColor = '#1E5E3A'; }}
                      onMouseLeave={(e) => { if (!onboardingSoilImg) e.currentTarget.style.borderColor = '#E5E7EB'; }}
                    >
                      {onboardingSoilImg ? (
                        <>
                          <img
                            src={onboardingSoilImg}
                            alt="Soil Preview"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ opacity: 0.85 }}
                          />
                          <div
                            className="absolute inset-0 flex flex-col justify-end p-3"
                            style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 60%)' }}
                          >
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded w-fit"
                              style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.25)', color: '#1E5E3A', fontFamily: "'Syne', sans-serif" }}
                            >
                              ✓ Soil Visual Loaded
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-3">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"
                            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                          >
                            <Database size={20} style={{ color: '#6B7280' }} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1A1A1A', fontFamily: "'Syne', sans-serif" }}>
                              Upload Soil Image
                            </h4>
                            <p className="text-[10px] mt-1 max-w-[160px] mx-auto" style={{ color: '#6B7280' }}>
                              Click to select topsoil porosity scan
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer actions */}
                <div
                  className="pt-5 mt-4 flex items-center justify-between gap-4"
                  style={{ borderTop: '1px solid #E5E7EB' }}
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-widest block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                      Zone Name
                    </label>
                    <input
                      type="text"
                      value={zoneName}
                      onChange={(e) => setZoneName(e.target.value)}
                      placeholder="e.g. Greenhouse Zone 3"
                      style={{ ...inputStyle, width: 192 }}
                      onFocus={(e) => (e.target.style.borderColor = '#1E5E3A')}
                      onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
                    />
                  </div>

                  <div className="flex gap-3">
                    {(onboardingPlantImg || onboardingSoilImg) && (
                      <button
                        onClick={handleClear}
                        className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          color: '#6B7280',
                          fontFamily: "'Syne', sans-serif",
                        }}
                      >
                        Reset
                      </button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAnalyze}
                      disabled={!onboardingPlantImg || !onboardingSoilImg}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-xs tracking-wider uppercase cursor-pointer disabled:opacity-50 transition-all text-white"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        background: '#1E5E3A',
                      }}
                    >
                      Analyze Zone Layout
                      <Activity size={13} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: AI Analysis */}
            {onboardingStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-6"
              >
                <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                  <div
                    className="absolute inset-0 border-4 rounded-full animate-ping"
                    style={{ borderColor: 'rgba(30,94,58,0.2)' }}
                  />
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(30,94,58,0.06)', border: '1px solid rgba(30,94,58,0.2)' }}
                  >
                    <Activity style={{ color: '#1E5E3A' }} size={42} className="animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4 max-w-xs">
                  <h3 className="font-mono font-bold text-sm uppercase tracking-widest" style={{ color: '#1E5E3A' }}>
                    AI Analyzing Morphology
                  </h3>
                  <div className="h-1.5 rounded-full overflow-hidden mx-auto" style={{ width: 240, background: '#E5E7EB' }}>
                    <motion.div
                      className="h-full"
                      style={{ background: '#1E5E3A' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${onboardingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className="font-mono text-xs font-bold" style={{ color: '#1E5E3A' }}>
                    {onboardingProgress}% MATCHED
                  </p>
                  <p className="text-[11px] font-semibold" style={{ color: '#6B7280' }}>
                    {statusMessage}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Result */}
            {onboardingStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div
                    className="flex justify-between items-center pb-4"
                    style={{ borderBottom: '1px solid #E5E7EB' }}
                  >
                    <div className="flex gap-2 items-center">
                      <CheckCircle size={17} style={{ color: '#1E5E3A' }} />
                      <h3 className="text-sm font-bold uppercase tracking-widest font-mono" style={{ color: '#1E5E3A' }}>
                        Inference Mappings Computed
                      </h3>
                    </div>
                    <span
                      className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.25)', color: '#1E5E3A' }}
                    >
                      98.4% ACCURACY
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Foliage Category',    value: onboardingResult?.plantType,  valueColor: '#1A1A1A' },
                      { label: 'FAO-56 Kc Factor',    value: onboardingResult?.kc,          valueColor: '#1E5E3A' },
                    ].map((item) => (
                      <div key={item.label} className="p-4 rounded-xl" style={INNER}>
                        <div className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                          {item.label}
                        </div>
                        <div className="text-sm font-bold" style={{ color: item.valueColor }}>{item.value}</div>
                      </div>
                    ))}
                    <div className="p-4 rounded-xl col-span-2" style={INNER}>
                      <div className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                        Subsoil Porosity Profile
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#1A1A1A' }}>{onboardingResult?.soilProfile}</div>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl text-xs leading-relaxed"
                    style={{ background: 'rgba(30,94,58,0.04)', border: '1px solid rgba(30,94,58,0.12)', color: '#1E5E3A' }}
                  >
                    <div className="font-bold uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>
                      <Droplet size={11} /> Calculated Watering Necessity
                    </div>
                    <span style={{ color: '#6B7280' }}>{onboardingResult?.wateringNecessity}</span>
                  </div>
                </div>

                <div
                  className="pt-5 mt-4 flex justify-between items-center"
                  style={{ borderTop: '1px solid #E5E7EB' }}
                >
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      color: '#6B7280',
                    }}
                  >
                    Discard Scan
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleInitializeZone}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-xs tracking-wider uppercase cursor-pointer text-white"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: '#1E5E3A',
                    }}
                  >
                    Initialize Zone Node
                    <Save size={13} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Right: Guidelines + Preview ── */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 space-y-4 rounded-2xl" style={CARD}>
            <h3
              className="font-bold text-sm uppercase tracking-wider"
              style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
            >
              Calibration Guidelines
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
              Precision calculations rely on high-fidelity visual inputs. Follow these guidelines to prevent sensor calibration skew:
            </p>

            <ul className="space-y-4 pt-1">
              {[
                {
                  icon: TrendingUp,
                  title: 'Foliage lighting check',
                  desc: 'Natural ambient lighting gives optimal chlorophyll reflection. Avoid high specular reflections from artificial bulbs.',
                },
                {
                  icon: Database,
                  title: 'Topsoil scale inclusion',
                  desc: 'Capture soil from 15–20cm. Including a small coin establishes focal ratio for grain scale sizing.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-3 items-start">
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{ background: 'rgba(30,94,58,0.06)', border: '1px solid rgba(30,94,58,0.15)' }}
                  >
                    <Icon size={15} style={{ color: '#1E5E3A' }} />
                  </div>
                  <div>
                    <h4
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: '#1A1A1A', fontFamily: "'Syne', sans-serif" }}
                    >
                      {title}
                    </h4>
                    <p className="text-[11px] mt-1 leading-relaxed" style={{ color: '#6B7280' }}>
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Spectral Preview */}
          <div
            className="rounded-2xl overflow-hidden relative group aspect-video"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <img
              alt="Visual feedback preview"
              className="w-full h-full object-cover transition-all duration-700"
              style={{ opacity: onboardingStep === 3 ? 0.85 : 0.4, filter: onboardingStep === 3 ? 'none' : 'grayscale(1)' }}
              src={
                onboardingStep === 3
                  ? (simulationType === 'vegetable'
                    ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                    : 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')
                  : 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              }
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 60%)' }}
            />
            <div className="absolute bottom-4 left-4">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', color: '#1E5E3A' }}
              >
                Spectral Preview Loop
              </span>
              <p className="text-xs mt-1 font-bold" style={{ color: '#1A1A1A' }}>
                {onboardingStep === 3 ? 'Feedback loop active. Calibration locked.' : 'Awaiting camera signal inputs…'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
