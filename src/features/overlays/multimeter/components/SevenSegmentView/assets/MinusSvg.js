import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MinusSvg = ({ segmentWidth, color }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            enableBackground: "new 0 0 96 32",
        }}
        viewBox="0 0 96 32"
        width={segmentWidth}
        height={Math.round(segmentWidth / 4)}>
        <Path
            d="M96 16 80 32H16L0 16 16 0h64z"
            style={{
                fill: color,
            }}
        />
    </Svg>
)
export default MinusSvg
