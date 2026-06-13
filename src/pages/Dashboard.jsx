import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Droplet,
  Thermometer,
  Wind,
  CloudRain,
  Activity,
  Calendar,
  Layers,
  MapPin,
  TrendingUp,
  Plus,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ── Shared style tokens ── */
const CARD = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
};

const CARD_HOVER = {
  ...CARD,
  transition: 'border-color 0.25s, transform 0.25s',
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } },
};

const Dashboard = () => {
  const {
    soilMoisture,
    temperature,
    humidity,
    rainStatus,
    flowRate,
    waterVolume,
    weatherForecast,
    activeZones,
  } = useApp();

  const spinDuration = flowRate > 0 ? `${(12 / flowRate).toFixed(2)}s` : '0s';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
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
            Operations Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Real-time telemetry · ESP32 Mesh Node v2.4.12
          </p>
        </div>

        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
        >
          <span className="h-2 w-2 rounded-full animate-ping" style={{ background: '#1E5E3A' }} />
          <span className="font-mono" style={{ color: '#6B7280' }}>LATENCY: 8ms</span>
        </div>
      </div>

      {/* ── Telemetry Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Soil Moisture */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, borderColor: 'rgba(30,94,58,0.35)' }}
          whileTap={{ scale: 0.99 }}
          style={CARD_HOVER}
          className="p-6 flex flex-col justify-between h-52 relative overflow-hidden"
        >
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                Soil Moisture
              </span>
              <span className="text-3xl font-mono font-bold mt-1 block" style={{ color: '#1A1A1A' }}>
                {soilMoisture.toFixed(1)}%
              </span>
            </div>
            <Droplet size={20} style={{ color: '#1E5E3A' }} />
          </div>

          {/* Liquid fill graphic */}
          <div className="absolute right-5 bottom-5 w-16 h-24">
            <div
              className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden relative shadow-inner"
              style={{ background: '#FAFBF9', border: '1px solid #E5E7EB' }}
            >
              <div
                className="absolute left-[-50%] w-[200%] h-[200%] rounded-[40%]"
                style={{
                  background: 'rgba(30,94,58,0.2)',
                  bottom: `calc(${soilMoisture}% - 100%)`,
                  animation: 'wave-motion 6s infinite linear',
                  transition: 'bottom 1s ease-in-out',
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold z-10 select-none"
                style={{ color: '#1E5E3A' }}
              >
                {soilMoisture.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="z-10 mt-auto">
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
              Zone Hydrology
            </div>
            <div className="w-[60%] h-1 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
              <div className="h-full transition-all duration-500" style={{ width: `${soilMoisture}%`, background: '#1E5E3A' }} />
            </div>
          </div>
        </motion.div>

        {/* Ambient Environment */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, borderColor: 'rgba(30,94,58,0.35)' }}
          whileTap={{ scale: 0.99 }}
          style={CARD_HOVER}
          className="p-6 flex flex-col justify-between h-52"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                Ambient Environment
              </span>
              <span className="text-xs font-bold tracking-wider uppercase mt-1 block font-mono" style={{ color: '#1E5E3A' }}>
                DHT22 Module
              </span>
            </div>
            <Thermometer size={20} style={{ color: '#1E5E3A' }} />
          </div>

          <div className="space-y-4">
            {[
              { label: 'Temperature', value: `${temperature}°C`, pct: (temperature / 50) * 100 },
              { label: 'Rel. Humidity', value: `${humidity}%`, pct: humidity },
            ].map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span style={{ color: '#6B7280' }}>{m.label}</span>
                  <span className="font-mono font-bold" style={{ color: '#1A1A1A' }}>{m.value}</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
                  <div className="h-full transition-all duration-300" style={{ width: `${m.pct}%`, background: '#1E5E3A' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
            Atmospheric sensors stable
          </div>
        </motion.div>

        {/* Rain Guard */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, borderColor: 'rgba(30,94,58,0.35)' }}
          whileTap={{ scale: 0.99 }}
          style={CARD_HOVER}
          className="p-6 flex flex-col justify-between h-52"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                Digital Rain Guard
              </span>
              <span className="text-xs font-bold uppercase mt-1 block" style={{ color: '#6B7280' }}>
                Predictive Sync
              </span>
            </div>
            <CloudRain
              size={20}
              style={{ color: rainStatus.includes('Warning') ? '#EF4444' : '#1E5E3A' }}
              className={rainStatus.includes('Warning') ? 'animate-bounce' : ''}
            />
          </div>

          <div className="py-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: rainStatus.includes('Warning') ? 'rgba(239,68,68,0.1)' : 'rgba(30,94,58,0.08)',
                border: `1px solid ${rainStatus.includes('Warning') ? 'rgba(239,68,68,0.3)' : 'rgba(30,94,58,0.25)'}`,
                color: rainStatus.includes('Warning') ? '#EF4444' : '#1E5E3A',
              }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: rainStatus.includes('Warning') ? '#EF4444' : '#1E5E3A',
                  animation: rainStatus.includes('Warning') ? 'ping 1s cubic-bezier(0,0,0.2,1) infinite' : 'none',
                }}
              />
              {rainStatus}
            </span>
            <p className="text-[11px] mt-3 leading-relaxed" style={{ color: '#6B7280' }}>
              {rainStatus.includes('Warning')
                ? 'High precipitation chance triggers system-wide hold on solenoid valves.'
                : 'Sensor is dry. Scheduled irrigation parameters running normally.'}
            </p>
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
            Rain Guard Active
          </div>
        </motion.div>

        {/* Flow Rate */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, borderColor: 'rgba(30,94,58,0.35)' }}
          whileTap={{ scale: 0.99 }}
          style={CARD_HOVER}
          className="p-6 flex flex-col justify-between h-52 relative overflow-hidden"
        >
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                YF-S201 Flow Sensor
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-bold" style={{ color: '#1A1A1A' }}>
                  {flowRate.toFixed(1)}
                </span>
                <span className="text-xs font-mono" style={{ color: '#6B7280' }}>L/min</span>
              </div>
            </div>

            {/* Spinning turbine */}
            <svg
              className={`w-8 h-8 ${flowRate > 0 ? 'spinning-fan' : ''}`}
              style={{ color: '#1E5E3A', '--spin-duration': spinDuration }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
              <path d="M12 2v20M2 12h20" />
              <path d="m16.24 7.76-8.48 8.48M7.76 7.76l8.48 8.48" />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
            </svg>
          </div>

          <div className="z-10 mt-auto">
            <div className="text-[10px] uppercase font-semibold" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
              Cumulative Volume
            </div>
            <div className="text-sm font-mono font-bold mt-1 flex items-baseline gap-1" style={{ color: '#1A1A1A' }}>
              {waterVolume.toFixed(2)}
              <span className="text-[10px] font-normal" style={{ color: '#6B7280' }}>L delivered</span>
            </div>
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-wider z-10" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
            Flow Telemetry
          </div>
        </motion.div>
      </div>

      {/* ── Lower Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* 3-day Forecast */}
        <div className="p-6 space-y-4 rounded-2xl" style={CARD}>
          <div className="flex justify-between items-center">
            <h3
              className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
            >
              <Calendar size={15} style={{ color: '#1E5E3A' }} />
              Local Forecast
            </h3>
            <span
              className="text-[10px] px-2 py-0.5 rounded font-bold tracking-wider"
              style={{ background: '#FAFBF9', border: '1px solid #E5E7EB', color: '#6B7280', fontFamily: "'Syne', sans-serif" }}
            >
              PALO ALTO, CA
            </span>
          </div>

          <div style={{ borderTop: '1px solid #E5E7EB' }}>
            {weatherForecast.map((day) => (
              <div
                key={day.day}
                className="py-3 flex justify-between items-center"
                style={{ borderBottom: '1px solid #E5E7EB' }}
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-bold" style={{ color: '#1A1A1A' }}>{day.day}</p>
                  <p className="text-[10px] font-semibold uppercase" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                    {day.condition}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold" style={{ color: '#1A1A1A' }}>{day.temp}</p>
                  <p
                    className="text-[10px] font-semibold mt-0.5"
                    style={{ color: day.precip > 70 ? '#EF4444' : '#1E5E3A' }}
                  >
                    {day.precip}% precip
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Zones */}
        <div className="p-6 rounded-2xl lg:col-span-2 space-y-4" style={CARD}>
          <div className="flex justify-between items-center">
            <h3
              className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
            >
              <Layers size={15} style={{ color: '#1E5E3A' }} />
              Active Irrigation Zones
            </h3>
            <Link
              to="/onboarding"
              className="text-xs font-bold flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: '#1E5E3A',
                background: 'rgba(30,94,58,0.06)',
                border: '1px solid rgba(30,94,58,0.15)',
              }}
            >
              <Plus size={13} /> Add Zone
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {activeZones.map((zone) => (
              <div
                key={zone.id}
                className="p-4 rounded-xl flex justify-between items-start transition-all"
                style={{
                  background: '#FAFBF9',
                  border: '1px solid #E5E7EB',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(30,94,58,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
              >
                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold flex items-center gap-1.5" style={{ color: '#1A1A1A' }}>
                      <MapPin size={12} style={{ color: '#1E5E3A' }} />
                      {zone.name}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                      {zone.plant} · {zone.soil}
                    </p>
                  </div>

                  <div className="inline-flex gap-5">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>Kc Coefficient</span>
                      <span className="text-xs font-mono font-bold" style={{ color: '#1E5E3A' }}>{zone.kc.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>Zone Moisture</span>
                      <span className="text-xs font-mono font-bold" style={{ color: '#1E5E3A' }}>
                        {zone.id === 'zone-1' ? soilMoisture.toFixed(0) : zone.moisture.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(30,94,58,0.06)',
                    border: '1px solid rgba(30,94,58,0.15)',
                    color: '#1E5E3A',
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#1E5E3A' }} />
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
