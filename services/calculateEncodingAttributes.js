import { merge } from './merge';
import { measureText } from './measureText';
import { getBarcodePadding } from './getBarcodePadding';
import { getEncodingHeight } from './getEncodingHeight';

export const calculateEncodingAttributes = (encodings, barcodeOptions, context) => {
  for (let i = 0; i < encodings.length; i++) {
    const encoding = encodings[i];
    const options = merge(barcodeOptions, encoding.options);

    // Calculate the width of the encoding
    let textWidth;
    if (options.displayValue) {
      textWidth = measureText(encoding.text, options, context);
    } else {
      textWidth = 0;
    }

    const barcodeWidth = encoding.data.length * options.width;
    encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

    encoding.height = getEncodingHeight(encoding, options);

    encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
  }
};
