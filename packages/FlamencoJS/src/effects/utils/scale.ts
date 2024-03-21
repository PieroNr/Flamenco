/**
 * Scales a value from 0 to 1 to a range of min to max.
 */
export function scale(value: number, {min, max}: {min: number, max: number}): number {
  return value * (max - min) + min;
}