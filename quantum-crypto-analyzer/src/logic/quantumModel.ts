// This file will contain the logic for the new Quantum Information Model for Financial Markets.

/**
 * Estimates the bullish, neutral, and bearish probabilities from historical price data.
 * @param prices - An array of historical prices.
 * @returns An object containing the bullish, neutral, and bearish probabilities.
 */
export const estimateProbabilities = (prices) => {
  if (prices.length < 2) {
    return { bullish: 0.33, neutral: 0.34, bearish: 0.33 };
  }

  let bullish = 0;
  let neutral = 0;
  let bearish = 0;

  for (let i = 1; i < prices.length; i++) {
    const change = (prices[i][1] - prices[i-1][1]) / prices[i-1][1];
    if (change > 0.001) {
      bullish++;
    } else if (change < -0.001) {
      bearish++;
    } else {
      neutral++;
    }
  }

  const total = prices.length - 1;
  return {
    bullish: bullish / total,
    neutral: neutral / total,
    bearish: bearish / total,
  };
};

/**
 * Calculates the Von Neumann Entropy of the market.
 * @param prices - An array of historical prices.
 * @returns The Von Neumann Entropy.
 */
export const calculateVonNeumannEntropy = (prices) => {
  const { bullish, neutral, bearish } = estimateProbabilities(prices);
  const eigenvalues = [bullish, neutral, bearish];
  return -eigenvalues.reduce((acc, lambda) => {
    if (lambda === 0) return acc;
    return acc + lambda * Math.log(lambda);
  }, 0);
};

/**
 * Calculates the Price Curvature.
 * @param prices - An array of historical prices.
 * @returns The Price Curvature.
 */
export const calculatePriceCurvature = (prices) => {
  if (prices.length < 3) return 0;

  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push(Math.log(prices[i][1] / prices[i - 1][1]));
  }

  if (returns.length < 2) return 0;

  const curvature = Math.abs(returns[returns.length - 1] - returns[returns.length - 2]);
  return curvature;
};

/**
 * Calculates the Information Gradient.
 * @param volumes - An array of historical trading volumes.
 * @returns The Information Gradient.
 */
export const calculateInformationGradient = (volumes) => {
  if (volumes.length < 2) return 0;

  const latestVolume = volumes[volumes.length - 1][1];
  const previousVolume = volumes[volumes.length - 2][1];

  if (previousVolume === 0) return 0;

  return (Math.log(latestVolume) - Math.log(previousVolume));
};

/**
 * Calculates the final Ψ value.
 * @param historicalData - An object containing historical prices and volumes.
 * @returns The Ψ value.
 */
export const calculatePsi = (historicalData) => {
  const { prices, total_volumes } = historicalData;

  if (!prices || prices.length < 2 || !total_volumes || total_volumes.length < 2) {
    return 0;
  }

  const beta = 0.1; // Memory decay rate
  const lambda = 1.0; // Information damping factor
  let psi = 0;

  // We will use a 7-day window for the calculation
  const window = 7;
  const startIndex = Math.max(0, prices.length - window);

  for (let i = startIndex; i < prices.length; i++) {
    const t_i = prices[i][0];
    const t_n = prices[prices.length - 1][0];

    const weight = Math.exp(-beta * (t_n - t_i) / (1000 * 3600 * 24)); // Normalize to days

    const S = calculateVonNeumannEntropy(prices.slice(0, i + 1));
    const R = calculatePriceCurvature(prices.slice(0, i + 1));
    const gradI = calculateInformationGradient(total_volumes.slice(0, i + 1));

    psi += weight * S * R * Math.exp(-lambda * Math.abs(gradI));
  }

  return psi;
};
