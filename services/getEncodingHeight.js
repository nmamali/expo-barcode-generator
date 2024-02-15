export const getEncodingHeight = (encoding, options) =>
  options.height +
  (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) +
  options.marginTop +
  options.marginBottom;
