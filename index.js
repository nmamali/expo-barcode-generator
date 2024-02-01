import Svg, { G } from 'react-native-svg';
import JSBarcode from 'jsbarcode';
import PropTypes from 'prop-types';

import {
  getMaximumHeightOfEncodings,
  getTotalWidthOfEncodings,
  merge,
  calculateEncodingAttributes
} from './services';
import { Background, BarcodeChunk, BarcodeText } from './components';

export const Barcode = ({ value, options, rotation }) => {
  const barcode = {};
  const defaultOptions = {
    background: '#ffffff',
    displayValue: true,
    fontOptions: 'bold',
    fontSize: 20,
    height: 100,
    lineColor: '#000000',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    textAlign: 'center',
    textMargin: 2,
    textPosition: 'bottom',
    width: 2
  };
  JSBarcode(barcode, value, options);
  const encodings = barcode.encodings;
  const mergedOptions = merge(defaultOptions, options);

  calculateEncodingAttributes(encodings, mergedOptions);
  const totalWidth = getTotalWidthOfEncodings(encodings);
  const maxHeight = getMaximumHeightOfEncodings(encodings);
  const width = totalWidth + mergedOptions.marginLeft + mergedOptions.marginRight;

  const xs = [mergedOptions.marginLeft];
  encodings.forEach(e => xs.push(xs[xs.length - 1] + e.width));

  return (
    <Svg
      x={0}
      y={0}
      width={width}
      height={maxHeight}
      viewBox={`0 0 ${width} ${maxHeight}`}
      originX={0}
      originY={0}
      rotation={rotation}
    >
      {options.background && (
        <Background width={width} height={maxHeight} color={options.background} />
      )}
      {encodings.map((encoding, i) => {
        const encodingOptions = merge(options, encoding.options);

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

Barcode.propTypes = {
  rotation: PropTypes.number,
  options: PropTypes.object,
  value: PropTypes.string.isRequired
};
