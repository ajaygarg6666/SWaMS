import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Initial list of plants for the Encyclopedia
const INITIAL_PLANTS = [
  {
    id: '0822-A',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'Tropical',
    status: 'Stable',
    waterNeed: 'Medium',
    lightNeed: 'Indirect Bright',
    rootDepth: '45.2 cm',
    wateringCycle: '72 hrs',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant tropical evergreen climbing plant famous for its iconic leaf fenestrations. Highly sensitive to soil waterlogging.',
    seasons: [75, 60, 40, 20], // Spring, Summer, Autumn, Winter watering relative bars
  },
  {
    id: '0911-S',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    category: 'Succulent',
    status: 'Stable',
    waterNeed: 'Low',
    lightNeed: 'Partial / Low',
    rootDepth: '12.5 cm',
    wateringCycle: '336 hrs',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Tough, architectural succulent with upright sword-like leaves. Outstanding drought tolerance and low water requirement.',
    seasons: [20, 30, 20, 10],
  },
  {
    id: '0144-F',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'Foliage',
    status: 'Sensitive',
    waterNeed: 'High',
    lightNeed: 'Bright Consistent',
    rootDepth: '60.8 cm',
    wateringCycle: '48 hrs',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Stunning banyan foliage tree with large violin-shaped leaves. Demands precise environmental control and stable soil moisture.',
    seasons: [90, 100, 70, 40],
  },
  {
    id: '0289-H',
    name: 'Sweet Basil',
    scientificName: 'Ocimum basilicum',
    category: 'Herb',
    status: 'Stable',
    waterNeed: 'Medium',
    lightNeed: 'Direct Sun',
    rootDepth: '20.0 cm',
    wateringCycle: '24 hrs',
    image: 'https://images.unsplash.com/photo-1515516969-d4014b093172?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic annual herb popular in culinary dishes. Prefers warm weather and consistently damp, well-draining loamy soil.',
    seasons: [80, 95, 50, 0], // 0 in winter (dormant)
  },
  {
    id: '0712-V',
    name: 'Roma Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    status: 'Growth Phase',
    waterNeed: 'High',
    lightNeed: 'Full Sun',
    rootDepth: '35.4 cm',
    wateringCycle: '36 hrs',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Plum tomato variety prized for canning and paste. Requires heavy water delivery during fruit development phase.',
    seasons: [85, 95, 60, 0],
  },
  {
    id: '0402-E',
    name: 'English Lavender',
    scientificName: 'Lavandula angustifolia',
    category: 'Shrub',
    status: 'Stable',
    waterNeed: 'Low',
    lightNeed: 'Full Sun',
    rootDepth: '40.0 cm',
    wateringCycle: '168 hrs',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Flowering shrub adapted to arid Mediterranean climates. Highly vulnerable to root-rot in clay soils.',
    seasons: [30, 40, 25, 15],
  }
];

