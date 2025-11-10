import React from 'react';
import { Home, BarChart3, Wallet, Settings } from 'lucide-react';

const BottomNav = ({ currentScreen, setCurrentScreen, t }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 px-4 py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center gap-1 transition ${
            currentScreen === 'home' ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <Home size={24} />
          <span className="text-xs">{t('home')}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('analysis')}
          className={`flex flex-col items-center gap-1 transition ${
            currentScreen === 'analysis' ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-xs">{t('analysis')}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('portfolio')}
          className={`flex flex-col items-center gap-1 transition ${
            currentScreen === 'portfolio' ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <Wallet size={24} />
          <span className="text-xs">{t('portfolio')}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('settings')}
          className={`flex flex-col items-center gap-1 transition ${
            currentScreen === 'settings' ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs">{t('settings')}</span>
        </button>
      </div>
    </div>
);

export default BottomNav;
