import {
  formatHashrate
} from "$lib/TS/Functions";

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

export async function getdataXMRPOOLEU(address: string): Promise<number | null> {
  const apiEndpoint = `https://web.xmrpool.eu:8119/stats_address?address=${address}&longpoll=false`;
  const storedTimestamp = localStorage.getItem('dataTimestamp');
  const currentTime = Date.now();

  // Check if stored data is older than 5 minutes
  if (storedTimestamp && currentTime - parseInt(storedTimestamp) < 5 * 60 * 1000) {
    console.log('Data is less than 5 minutes old, using cached data.');
    return null; // Return null or the cached balance if needed
  }

  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    // Ensure the data contains the expected stats and balances
    if (data.stats) {
      // balance
      const balance = (parseFloat(data.stats.balance) / 1000000000000).toFixed(7);
      localStorage.setItem('balance', balance);

      // hashrate
      const hashrate = formatHashrate(parseInt(data.stats.hashrate || "0"))
      localStorage.setItem('hashrate', hashrate);

      // Save the current timestamp
      localStorage.setItem('dataTimestamp', currentTime.toString());
      console.log('Fetched new data and saved balance:', balance);
    } else {
      console.error('Invalid data structure:', data);
    }

    return null; 
  } catch (error) {
    console.error('Error fetching Monero data:', error);
    return null;
  }
}

