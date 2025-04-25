// format hash rate for better readability
export function formatHashrate(hashrate: number): string {
  if (hashrate >= 1000000) {
    return (hashrate / 1000000).toFixed(2) + ' MH/s';
  } else if (hashrate >= 1000) {
    return (hashrate / 1000).toFixed(2) + ' KH/s';
  } else {
    return hashrate.toFixed(2) + ' H/s';
  }
}

// trim a string after x chars and add "..." to the end
export function trimString_x(inputString: string, length: number): string {
  if (inputString.length > length) {
    return inputString.substring(0, length) + "...";
  } else {
    return inputString;
  }
}

export function format_UNIX_time(time: number, mode: 'ago' | 'accurate'): string {
  const timestampMs = time * 1000;

  if (mode === 'ago') {
    const now = new Date();
    const past = new Date(timestampMs);
    const diffMs = now.getTime() - past.getTime();

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    const milliseconds = diffMs % 1000;

    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (seconds > 0) {
      return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else {
      return `${milliseconds} millisecond${milliseconds === 1 ? '' : 's'} ago`;
    }
  }

  if (mode === 'accurate') {
    const date = new Date(timestampMs);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  throw new Error("Invalid mode: must be 'ago' or 'accurate'");
}

export function unformatHashrate(hashrateStr: string | undefined): number {
  if (!hashrateStr) return 0;

  const unitMultipliers: Record<string, number> = {
    H: 1,
    KH: 1e3,
    MH: 1e6,
    GH: 1e9,
    TH: 1e12,
    PH: 1e15
  };

  const parts = hashrateStr.trim().split(' ');
  if (parts.length !== 2) return 0;

  const [valueStr, unit] = parts;
  const multiplier = unitMultipliers[unit.toUpperCase()];
  const value = parseFloat(valueStr);

  if (isNaN(value) || multiplier === undefined) return 0;

  return Math.round(value * multiplier);
}

export function removePercentage(combined: string | undefined): number {
  if (!combined) return 0;

  const [value] = combined.trim().split(' ');
  const numericValue = parseInt(value, 10);

  return isNaN(numericValue) ? 0 : numericValue;
}