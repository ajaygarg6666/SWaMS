import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Droplet,
  Play,
  Square,
  AlertTriangle,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CARD = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
};

const INNER_CARD = {
  background: '#FAFBF9',
  border: '1px solid #E5E7EB',
  borderRadius: 12,
};

const ControlPanel = () => {
  const {
    systemMode,
    setSystemMode,
    solenoidOpen,
    setSolenoidOpen,
    waterTarget,
    setWaterTarget,
    dispensedVolume,
    isDispensing,
    setIsDispensing,
    setDispensedVolume,
    flowRate,
    addToast,
  } = useApp();

  const handleModeChange = (mode) => {
    setSystemMode(mode);
    if (mode === 'AI Predictive Auto') setSolenoidOpen(false);
    addToast(`Control mode switched to: ${mode}`, 'info');
  };

  const handleManualSolenoid = () => {
    if (systemMode === 'AI Predictive Auto') {
      addToast('Switch to Manual Override to cycle the valve.', 'warning');
      return;
    }
    setSolenoidOpen(!solenoidOpen);
  };

  const handleInitiateDispense = () => {
    if (systemMode === 'AI Predictive Auto') {
      addToast('Disable AI Predictive mode first.', 'warning');
      return;
    }
    if (isDispensing) {
      setSolenoidOpen(false);
      setIsDispensing(false);
      setDispensedVolume(0);
      addToast('Volumetric dispense aborted.', 'info');
    } else {
      setDispensedVolume(0);
      setIsDispensing(true);
      setSolenoidOpen(true);
      addToast(`Dispense cycle initialized: Target ${waterTarget}ml.`, 'success');
    }
  };

  const dispensePercentage = Math.min(100, Math.round((dispensedVolume / waterTarget) * 100));
  const isAI = systemMode === 'AI Predictive Auto';

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div
        className="flex justify-between items-center pb-6"
        style={{ borderBottom: '1px solid #E5E7EB' }}
      >
        <div>
          <h1
            className="font-extrabold text-3xl flex items-center gap-2"
            style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
          >
            Edge Actuator Control
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Manual override & volumetric delivery for Solenoid Valve Node A1
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

        {/* ── Left: Actuator Controls ── */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 space-y-5" style={CARD}>

            {/* Mode Switch */}
            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5"
              style={INNER_CARD}
            >
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}>
                  System Coordination Mode
                </h3>
                <p className="text-xs mt-1 max-w-xs" style={{ color: '#6B7280' }}>
                  AI mode coordinates with atmospheric sensors. Manual mode unlocks direct relays.
                </p>
              </div>

              <div
                className="flex p-1 rounded-lg w-full sm:w-auto shrink-0 relative"
                style={{ background: '#E5E7EB', border: '1px solid #D1D5DB' }}
              >
                <div
                  className="absolute inset-y-1 rounded-md transition-all duration-300"
                  style={{
                    left: '4px',
                    width: 'calc(50% - 4px)',
                    background: '#1E5E3A',
                    transform: isAI ? 'translateX(100%)' : 'translateX(0)',
                  }}
                />
                {[
                  { label: 'Manual Override',    mode: 'Manual Override' },
                  { label: 'AI Predictive',      mode: 'AI Predictive Auto' },
                ].map(({ label, mode }) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded text-xs font-bold uppercase tracking-wider relative z-10 whitespace-nowrap cursor-pointer"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: systemMode === mode ? '#FFFFFF' : '#6B7280',
                      transition: 'color 0.2s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Solenoid Toggle */}
            <div
              className="flex justify-between items-center p-5"
              style={INNER_CARD}
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}>
                  12V Solenoid Master Actuator
                </h3>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ color: solenoidOpen ? '#1E5E3A' : '#EF4444' }}
                >
                  Valve: {solenoidOpen ? 'OPEN — FLOWING' : 'CLOSED — SHUT'}
                </span>
              </div>

              {/* Toggle switch */}
              <button
                onClick={handleManualSolenoid}
                className="w-20 h-10 rounded-full p-1.5 flex items-center relative overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: solenoidOpen ? 'rgba(30,94,58,0.15)' : 'rgba(239,68,68,0.08)',
                  border: solenoidOpen ? '1px solid rgba(30,94,58,0.35)' : '1px solid rgba(239,68,68,0.2)',
                  opacity: isAI ? 0.4 : 1,
                  cursor: isAI ? 'not-allowed' : 'pointer',
                }}
              >
                <motion.div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  animate={{ x: solenoidOpen ? 36 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  style={{
                    background: solenoidOpen ? '#1E5E3A' : '#9CA3AF',
                    boxShadow: solenoidOpen ? '0 0 12px rgba(30,94,58,0.3)' : 'none',
                  }}
                >
                  <Droplet size={13} style={{ color: solenoidOpen ? '#FFFFFF' : '#FFFFFF' }} />
                </motion.div>
              </button>
            </div>

            {/* Volumetric Target */}
            <div className="p-5 space-y-5" style={INNER_CARD}>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}>
                  <Sliders size={15} style={{ color: '#1E5E3A' }} />
                  Volumetric Target Delivery
                </h3>
                <span
                  className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: 'rgba(30,94,58,0.08)', border: '1px solid rgba(30,94,58,0.2)', color: '#1E5E3A' }}
                >
                  {waterTarget} mL
                </span>
              </div>

              <div className="space-y-3">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={waterTarget}
                  onChange={(e) => setWaterTarget(parseInt(e.target.value))}
                  disabled={isDispensing || isAI}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-30"
                  style={{ accentColor: '#1E5E3A', background: '#E5E7EB' }}
                />
                <div className="flex justify-between text-[10px] font-mono" style={{ color: '#6B7280' }}>
                  <span>100 mL</span><span>2500 mL</span><span>5000 mL</span>
                </div>
              </div>

              {/* Preset buttons */}
              <div className="grid sm:grid-cols-3 gap-3">
                {[500, 1000, 1500].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setWaterTarget(preset)}
                    disabled={isDispensing || isAI}
                    className="py-2 px-3 rounded-lg border text-xs font-mono font-bold tracking-wider transition-all disabled:opacity-30 cursor-pointer"
                    style={{
                      background: waterTarget === preset ? 'rgba(30,94,58,0.08)' : '#FFFFFF',
                      border: waterTarget === preset ? '1px solid #1E5E3A' : '1px solid #E5E7EB',
                      color: waterTarget === preset ? '#1E5E3A' : '#6B7280',
                    }}
                  >
                    {preset} mL
                  </button>
                ))}
              </div>

              {/* Initiate / Cancel button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleInitiateDispense}
                disabled={isAI}
                className="w-full py-4 rounded-xl font-extrabold text-sm tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: isDispensing ? '#EF4444' : '#1E5E3A',
                  boxShadow: isDispensing
                    ? '0 0 20px rgba(239,68,68,0.15)'
                    : '0 0 20px rgba(30,94,58,0.1)',
                }}
              >
                {isDispensing ? (
                  <><Square size={16} fill="currentColor" /> Cancel Dispensing</>
                ) : (
                  <><Play size={16} fill="currentColor" /> Initiate Dispense Cycle</>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Right: Dispense Monitor ── */}
        <div className="lg:col-span-5 space-y-5">
          <div
            className="p-6 h-full flex flex-col justify-between"
            style={{ ...CARD, minHeight: 380 }}
          >
            <h3 className="font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}>
              Dispense Session Monitor
            </h3>

            <AnimatePresence mode="wait">
              {isDispensing ? (
                <motion.div
                  key="dispensing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col items-center justify-center py-6 text-center space-y-6"
                >
                  {/* Progress ring */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                      <motion.circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="#1E5E3A"
                        strokeWidth="6"
                        strokeDasharray="276.4"
                        strokeDashoffset={276.4 - (276.4 * dispensePercentage) / 100}
                        strokeLinecap="round"
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-3xl font-bold" style={{ color: '#1E5E3A' }}>
                        {dispensePercentage}%
                      </span>
                      <span className="text-[9px] font-semibold uppercase" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                        Delivered
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xl font-bold" style={{ color: '#1A1A1A' }}>
                      {dispensedVolume} <span className="text-xs" style={{ color: '#6B7280' }}>/ {waterTarget} mL</span>
                    </span>
                    <p
                      className="text-[10px] font-mono flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider mt-1 animate-pulse"
                      style={{ color: '#1E5E3A' }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: '#1E5E3A' }} />
                      Flow: {flowRate.toFixed(1)} L/MIN
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-grow flex flex-col items-center justify-center py-10 text-center space-y-4"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner"
                    style={{ background: '#FAFBF9', border: '1px solid #E5E7EB', color: '#6B7280' }}
                  >
                    <Sliders size={32} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                      Actuator Session Idle
                    </h4>
                    <p className="text-[11px] mt-1.5 max-w-[200px] leading-relaxed mx-auto" style={{ color: '#6B7280' }}>
                      Set target volume and click Initiate Dispense to execute precision delivery.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Safety notice */}
            <div
              className="p-4 rounded-xl"
              style={{ background: '#FAFBF9', border: '1px solid #E5E7EB' }}
            >
              <div className="flex gap-2.5 items-start text-xs leading-relaxed">
                <AlertTriangle size={15} style={{ color: '#EF4444' }} className="shrink-0 mt-0.5" />
                <div style={{ color: '#6B7280' }}>
                  <span className="font-bold" style={{ color: '#1A1A1A' }}>Safety Interlock: </span>
                  AI predictive rules auto-delay the valve if rain is detected. Bypass by selecting{' '}
                  <span style={{ color: '#1E5E3A', fontWeight: 600 }}>Manual Override</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
