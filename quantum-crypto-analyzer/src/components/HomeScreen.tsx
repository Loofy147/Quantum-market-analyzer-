import React from 'react';
import { TrendingUp, TrendingDown, Bell, Zap } from 'lucide-react';

const HomeScreen = ({ cryptoData, selectedCrypto, setSelectedCrypto, cryptoInfo, quantumVars, notifications, t }) => (
    <div className="p-4 pb-20">
      {/* الرأسية */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{t('title')}</h1>
        <p className="text-gray-400 text-sm">{t('subtitle')}</p>
      </div>

      {/* بطاقة العملة المختارة */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 mb-6 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">{t('currentPrice')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">
                ${cryptoData[selectedCrypto]?.price.toLocaleString() || '0'}
              </span>
              <span className="text-xl text-white/90">
                {cryptoInfo[selectedCrypto].symbol}
              </span>
            </div>
          </div>
          <div className="text-5xl">{cryptoInfo[selectedCrypto].icon}</div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {cryptoData[selectedCrypto]?.change >= 0 ? (
            <TrendingUp className="text-green-300" size={20} />
          ) : (
            <TrendingDown className="text-red-300" size={20} />
          )}
          <span className={`text-lg font-bold ${
            cryptoData[selectedCrypto]?.change >= 0 ? 'text-green-300' : 'text-red-300'
          }`}>
            {cryptoData[selectedCrypto]?.change >= 0 ? '+' : ''}
            {cryptoData[selectedCrypto]?.change.toFixed(2)}%
          </span>
          <span className="text-white/70 text-sm">{t('change24h')}</span>
        </div>

        {/* المؤشر الكمومي */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/90 text-sm">{t('quantumIndicator')}</span>
            <span className="text-white font-bold">{quantumVars.psi.toFixed(3)}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                quantumVars.psi > 0 ? 'bg-green-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min(Math.abs(quantumVars.psi) * 100, 100)}%` }}
            />
          </div>
          <p className="text-white/70 text-xs mt-2">
            {quantumVars.psi > 0.5 ? t('strongUpwardTrend') :
             quantumVars.psi < -0.5 ? t('sharpDownwardTrend') :
             t('relativeStability')}
          </p>
        </div>
      </div>

      {/* اختيار العملات */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">{t('availableCryptos')}</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(cryptoInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setSelectedCrypto(key)}
              className={`p-4 rounded-2xl transition-all ${
                selectedCrypto === key
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 scale-105 shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <div className="text-3xl mb-2">{info.icon}</div>
              <div className="text-xs font-bold">{info.symbol}</div>
              <div className={`text-xs mt-1 ${
                cryptoData[key]?.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {cryptoData[key]?.change >= 0 ? '+' : ''}
                {cryptoData[key]?.change.toFixed(1)}%
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* المتغيرات الكمومية */}
      <div className="bg-slate-800 rounded-2xl p-4 mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="text-yellow-400" size={20} />
          {t('quantumVariables')}
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{t('entropy')}</span>
              <span className="text-yellow-400 font-bold">{quantumVars.entropy.toFixed(3)}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all"
                style={{ width: `${quantumVars.entropy * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{t('curvature')}</span>
              <span className="text-purple-400 font-bold">{quantumVars.curvature.toFixed(3)}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${quantumVars.curvature * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{t('gradient')}</span>
              <span className="text-blue-400 font-bold">{quantumVars.gradient.toFixed(3)}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${quantumVars.gradient * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* الإشعارات الأخيرة */}
      {notifications.length > 0 && (
        <div className="bg-slate-800 rounded-2xl p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Bell className="text-blue-400" size={20} />
            {t('notifications')}
          </h3>
          <div className="space-y-2">
            {notifications.slice(0, 3).map((notif, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl ${
                  notif.type === 'danger' ? 'bg-red-900/30 border border-red-600' :
                  'bg-green-900/30 border border-green-600'
                }`}
              >
                <p className="font-bold text-sm mb-1">{notif.title}</p>
                <p className="text-xs text-gray-400">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
);

export default HomeScreen;
