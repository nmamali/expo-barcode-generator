import {Rect} from "react-native-svg";
import PropTypes from "prop-types";

export const Background = ({width, height, color}) => {

    return <Rect x={0} y={0} width={width} height={height} style={{ fill: color }} />;
};

Background.propTypes = {
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};