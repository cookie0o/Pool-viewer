export async function getReturnRate(currency: string): Promise<number | null> {
  const cacheKey = `monero_rate_${currency}`;
  const cached = localStorage.getItem(cacheKey);

  // Try to use cached data
  if (cached) {
    try {
      const { rate, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;

      if (age < 3600_000) {
        // Less than 1 hour old
        return rate;
      }
    } catch (e) {
      console.warn('Failed to parse cached rate:', e);
    }
  }

  // Fetch from API
  const apiEndpoint = `https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=${currency}`;

  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const rate = data?.monero?.[currency];

    if (rate !== undefined) {
      // Save to localStorage with timestamp
      localStorage.setItem(cacheKey, JSON.stringify({
        rate,
        timestamp: Date.now()
      }));
      return rate;
    }

    return null;
  } catch (error) {
    console.error('Error fetching Monero price:', error);
    return null;
  }
}
