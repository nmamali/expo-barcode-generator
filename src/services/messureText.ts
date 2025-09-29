import type { InternalOptions } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function messureText(string: string, options: InternalOptions, context?: any) {
  let ctx;

  if (context) {
    ctx = context;
  } else {
    return 0;
  }
  ctx.font = options.fontOptions + ' ' + options.fontSize + 'px ' + options.font;

  // Calculate the width of the encoding
  const size = ctx.measureText(string).width;

  return size;
}
