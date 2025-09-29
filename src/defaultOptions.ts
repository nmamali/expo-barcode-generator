import type { BarcodeOptions } from './types';

const defaultOptions = {
  background: '#ffffff',
  displayValue: true as boolean,
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
} satisfies BarcodeOptions;
export default defaultOptions;
