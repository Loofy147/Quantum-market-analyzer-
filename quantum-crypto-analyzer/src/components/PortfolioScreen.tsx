import React from 'react';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

const PortfolioScreen = ({ portfolio, cryptoData, cryptoInfo, calculatePnL, t }) => {
    const totalValue = portfolio.reduce((sum, holding) => {
      const currentPrice = cryptoData[holding.crypto]?.price || 0;
      return sum + (currentPrice * holding.amount);
    }, 0);

    const totalCost = portfolio.reduce((sum, holding) => {
      return sum + (holding.buyPrice * holding.amount);
    }, 0);

    const totalPnL = totalValue - totalCost;
    const totalPnLPercent = (totalPnL / totalCost) * 100;

    return (
      <div className="p-4 pb-20">
        <h2 className="text-2xl font-bold mb-6">{t('portfolio')}</h2>

        {/* القيمة الإجمالية */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-6 mb-6 shadow-2xl">
          <p className="text-white/80 text-sm mb-1">{t('totalValue')}</p>
          <p className="text-4xl font-bold text-white mb-4">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          <div className="flex items-center gap-2">
            {totalPnL >= 0 ? (
              <TrendingUp className="text-white" size={20} />
            ) : (
              <TrendingDown className="text-white" size={20} />
            )}
            <span className="text-xl font-bold text-white">
              {totalPnL >= 0 ? '+' : ''}${Math.abs(totalPnL).toFixed(2)}
            </span>
            <span className="text-white/80">
              ({totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* الحيازات */}
        <h3 className="text-lg font-bold mb-3">{t('yourHoldings')}</h3>
        <div className="space-y-3 mb-6">
          {portfolio.map((holding, idx) => {
            const info = cryptoInfo[holding.crypto];
            const current = cryptoData[holding.crypto];
            const { pnl, percent } = calculatePnL(holding.crypto);

            return (
              <div key={idx} className="bg-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <p className="font-bold">{info.name}</p>
                      <p className="text-sm text-gray-400">{holding.amount} {info.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${(current?.price * holding.amount).toFixed(2)}
                    </p>
                    <p className={`text-sm ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>{t('purchasePrice')}: ${holding.buyPrice}</span>
                  <span className={pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {pnl >= 0 ? '+' : ''}{percent.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition">
          <Plus size={20} />
          {t('addNewCoin')}
        </button>
      </div>
    );
};

export default PortfolioScreen;
