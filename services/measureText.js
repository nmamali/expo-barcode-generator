export const measureText = (string, options, context) => {
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
};
