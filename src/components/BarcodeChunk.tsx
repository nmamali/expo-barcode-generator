import { G, Rect } from 'react-native-svg';
import type { InternalOptions } from '../types';
import { getBarsFromBinary } from '../services/getBarsFromBinary';

interface BarcodeChunkProps {
  binary: string;
  padding: number;
  options: InternalOptions;
}

export const BarcodeChunk = ({ binary, padding, options }: BarcodeChunkProps) => {
  const bars = getBarsFromBinary(binary, options.width);
  const y = options.textPosition == 'top' ? options.fontSize + options.textMargin : 0;

  return (
    <G x={padding}>
      {bars.map((bar, i) => (
        <Rect key={i} x={bar.x} y={y} width={bar.width} height={options.height} />
      ))}
    </G>
  );
};
