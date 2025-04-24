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
