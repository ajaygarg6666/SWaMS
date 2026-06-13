import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Droplet,
  Sun,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CARD = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
};

const containerVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } },
};

const Encyclopedia = () => {
  const { encyclopediaPlants } = useApp();
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Succulent', 'Herb', 'Vegetable', 'Tropical', 'Foliage', 'Shrub'];

  const filteredPlants = encyclopediaPlants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6"
        style={{ borderBottom: '1px solid #E5E7EB' }}
      >
        <div>
          <h1
            className="font-extrabold text-3xl flex items-center gap-2"
            style={{ fontFamily: "'Syne', sans-serif", color: '#1A1A1A' }}
          >
            Crop Encyclopedia
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Browse botanical cultivars registered in the SWaMS ecosystem.
          </p>
        </div>
      </div>

      {/* ── Filter Row ── */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            size={15}
            style={{ color: '#6B7280' }}
          />
          <input
            type="text"
            placeholder="Search cultivars or scientific names…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm rounded-xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              padding: '11px 12px 11px 40px',
              color: '#1A1A1A',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1E5E3A')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
          />
        </div>

        {/* Category buttons */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: selectedCategory === cat ? 'rgba(30,94,58,0.08)' : '#FFFFFF',
                border: selectedCategory === cat ? '1px solid #1E5E3A' : '1px solid #E5E7EB',
                color: selectedCategory === cat ? '#1E5E3A' : '#6B7280',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Plant Card Grid ── */}
      <AnimatePresence mode="popLayout">
        {filteredPlants.length > 0 ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredPlants.map((plant) => (
              <motion.div
                key={plant.id}
                variants={cardVariants}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(30,94,58,0.35)' }}
                className="overflow-hidden group cursor-pointer transition-all duration-300"
                style={CARD}
              >
                {/* Plant Image */}
                <div className="relative h-52 overflow-hidden" style={{ background: '#FAFBF9' }}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    style={{ opacity: 0.85 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)' }}
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{
                        background: '#1E5E3A',
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      {plant.category}
                    </span>
                    <span
                      className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'rgba(30,94,58,0.08)',
                        border: '1px solid rgba(30,94,58,0.25)',
                        color: '#1E5E3A',
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      {plant.status}
                    </span>
                  </div>
                  <span
                    className="absolute top-4 right-4 font-mono text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', color: '#6B7280' }}
                  >
                    {plant.id}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3
                      className="font-bold text-lg transition-colors"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: '#1A1A1A',
                      }}
                    >
                      {plant.name}
                    </h3>
                    <p className="text-xs italic mt-0.5" style={{ color: '#6B7280' }}>
                      {plant.scientificName}
                    </p>
                  </div>

                  <div className="flex gap-5">
                    <div className="flex items-center gap-1 text-xs" style={{ color: '#6B7280' }}>
                      <Droplet size={13} style={{ color: '#1E5E3A' }} />
                      {plant.waterNeed} Water
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: '#6B7280' }}>
                      <Sun size={13} style={{ color: '#1E5E3A' }} />
                      {plant.lightNeed}
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#6B7280' }}>
                    {plant.description}
                  </p>

                  {/* Hover reveal */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: 0,
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.maxHeight = '160px';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.maxHeight = '0px';
                      e.currentTarget.style.opacity = '0';
                    }}
                  >
                    <div
                      className="pt-3 mt-1 space-y-3"
                      style={{ borderTop: '1px solid #E5E7EB' }}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>Root Depth</span>
                          <span className="text-xs font-mono font-bold" style={{ color: '#1E5E3A' }}>{plant.rootDepth}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>Watering Cycle</span>
                          <span className="text-xs font-mono font-bold" style={{ color: '#1E5E3A' }}>{plant.wateringCycle}</span>
                        </div>
                      </div>

                      {/* Seasonal bar mini-chart */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest block" style={{ color: '#6B7280', fontFamily: "'Syne', sans-serif" }}>
                          Seasonal Watering Factor
                        </span>
                        <div className="flex items-end gap-1.5 h-8">
                          {plant.seasons.map((val, idx) => (
                            <div key={idx} className="flex-1 h-full flex flex-col justify-end" style={{ background: '#FAFBF9', borderRadius: 3 }}>
                              <motion.div
                                style={{ background: '#1E5E3A', borderRadius: 3 }}
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ delay: idx * 0.05 }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                          <span>Spr</span><span>Sum</span><span>Aut</span><span>Win</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center max-w-sm mx-auto space-y-4 rounded-2xl"
            style={CARD}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ background: '#FAFBF9', border: '1px solid #E5E7EB', color: '#6B7280' }}
            >
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1A1A1A', fontFamily: "'Syne', sans-serif" }}>
                No cultivars found
              </h3>
              <p className="text-xs mt-1 max-w-[200px] leading-relaxed mx-auto" style={{ color: '#6B7280' }}>
                No matching plant species in Node A1 database. Adjust query parameters.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Encyclopedia;
