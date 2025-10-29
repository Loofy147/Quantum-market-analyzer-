import React from 'react';

const SettingsScreen = ({ settings, setSettings, t, setLanguage }) => (
    <div className="p-4 pb-20">
      <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>

      <div className="space-y-4">
        <div className="bg-slate-800 rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">{t('notifications')}</p>
              <p className="text-sm text-gray-400">{t('receiveAlertsForOpportunitiesAndRisks')}</p>
            </div>
            <button
              onClick={() => setSettings(s => ({ ...s, notifications: !s.notifications }))}
              className={`w-12 h-6 rounded-full transition ${
                settings.notifications ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="font-bold mb-3">{t('updateInterval')}</p>
          <select
            value={settings.updateInterval}
            onChange={(e) => setSettings(s => ({ ...s, updateInterval: parseInt(e.target.value) }))}
            className="w-full bg-slate-700 p-3 rounded-xl"
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="font-bold mb-3">{t('alertSensitivity')}</p>
          <input
            type="range"
            min="0.5"
            max="0.9"
            step="0.1"
            value={settings.alertThreshold}
            onChange={(e) => setSettings(s => ({ ...s, alertThreshold: parseFloat(e.target.value) }))}
            className="w-full accent-blue-600"
          />
          <p className="text-sm text-gray-400 mt-2">
            {settings.alertThreshold === 0.5 ? t('veryHigh') :
             settings.alertThreshold === 0.7 ? t('medium') :
             t('low')}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="font-bold mb-3">Language</p>
          <select
            value={settings.language}
            onChange={(e) => {
              setSettings(s => ({ ...s, language: e.target.value }));
              setLanguage(e.target.value);
            }}
            className="w-full bg-slate-700 p-3 rounded-xl"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-4 border border-blue-500/30">
          <h3 className="font-bold mb-2 text-blue-300">{t('aboutTheApp')}</h3>
          <p className="text-sm text-gray-400 mb-2">
            {t('quantumCryptoAnalyzerV1')}
          </p>
          <p className="text-xs text-gray-500">
            {t('usesQuantumCurvatureOfInformationalSpacetime')}
          </p>
        </div>
      </div>
    </div>
);

export default SettingsScreen;
