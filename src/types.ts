import type JSBarcode from 'jsbarcode';
import type defaultOptions from './defaultOptions';

export type BarcodeOptions = JSBarcode.Options & {
  textPosition?: 'top' | 'bottom';
  textAlign?: 'left' | 'right' | 'center';
};

export type InternalOptions = BarcodeOptions &
  Required<Pick<BarcodeOptions, keyof typeof defaultOptions>>;

/** Derived from `jsbarcode` */
export interface Encoding {
  data: string;
  options: BarcodeOptions;
  text: string;
}

export interface BarcodeData {
  encodings: Encoding[];
}

export interface MeasuredEncoding extends Encoding {
  width: number;
  height: number;
  barcodePadding: number;
}
