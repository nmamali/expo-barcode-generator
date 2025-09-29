import type { Encoding, InternalOptions } from '../types';

export function getEncodingHeight(encoding: Encoding, options: InternalOptions) {
  return (
    options.height +
    (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) +
    options.marginTop +
    options.marginBottom
  );
}
