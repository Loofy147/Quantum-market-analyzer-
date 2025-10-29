import React, { useState, useEffect } from 'react';
import { Bell, RefreshCw } from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import AnalysisScreen from './components/AnalysisScreen';
import PortfolioScreen from './components/PortfolioScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNav from './components/BottomNav';
import StorageManager from './utils/StorageManager';
import NotificationManager from './utils/NotificationManager';
import { useLocalization } from './locales/useLocalization';
import { calculatePsi, calculateVonNeumannEntropy, calculatePriceCurvature, calculateInformationGradient } from './logic/quantumModel';

const QuantumCryptoMobileApp = () => {
  const { language, setLanguage, t } = useLocalization();
  // الحالة العامة
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [isLoading, setIsLoading] = useState(false);

  // البيانات الحقيقية
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { price: 0, change: 0, volume: 0, loading: true },
    ethereum: { price: 0, change: 0, volume: 0, loading: true },
    binancecoin: { price: 0, change: 0, volume: 0, loading: true }
  });

  const [historicalData, setHistoricalData] = useState({ prices: [], total_volumes: [] });

  // المتغيرات الكمومية
  const [quantumVars, setQuantumVars] = useState({
    entropy: 0,
    curvature: 0,
    gradient: 0,
    psi: 0
  });

  // التنبيهات والإشعارات
  const [notifications, setNotifications] = useState([]);

  // المحفظة الافتراضية
  const [portfolio, setPortfolio] = useState(() => StorageManager.load('portfolio', [
    { crypto: 'bitcoin', amount: 0.05, buyPrice: 43000 },
    { crypto: 'ethereum', amount: 0.5, buyPrice: 2300 }
  ]));

  // الإعدادات
  const [settings, setSettings] = useState(() => StorageManager.load('settings', {
    notifications: true,
    darkMode: true,
    alertThreshold: 0.7,
    updateInterval: 30,
    language: 'ar'
  }));

  useEffect(() => {
    setLanguage(settings.language);
  }, [settings.language, setLanguage]);

  const cryptoInfo = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a' },
    ethereum: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea' },
    binancecoin: { name: 'BNB', symbol: 'BNB', icon: '◆', color: '#f3ba2f' }
  };

  const fetchHistoricalData = async (cryptoId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=30`
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  // جلب البيانات الحقيقية
  const fetchCryptoData = async () => {
    setIsLoading(true);
    try {
      const ids = Object.keys(cryptoData).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
      );

      if (response.ok) {
        const data = await response.json();
        const newData = {};

        Object.keys(data).forEach(key => {
          newData[key] = {
            price: data[key].usd || 0,
            change: data[key].usd_24h_change || 0,
            volume: data[key].usd_24h_vol || 0,
            loading: false
          };
        });

        setCryptoData(newData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث المتغيرات الكمومية
  const updateQuantumVars = () => {
    if (historicalData.prices.length < 2) return;

    const entropy = calculateVonNeumannEntropy(historicalData.prices);
    const curvature = calculatePriceCurvature(historicalData.prices);
    const gradient = calculateInformationGradient(historicalData.total_volumes);
    const psi = calculatePsi(historicalData);

    setQuantumVars({ entropy, curvature, gradient, psi });

    detectPatterns(psi, entropy, curvature, gradient);
  };

  // كشف الأنماط
  const detectPatterns = (psi, entropy, curvature, gradient) => {
    const newAlerts = [];

    if (curvature > 0.8 && entropy > 0.85 && gradient > 0.7) {
      newAlerts.push({
        type: 'danger',
        title: t('financialBlackHole'),
        message: t('cryptoInDangerZone', { cryptoName: cryptoInfo[selectedCrypto].name }),
        crypto: selectedCrypto,
        timestamp: Date.now()
      });
    }

    if (psi > 0.5 && gradient > 0.75) {
      newAlerts.push({
        type: 'opportunity',
        title: t('potentialBuyingOpportunity'),
        message: t('informationalInflationIn', { cryptoName: cryptoInfo[selectedCrypto].name }),
        crypto: selectedCrypto,
        timestamp: Date.now()
      });
    }

    if (newAlerts.length > 0 && settings.notifications) {
      setNotifications(prev => [...newAlerts, ...prev].slice(0, 10));
      newAlerts.forEach(alert => NotificationManager.sendPushNotification(alert));
    }
  };

  useEffect(() => {
    fetchCryptoData();
    fetchHistoricalData(selectedCrypto);
  }, [selectedCrypto]);

  useEffect(() => {
    updateQuantumVars();
  }, [historicalData]);

  useEffect(() => {
    const interval = setInterval(fetchCryptoData, settings.updateInterval * 1000);
    return () => clearInterval(interval);
  }, [settings.updateInterval]);


  // Save portfolio and settings to local storage whenever they change
  useEffect(() => {
    StorageManager.save('portfolio', portfolio);
  }, [portfolio]);

  useEffect(() => {
    StorageManager.save('settings', settings);
  }, [settings]);

  const calculatePnL = (crypto) => {
    const holding = portfolio.find(p => p.crypto === crypto);
    if (!holding) return { pnl: 0, percent: 0 };

    const currentPrice = cryptoData[crypto]?.price || 0;
    const pnl = (currentPrice - holding.buyPrice) * holding.amount;
    const percent = ((currentPrice - holding.buyPrice) / holding.buyPrice) * 100;

    return { pnl, percent };
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen
          cryptoData={cryptoData}
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
          cryptoInfo={cryptoInfo}
          quantumVars={quantumVars}
          notifications={notifications}
          t={t}
        />;
      case 'analysis':
        return <AnalysisScreen
          quantumVars={quantumVars}
          cryptoData={cryptoData}
          selectedCrypto={selectedCrypto}
          t={t}
        />;
      case 'portfolio':
        return <PortfolioScreen
          portfolio={portfolio}
          cryptoData={cryptoData}
          cryptoInfo={cryptoInfo}
          calculatePnL={calculatePnL}
          t={t}
        />;
      case 'settings':
        return <SettingsScreen
          settings={settings}
          setSettings={setSettings}
          t={t}
          setLanguage={setLanguage}
        />;
      default:
        return <HomeScreen
          cryptoData={cryptoData}
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
          cryptoInfo={cryptoInfo}
          quantumVars={quantumVars}
          notifications={notifications}
          t={t}
        />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white overflow-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
              Ψ
            </div>
            <div>
              <h1 className="font-bold text-sm">{t('title')}</h1>
              <p className="text-xs text-gray-400">{t('subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchCryptoData}
              className={`p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition ${
                isLoading ? 'animate-spin' : ''
              }`}
              disabled={isLoading}
            >
              <RefreshCw size={20} />
            </button>

            {notifications.length > 0 && (
              <button className="relative p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        {renderScreen()}
      </div>

      <BottomNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        t={t}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-bold">{t('updating')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumCryptoMobileApp;
