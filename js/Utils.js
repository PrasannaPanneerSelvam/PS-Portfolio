// Only happy flow
export function hexToRGBArray(str) {
  str = str.slice(1).toLowerCase();

  const hexMap = '0123456789abcdef';

  const result = [];
  for (let idx = 0; idx < 6; idx += 2) {
    const firstIndex = hexMap.indexOf(str[idx]),
      secondIndex = hexMap.indexOf(str[idx + 1]);

    result.push(16 * firstIndex + secondIndex);
  }

  return result;
}
