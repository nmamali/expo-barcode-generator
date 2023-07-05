import {Rect} from "react-native-svg";
import PropTypes from "prop-types";

export const BarcodeChunk = ({binary, padding, options})=> {

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

BarcodeChunk.propTypes = {
    padding: PropTypes.number,
    binary: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.shape({
        textPosition: PropTypes.oneOf(["top", "bottom"]),
        fontSize: PropTypes.number,
        textMargin: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};