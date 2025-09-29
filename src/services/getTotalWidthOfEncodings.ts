import type { MeasuredEncoding } from '../types';

export function getTotalWidthOfEncodings(encodings: MeasuredEncoding[]) {
  let totalWidth = 0;
  for (let i = 0; i < encodings.length; i++) {
    totalWidth += encodings[i].width;
  }
  return totalWidth;
}
