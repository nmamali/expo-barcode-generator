import { messureText } from './messureText';
import { getBarcodePadding } from './getBarcodePadding';
import { getEncodingHeight } from './getEncodingHeight';
import type { Encoding, InternalOptions, MeasuredEncoding } from '../types';

export function calculateEncodingAttributes(
  encodings: Encoding[],
  barcodeOptions: InternalOptions
) {
  return encodings.map<MeasuredEncoding>(encoding => {
    const options = { ...barcodeOptions, ...encoding.options };

    // Calculate the width of the encoding
    let textWidth;
    if (options.displayValue) {
      textWidth = messureText(encoding.text, options);
    } else {
      textWidth = 0;
    }

    const barcodeWidth = encoding.data.length * options.width;
    return {
      ...encoding,
      width: Math.ceil(Math.max(textWidth, barcodeWidth)),
      height: getEncodingHeight(encoding, options),
      barcodePadding: getBarcodePadding(textWidth, barcodeWidth, options)
    };
  });
}
