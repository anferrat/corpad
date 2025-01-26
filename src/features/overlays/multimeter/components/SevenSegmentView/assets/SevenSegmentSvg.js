import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SevenSegmentSvg = ({ a, b, c, d, e, f, g, onColor, offColor, segmentWidth }) => {
    const getColor = React.useCallback((x) => x ? onColor : offColor, [onColor, offColor])
    return < Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{ enableBackground: "new 0 0 162 290" }}
        viewBox="0 0 162 290"
        width={segmentWidth}
        height={Math.round(1.79012345679 * segmentWidth)}
    >
        <Path
            d="M17 17 33 1h96l16 16-16 16H33z"
            style={{
                fill: getColor(a), //a
                stroke: offColor,
                strokeWidth: 2,
                strokeMiterlimit: 10,
            }}
        />
        <Path
            d="m145 17 16 16v96l-16 16-16-16V33z"
            style={{
                fill: getColor(b), //b
                stroke: offColor,
                strokeWidth: 2,
                strokeMiterlimit: 10,
            }}
        />
        <Path
            d="m145 145 16 16v96l-16 16-16-16v-96z"
            style={{
                fill: getColor(c),//c
                stroke: offColor,
                strokeWidth: 2,
            }}
        />
        <Path
            d="m145 273-16 16H33l-16-16 16-16h96z"
            style={{
                fill: getColor(d),//d
                stroke: offColor,
                strokeWidth: 2,
            }}
        />
        <Path
            d="M17 273 1 257v-96l16-16 16 16v96z"
            style={{
                fill: getColor(e),//e
                stroke: offColor,
                strokeWidth: 2,
            }}
        />
        <Path
            d="M17 145 1 129V33l16-16 16 16v96z"
            style={{
                fill: getColor(f), //f
                stroke: offColor,
                strokeWidth: 2,
            }}
        />
        <Path
            d="m17 145 16-16h96l16 16-16 16H33z"
            style={{
                fill: getColor(g),//g
                stroke: offColor,
                strokeWidth: 2,
            }}
        />
    </Svg >
}

export default SevenSegmentSvg