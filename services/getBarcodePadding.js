export function getBarcodePadding(textWidth, barcodeWidth, options) {
  if (options.displayValue && barcodeWidth < textWidth) {
    if (options.textAlign == 'center') {
      return Math.floor((textWidth - barcodeWidth) / 2);
    } else if (options.textAlign == 'left') {
      return 0;
    } else if (options.textAlign == 'right') {
      return Math.floor(textWidth - barcodeWidth);
    }
  }
  return 0;
}
