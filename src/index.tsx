import Svg, { G } from 'react-native-svg';
import JSBarcode from 'jsbarcode';

import { BarcodeChunk, BarcodeText } from './components';
import {
  getMaximumHeightOfEncodings,
  getTotalWidthOfEncodings,
  calculateEncodingAttributes
} from './services';
import defaultOptions from './defaultOptions';
import type { BarcodeData, BarcodeOptions, Encoding } from './types';

export interface BarcodeProps {
  value: string;
  options?: BarcodeOptions;
  rotation?: number;
}

export const Barcode = ({ value, options, rotation }: BarcodeProps) => {
  const barcode = {};
  JSBarcode(barcode, value, options);
  const encodings: Encoding[] = (barcode as BarcodeData).encodings;
  const mergedOptions = { ...defaultOptions, ...options };

  const measuredEncoding = calculateEncodingAttributes(encodings, mergedOptions);
  const totalWidth = getTotalWidthOfEncodings(measuredEncoding);
  const maxHeight = getMaximumHeightOfEncodings(measuredEncoding);
  const width = totalWidth + mergedOptions.marginLeft + mergedOptions.marginRight;

  const xs = [mergedOptions.marginLeft];
  measuredEncoding.forEach(e => xs.push(xs[xs.length - 1] + e.width));

  return (
    <Svg
      width={width}
      height={maxHeight}
      rotation={rotation}
      style={{ backgroundColor: mergedOptions.background }}
    >
      {measuredEncoding.map((encoding, i) => {
        const encodingOptions = { ...mergedOptions, ...encoding.options };

        return (
          <G key={i} x={xs[i]} y={encodingOptions.marginTop} fill={encodingOptions.lineColor}>
            <BarcodeChunk
              binary={encoding.data}
              padding={encoding.barcodePadding}
              options={encodingOptions}
            />
            <BarcodeText
              text={encoding.text}
              width={encoding.width}
              padding={encoding.barcodePadding}
              options={encodingOptions}
            />
          </G>
        );
      })}
    </Svg>
  );
};
