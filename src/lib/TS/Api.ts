import { renderRigs } from "$lib/TS/RenderRigs";

let miner_count: number = 0

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
  const storedTimestamp = localStorage.getItem('dataTimestamp_XMRPOOLEU');
  const currentTime = Date.now();

  try {
    // Check if stored data is avalable if not fetch
    const XMRPOOLEU_data = localStorage.getItem('XMRPOOLEU');
    if (!XMRPOOLEU_data) {
      const response = await fetch(apiEndpoint);
      data = await response.json();
    } else {
      var data = JSON.parse(localStorage.getItem('XMRPOOLEU') || "").data;
    }
    // Check if stored data is older than 5 minutes
    if (storedTimestamp && currentTime - parseInt(storedTimestamp) < 5 * 60 * 1000) {
      // Check if the address changed
      if ((localStorage.getItem("address") || "") !== data.address) {
        const response = await fetch(apiEndpoint);
        data = await response.json();
      }
      console.log("Data not 5 minutes old, using old data.")
    } else {
      const response = await fetch(apiEndpoint);
      data = await response.json();
    }

    if (data.stats) {
      const balance = (parseFloat(data.stats.balance) / 1e12).toFixed(7);
      const hashrate = data.stats.hashrate || "0";
      const payments = data.stats.paid || "";

      // If perWorkerStats exists and is an array, process it
      const perWorkerStats = data.perWorkerStats && Array.isArray(data.perWorkerStats)
        ? data.perWorkerStats
        : [];

      const json = {
        balance,
        hashrate,
        payments,
        perWorkerStats,
        timestamp: currentTime.toString(),
        data,
        address
      };

      // Store the data in localStorage
      localStorage.setItem('XMRPOOLEU', JSON.stringify(json));
      localStorage.setItem('dataTimestamp_XMRPOOLEU', currentTime.toString());
      console.log("Fetched new data. XMRPOOLEU");

      // render miners and return count
      miner_count = (renderRigs(json)); // Pass the whole json object to renderRigs
      return miner_count;
    } else {
      console.error('Invalid data structure: XMRPOOLEU', data);
    }

    return null;
  } catch (error) {
    console.error('Error fetching Monero data: XMRPOOLEU', error);
    return null;
  }
}
