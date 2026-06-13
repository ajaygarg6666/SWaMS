import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Sliders,
  PlusCircle,
  BookOpen,
  LogOut,
  Bell,
  Search,
  Flame,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Droplet,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── shared tokens ── */
const T = {
  greenPrimary: '#1E5E3A',
  greenMedium:  '#4CAF7D',
  greenLight:   '#A8D5B5',
  textPrimary:  '#1A1A1A',
  textSecondary:'#6B7280',
  border:       '#E5E7EB',
  bgPage:       '#F4F6F4',
  white:        '#FFFFFF',
  danger:       '#EF4444',
  badge:        '#E8F5EE',
};

const Layout = ({ children }) => {
  const {
    isAuthenticated,
    user,
    handleLogout,
    weatherAlertActive,
    setWeatherAlertDismissed,
    triggerEmergencyStop,
    toasts,
    removeToast,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard',    path: '/dashboard',   icon: LayoutDashboard },
    { name: 'Controls',     path: '/control',     icon: Sliders         },
    { name: 'Add Zone',     path: '/onboarding',  icon: PlusCircle      },
    { name: 'Encyclopedia', path: '/encyclopedia', icon: BookOpen        },
  ];

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex font-sans" style={{ background: T.bgPage, color: T.textPrimary }}>

      {/* ── Toast Stack ── */}
      <div className="fixed top-4 right-4 z-[999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="flex items-start gap-3 p-4 rounded-2xl pointer-events-auto"
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === 'success' && <CheckCircle size={16} style={{ color: T.greenPrimary }} />}
                {toast.type === 'error'   && <AlertTriangle size={16} style={{ color: T.danger }} />}
                {toast.type === 'warning' && <AlertTriangle size={16} style={{ color: '#F59E0B' }} />}
                {toast.type === 'info'    && <Info size={16} style={{ color: T.greenMedium }} />}
              </div>
              <p className="flex-1 text-sm font-medium" style={{ color: T.textPrimary }}>{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="opacity-40 hover:opacity-80 transition-opacity">
                <X size={14} style={{ color: T.textSecondary }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Weather Banner ── */}
      <AnimatePresence>
        {weatherAlertActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-2.5"
            style={{ background: '#FEF3C7', borderBottom: `1px solid #FCD34D` }}
          >
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#92400E' }}>
              <AlertTriangle size={16} className="animate-bounce" />
              <span>
                <strong>AI Auto-Delay:</strong> Rainfall predicted (85%). Irrigation suspended.
              </span>
            </div>
            <button
              onClick={() => setWeatherAlertDismissed(true)}
              className="text-xs font-bold px-3 py-1 rounded-lg"
              style={{ background: '#F59E0B', color: '#FFFFFF' }}
            >
              BYPASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 overflow-hidden"
        style={{ background: T.white, borderRight: `1px solid ${T.border}` }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2E7D52, #4CAF7D)' }}
          >
            <Droplet size={15} color="#fff" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: T.textPrimary }}>SWaMS</span>
        </div>

        <div className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
          {/* Menu section */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: T.textSecondary }}>
              Menu
            </p>
            <nav className="space-y-0.5">
              {menuItems.slice(0, 2).map(({ name, path, icon: Icon }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={name}
                    to={path}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative"
                    style={{
                      background: active ? '#E8F5EE' : 'transparent',
                      color: active ? T.greenPrimary : T.textSecondary,
                      fontWeight: active ? 600 : 500,
                      fontSize: '0.9rem',
                    }}
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
                        style={{ background: T.greenPrimary }}
                      />
                    )}
                    <Icon size={17} style={{ color: active ? T.greenPrimary : T.greenMedium }} />
                    {name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* General section */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: T.textSecondary }}>
              General
            </p>
            <nav className="space-y-0.5">
              {menuItems.slice(2).map(({ name, path, icon: Icon }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={name}
                    to={path}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative"
                    style={{
                      background: active ? '#E8F5EE' : 'transparent',
                      color: active ? T.greenPrimary : T.textSecondary,
                      fontWeight: active ? 600 : 500,
                      fontSize: '0.9rem',
                    }}
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
                        style={{ background: T.greenPrimary }}
                      />
                    )}
                    <Icon size={17} style={{ color: active ? T.greenPrimary : T.greenMedium }} />
                    {name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom: E-Stop + Logout */}
        <div className="px-3 py-4 space-y-1" style={{ borderTop: `1px solid ${T.border}` }}>
          <button
            onClick={triggerEmergencyStop}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ color: T.danger, background: '#FEE2E2' }}
          >
            <Flame size={16} className="animate-pulse" style={{ color: T.danger }} />
            Emergency Stop
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: T.textSecondary }}
          >
            <LogOut size={16} style={{ color: T.textSecondary }} />
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Right Column ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-6 h-16 gap-4"
          style={{ background: T.white, borderBottom: `1px solid ${T.border}` }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl w-64"
            style={{ background: T.bgPage, border: `1px solid ${T.border}` }}
          >
            <Search size={14} style={{ color: T.textSecondary }} />
            <input
              placeholder="Search…"
              className="bg-transparent text-sm outline-none w-full"
              style={{ color: T.textPrimary }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Node status */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: '#E8F5EE', color: T.greenPrimary }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: T.greenMedium }} />
              Node A1 Online
            </div>

            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <Bell size={17} style={{ color: T.textSecondary }} />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #2E7D52, #4CAF7D)' }}
              >
                {(user?.name || 'Ajay')[0]}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-none" style={{ color: T.textPrimary }}>
                  {user?.name || 'Ajay Garg'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>Operator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center h-16 px-2"
        style={{ background: T.white, borderTop: `1px solid ${T.border}` }}
      >
        {menuItems.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className="flex flex-col items-center justify-center flex-1 h-full"
              style={{ color: active ? T.greenPrimary : T.textSecondary }}
            >
              <Icon size={18} />
              <span className="text-[10px] font-semibold mt-1">{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
