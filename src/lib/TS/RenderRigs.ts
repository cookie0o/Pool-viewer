interface WorkerStats {
  workerId: string;
  hashrate?: string;
  hashes: number;
  expired?: string;
  invalid?: string;
  lastShare: number;
}

interface WalletDetails {
  perWorkerStats: WorkerStats[];
}

import { 
  format_UNIX_time,
  trimString_x,
  unformatHashrate,
  removePercentage 
} from "$lib/TS/Functions";

let miner_count:number = 0

/**
 * Render rig stats into the DOM (expects #miner-container to exist).
 */
export function renderRigs(walletDetails: WalletDetails) {
  if (!walletDetails?.perWorkerStats?.length) return 0;

  const container = document.getElementById("miner-container");
  if (!container) return 0;

  // Sort workers by user-selected order
  const SortingOrder = localStorage.getItem("sortingOrder");

  walletDetails.perWorkerStats.sort((a, b) => {
    switch (SortingOrder) {
      case "1": return unformatHashrate(b.hashrate || "0 H") - unformatHashrate(a.hashrate || "0 H");
      case "2": return b.hashes - a.hashes;
      case "3": return removePercentage(b.expired || "0%") - removePercentage(a.expired || "0%");
      case "4": return removePercentage(b.invalid || "0%") - removePercentage(a.invalid || "0%");
      case "5": return b.lastShare - a.lastShare;
      default: return 0 - unformatHashrate(a.hashrate || "0.00 H");
    }
  });

  // Clear previous content
  container.innerHTML = "";

  for (const worker of walletDetails.perWorkerStats) {
    miner_count =+ 1 
    const {
      workerId,
      hashrate,
      hashes,
      expired,
      invalid,
      lastShare
    } = worker;

    const isActive = hashrate !== undefined;
    const hashrateDisplay = isActive ? hashrate : "0.00 H";

    // Calculate counts and percentages
    const invalidCount = invalid ? parseInt(invalid) : 0;
    const expiredCount = expired ? parseInt(expired) : 0;

    // Combine invalid and expired counts
    const combinedInvalidExpiredCount = invalidCount + expiredCount;

    const validHashes = hashes - invalidCount;
    const expiredValidHashes = hashes - expiredCount;

    const combinedPercent = validHashes > 0 ? (combinedInvalidExpiredCount / (validHashes + expiredValidHashes) * 100).toFixed(2) : "0.00";

    const workerIdDisplay = trimString_x(workerId, 10);
    const lastShareDisplay = format_UNIX_time(lastShare, "ago");

    const rigBlock = document.createElement("div");
    rigBlock.className = "miner-block preset-filled-surface-100-900";

    rigBlock.innerHTML = `
      <div style="margin-top: 0px; border-radius: 5px; height: 35px; display: flex; justify-content: center; align-items: center;" class="preset-filled-surface-100-900">
        <div class="grid grid-cols-6 gap-4 w-full text-center">
          <div style="display: flex; justify-content: center; align-items: center;">
            <p style="margin: 0;">xmrpool.eu</p>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <p style="margin: 0;">${workerIdDisplay}</p>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <p style="margin: 0;">${hashrateDisplay}/s</p>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <p style="margin: 0;">${hashes}</p>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <p style="margin: 0;">${combinedInvalidExpiredCount} (${combinedPercent}%)</p>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <p style="margin: 0;">${lastShareDisplay}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(rigBlock);
  }
  // return miner count
  return miner_count
}