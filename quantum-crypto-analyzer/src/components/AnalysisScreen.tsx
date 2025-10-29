import React from 'react';
import { Info } from 'lucide-react';
import PriceChart from './PriceChart';

const AnalysisScreen = ({ quantumVars, cryptoData, selectedCrypto, t }) => (
    <div className="p-4 pb-20">
      <h2 className="text-2xl font-bold mb-6">{t('detailedQuantumAnalysis')}</h2>

      {/* التنبؤ */}
      <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-6 mb-6 border border-purple-500/30">
        <h3 className="text-lg font-bold mb-4">{t('smartPrediction')}</h3>
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">
            {quantumVars.psi > 0.5 ? '🚀' :
             quantumVars.psi < -0.5 ? '⚠️' : '📊'}
          </div>
          <p className="text-2xl font-bold mb-2">
            {quantumVars.psi > 0.5 ? t('strongUpwardTrend') :
             quantumVars.psi < -0.5 ? t('sharpDownwardTrend') :
             t('relativeStability')}
          </p>
          <p className="text-gray-400">
            {t('confidence')}: {Math.min(95, 60 + Math.abs(quantumVars.psi) * 50).toFixed(0)}%
          </p>
        </div>

        <div className="bg-black/30 rounded-xl p-4">
          <p className="text-sm text-gray-300 mb-2">{t('analysis')}:</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            {quantumVars.entropy > 0.7 ? t('highEntropy') : ''}
            {quantumVars.curvature > 0.7 ? t('strongMarketFluctuations') : ''}
            {quantumVars.gradient > 0.7 ? t('newsSpreadsQuickly') : ''}
            {quantumVars.psi > 0.5 ? t('allIndicatorsPointToStrongBuyingPressure') :
             quantumVars.psi < -0.5 ? t('warningSignsPotentialDownturn') :
             t('marketInRelativeEquilibrium')}
          </p>
        </div>
      </div>

      {/* Price Chart */}
      <div className="mb-6">
        <PriceChart cryptoId={selectedCrypto} />
      </div>

      {/* نقاط القوة والضعف */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-900/20 border border-green-600 rounded-2xl p-4">
          <h4 className="font-bold mb-2 text-green-400">{t('strengths')}</h4>
          <ul className="text-xs space-y-1 text-gray-300">
            {quantumVars.psi > 0 && <li>{t('positiveMomentum')}</li>}
            {cryptoData[selectedCrypto]?.change > 0 && <li>{t('risingPrice')}</li>}
            {quantumVars.gradient < 0.5 && <li>{t('relativeStability')}</li>}
            {quantumVars.entropy < 0.6 && <li>{t('clearInformation')}</li>}
          </ul>
        </div>

        <div className="bg-red-900/20 border border-red-600 rounded-2xl p-4">
          <h4 className="font-bold mb-2 text-red-400">{t('weaknesses')}</h4>
          <ul className="text-xs space-y-1 text-gray-300">
            {quantumVars.curvature > 0.7 && <li>{t('highVolatility')}</li>}
            {quantumVars.entropy > 0.8 && <li>{t('informationalChaos')}</li>}
            {cryptoData[selectedCrypto]?.change < -5 && <li>{t('sharpDecline')}</li>}
            {quantumVars.psi < 0 && <li>{t('sellingPressure')}</li>}
          </ul>
        </div>
      </div>

      {/* توصيات */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Info className="text-blue-400" size={20} />
          {t('recommendations')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-slate-700 rounded-xl">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">
                {quantumVars.psi > 0.5 ? t('potentialBuyingOpportunity') :
                 quantumVars.psi < -0.5 ? t('avoidBuyingCurrently') :
                 t('monitorTheMarket')}
              </p>
              <p className="text-xs text-gray-400">
                {quantumVars.psi > 0.5 ? t('indicatorsArePositiveButBewareOfVolatility') :
                 quantumVars.psi < -0.5 ? t('waitForMarketStabilityBeforeEntering') :
                 t('noClearSignalsWait')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default AnalysisScreen;