export const AppContextProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Custom Toast Notification System
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Weather state (Palo Alto)
  const [weatherForecast] = useState([
    { day: 'Tomorrow', temp: '22° / 14°', precip: 10, icon: 'partly_cloudy_day', condition: 'Clear skies' },
    { day: 'Wednesday', temp: '18° / 12°', precip: 85, icon: 'rainy', condition: 'Warning: Precipitation Detected' },
    { day: 'Thursday', temp: '20° / 15°', precip: 20, icon: 'cloud', condition: 'Partly cloudy' },
  ]);
  const [weatherAlertDismissed, setWeatherAlertDismissed] = useState(false);

  // Global Config / Onboarding state
  const [activeZones, setActiveZones] = useState([
    { id: 'zone-1', name: 'West Greenhouse - Succulents', plant: 'Snake Plant', soil: 'Sandy Mix', kc: 0.3, moisture: 42.0 },
    { id: 'zone-2', name: 'South Orchard - Fruiting', plant: 'Roma Tomato', soil: 'Loamy Clay', kc: 0.95, moisture: 78.2 }
  ]);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingPlantImg, setOnboardingPlantImg] = useState(null);
  const [onboardingSoilImg, setOnboardingSoilImg] = useState(null);
  const [isOnboardingAnalyzing, setIsOnboardingAnalyzing] = useState(false);
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [onboardingResult, setOnboardingResult] = useState(null);

  // ESP32 IoT Telemetry
  const [soilMoisture, setSoilMoisture] = useState(42.0); // %
  const [temperature, setTemperature] = useState(24.8); // °C
  const [humidity, setHumidity] = useState(58.0); // %
  const [rainStatus, setRainStatus] = useState('Status: Clear skies');
  const [flowRate, setFlowRate] = useState(0.0); // L/min
  const [waterVolume, setWaterVolume] = useState(120.45); // Cumulative Liters

  // Edge Hardware Actuators
  const [systemMode, setSystemMode] = useState('AI Predictive Auto'); // 'AI Predictive Auto' | 'Manual Override'
  const [solenoidOpen, setSolenoidOpen] = useState(false);
  const [waterTarget, setWaterTarget] = useState(1500); // Volumetric Target in mL
  const [dispensedVolume, setDispensedVolume] = useState(0); // mL dispensed in current session
  const [isDispensing, setIsDispensing] = useState(false);

  // Plant Encyclopedia
  const [encyclopediaSearch, setEncyclopediaSearch] = useState('');
  const [encyclopediaCategory, setEncyclopediaCategory] = useState('All');
  const [encyclopediaPlants] = useState(INITIAL_PLANTS);

  // Computed: Auto Rain Delay Status
  // If systemMode is AI and Day 2 precip is high (>70%), the AI delay activates.
  const isRainDelayActive = systemMode === 'AI Predictive Auto' && weatherForecast[1].precip > 70;
  const weatherAlertActive = isRainDelayActive && !weatherAlertDismissed;

  // Login credentials check
  const handleLogin = (email, password) => {
    if (email === 'admin@swams.io' && password === 'admin123') {
      setIsAuthenticated(true);
      setUser({ email, role: 'Senior Operator', name: 'Ajay Garg' });
      addToast('System Operator authentication successful. Access granted.', 'success');
      return true;
    } else {
      addToast('Authentication failed: Invalid credentials.', 'error');
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setSolenoidOpen(false);
    addToast('Operator logged out. System returned to default security lock.', 'info');
  };

  // Emergency Stop Trigger
  const triggerEmergencyStop = () => {
    setSolenoidOpen(false);
    setFlowRate(0.0);
    setIsDispensing(false);
    setDispensedVolume(0);
    addToast('EMERGENCY STOP ENGAGED: All solenoid valves shut down immediately!', 'error');
  };

  // Onboarding analysis simulation
  const startOnboardingAnalysis = (plantCategorySelected = 6) => {
    setIsOnboardingAnalyzing(true);
    setOnboardingProgress(0);

    const interval = setInterval(() => {
      setOnboardingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return interval;
  };

  // When progress finishes, trigger result mapping
  useEffect(() => {
    if (onboardingProgress === 100 && isOnboardingAnalyzing) {
      setTimeout(() => {
        setIsOnboardingAnalyzing(false);
        // Map simulation results based on arbitrary mock selections
        const isFruiting = Math.random() > 0.4;
        const result = isFruiting ? {
          plantType: 'Category 6 (Fruiting Vegetable)',
          kc: '0.95',
          soilProfile: 'Loamy-Clay mix (Retention: High, 0.78)',
          wateringNecessity: 'Heavy baseline water demand during early fruit set. Requires soil moistures maintained between 65% - 85%.'
        } : {
          plantType: 'Category 1 (Succulent)',
          kc: '0.30',
          soilProfile: 'Sandy-Gravel mix (Retention: Low, 0.22)',
          wateringNecessity: 'Minimal baseline water demand. Requires extended dry cycle intervals (dry down below 30% moisture before pulse).'
        };

        setOnboardingResult(result);
        addToast('Visual spectral analysis completed. Crop model mapped.', 'success');
      }, 500);
    }
  }, [onboardingProgress]);

  // Main ESP32 Hardware simulation loop
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Simulate minor fluctuating ambient DHT22 telemetry
      setTemperature((t) => +(t + (Math.random() - 0.5) * 0.15).toFixed(1));
      setHumidity((h) => Math.min(100, Math.max(0, +(h + (Math.random() - 0.5) * 0.3).toFixed(1))));

      // 2. Adjust digital Rain Guard status
      if (weatherAlertActive) {
        setRainStatus('Warning: Precipitation Detected');
      } else {
        setRainStatus('Status: Clear skies');
      }

      // 3. Actuator and Hydrology simulation
      if (solenoidOpen) {
        // If Rain Delay is active and system is in AI mode, auto shut off!
        if (isRainDelayActive) {
          setSolenoidOpen(false);
          setFlowRate(0.0);
          setIsDispensing(false);
          setDispensedVolume(0);
          addToast('AI Auto-Delay Intercept: Solenoid shut off due to impending rainfall.', 'warning');
          return;
        }

        // Valve is open: water is flowing!
        // ESP32 sends a flow rate of ~4.8 to 5.4 L/min
        const currentFlow = +(4.8 + Math.random() * 0.6).toFixed(2);
        setFlowRate(currentFlow);

        // Increase soil moisture due to watering
        setSoilMoisture((prev) => Math.min(98.0, +(prev + 0.65).toFixed(1)));

        // Increment cumulative water volume (Liters)
        setWaterVolume((prev) => +(prev + (currentFlow / 60)).toFixed(3));

        // Increment active volumetric dispense volume (mL)
        if (isDispensing) {
          const mlTick = (currentFlow * 1000) / 60; // mL delivered in this 1s tick
          setDispensedVolume((prev) => {
            const nextVol = Math.round(prev + mlTick);
            if (nextVol >= waterTarget) {
              // Target Reached! Trigger Auto Shutoff
              setSolenoidOpen(false);
              setFlowRate(0.0);
              setIsDispensing(false);
              addToast(`Volumetric Target reached: ${waterTarget}ml dispensed. Auto shutoff activated.`, 'success');
              return waterTarget;
            }
            return nextVol;
          });
        }
      } else {
        // Solenoid is closed: no water flow!
        setFlowRate(0.0);
        setDispensedVolume(0);

        // Soil slowly dries out over time in the sun
        setSoilMoisture((prev) => Math.max(28.5, +(prev - 0.05).toFixed(1)));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [solenoidOpen, isDispensing, waterTarget, isRainDelayActive, weatherAlertActive]);

  // Handle manual solenoid toggle safety overrides
  const handleSolenoidToggle = (targetState) => {
    if (targetState === true) {
      if (isRainDelayActive) {
        addToast('Precipitation warning active. Switch mode to Manual Override to force irrigation.', 'warning');
        return;
      }
      setSolenoidOpen(true);
      addToast('12V Solenoid actuated: Valve OPEN.', 'success');
    } else {
      setSolenoidOpen(false);
      setFlowRate(0.0);
      setIsDispensing(false);
      setDispensedVolume(0);
      addToast('12V Solenoid actuated: Valve CLOSED.', 'info');
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLogout,
        
        toasts,
        addToast,
        removeToast,

        weatherForecast,
        weatherAlertActive,
        setWeatherAlertDismissed,

        activeZones,
        setActiveZones,
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

        soilMoisture,
        setSoilMoisture,
        temperature,
        humidity,
        rainStatus,
        flowRate,
        waterVolume,

        systemMode,
        setSystemMode,
        solenoidOpen,
        setSolenoidOpen: handleSolenoidToggle,
        waterTarget,
        setWaterTarget,
        dispensedVolume,
        setDispensedVolume,
        isDispensing,
        setIsDispensing,

        triggerEmergencyStop,

        encyclopediaSearch,
        setEncyclopediaSearch,
        encyclopediaCategory,
        setEncyclopediaCategory,
        encyclopediaPlants,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
