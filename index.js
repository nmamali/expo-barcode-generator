import Svg, { G, Rect, Text } from 'react-native-svg';
import JSBarcode from 'jsbarcode';

/* Based on JsBarcode's svg.js etc. */

const merge = (old, replaceObj) => ({ ...old, ...replaceObj });

function getEncodingHeight(encoding, options) {
  return (
    options.height +
    (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) +
    options.marginTop +
    options.marginBottom
  );
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
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

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
  for (let i = 0; i < encodings.length; i++) {
    const encoding = encodings[i];
    const options = merge(barcodeOptions, encoding.options);

    // Calculate the width of the encoding
    var textWidth;
    if (options.displayValue) {
      textWidth = messureText(encoding.text, options, context);
    } else {
      textWidth = 0;
    }

    const barcodeWidth = encoding.data.length * options.width;
    encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

    encoding.height = getEncodingHeight(encoding, options);

    encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
  }
}

function getTotalWidthOfEncodings(encodings) {
  let totalWidth = 0;
  for (let i = 0; i < encodings.length; i++) {
    totalWidth += encodings[i].width;
  }
  return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
  let maxHeight = 0;
  for (let i = 0; i < encodings.length; i++) {
    if (encodings[i].height > maxHeight) {
      maxHeight = encodings[i].height;
    }
  }
  return maxHeight;
}

function messureText(string, options, context) {
  let ctx;

  if (context) {
    ctx = context;
    // } else if (typeof document !== "undefined") {
    //   ctx = document.createElement("canvas").getContext("2d");
  } else {
    // If the text cannot be messured we will return 0.
    // This will make some barcode with big text render incorrectly
    return 0;
  }
  ctx.font = options.fontOptions + ' ' + options.fontSize + 'px ' + options.font;

  // Calculate the width of the encoding
  const size = ctx.measureText(string).width;

  return size;
}

const Background = props => {
  const { width, height, color } = props;

  return <Rect x={0} y={0} width={width} height={height} style={{ fill: color }} />;
};

function BarcodeChunk(props) {
  const { binary, padding, options } = props;

  // Creates the barcode out of the encoded binary
  let yFrom;
  if (options.textPosition == 'top') {
    yFrom = options.fontSize + options.textMargin;
  } else {
    yFrom = 0;
  }

  let barWidth = 0;
  let x = 0;
  const bars = [];
  for (let b = 0; b < binary.length; b++) {
    x = b * options.width + padding;

    if (binary[b] === '1') {
      barWidth++;
    } else if (barWidth > 0) {
      bars.push({
        x: x - options.width * barWidth,
        y: yFrom,
        width: options.width * barWidth,
        height: options.height
      });
      barWidth = 0;
    }
  }

  // Last draw is needed since the barcode ends with 1
  if (barWidth > 0) {
    bars.push({
      x: x - options.width * (barWidth - 1),
      y: yFrom,
      width: options.width * barWidth,
      height: options.height
    });
  }

  return bars.map((bar, i) => (
    <Rect key={i} x={bar.x} y={bar.y} width={bar.width} height={bar.height} />
  ));
}

const BarcodeText = props => {
  const { text, width, padding, options } = props;

  // Draw the text if displayValue is set
  if (options.displayValue) {
    let x, y, textAnchor;

    if (options.textPosition == 'top') {
      y = options.fontSize - options.textMargin;
    } else {
      y = options.height + options.textMargin + options.fontSize;
    }

    // Draw the text in the correct X depending on the textAlign option
    if (options.textAlign == 'left' || padding > 0) {
      x = 0;
      textAnchor = 'start';
    } else if (options.textAlign == 'right') {
      x = width - 1;
      textAnchor = 'end';
    }
    // In all other cases, center the text
    else {
      x = width / 2;
      textAnchor = 'middle';
    }

    return (
      <Text
        x={x}
        y={y}
        fontSize={options.fontSize}
        fontWeight="bold"
        textAnchor={textAnchor}
        fill={options.lineColor}
      >
        {text}
      </Text>
    );
  } else {
    return null;
  }
};

const Barcode = ({ value, options, rotation }) => {
  const barcode = {};

  JSBarcode(barcode, value, options);
  const encodings = barcode.encodings;

  const defaults = {
    width: 2,
    height: 100,
    // format: "auto",
    displayValue: true,
    fontOptions: 'bold',
    text: '',
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 20,
    background: '#ffffff',
    lineColor: '#000000',
    // margin: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
    // valid: function(){}
  };
  const mergedOptions = merge(defaults, options);

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

export default Barcode;
