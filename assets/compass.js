import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

export const CompassBack = (props) => (
    <Svg
        id="Layer_1"
        x={0}
        y={0}
        viewBox="0 0 48 48"
        xmlSpace="preserve"
        style={props.style}
    >
        <Circle cx={24} cy={24} r={17} fill='none' />
        <Path
            fill={props.fill}
            d="M24 8c8.8 0 16 7.2 16 16s-7.2 16-16 16S8 32.8 8 24 15.2 8 24 8m0-2C14.1 6 6 14.1 6 24s8.1 18 18 18 18-8.1 18-18S33.9 6 24 6z" />
        <Path
            fill={props.northFill}
            d="M24 12.3c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5s.5.2.5.5v1c0 .2-.2.5-.5.5z"
        />
        <Path
            fill={props.fill}
            d="M24 37.8c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5s.5.2.5.5v1c0 .2-.2.5-.5.5zM10.3 24c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5s-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5zM35.8 24c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5s-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5zM14.3 33.7c-.2-.2-.2-.5 0-.7l.7-.7c.2-.2.5-.2.7 0s.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0zM32.3 15.7c-.2-.2-.2-.5 0-.7l.7-.7c.2-.2.5-.2.7 0s.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0zM14.3 14.3c.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7s-.5.2-.7 0l-.7-.7c-.2-.2-.2-.5 0-.7zM32.3 32.3c.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7s-.5.2-.7 0l-.7-.7c-.2-.2-.2-.5 0-.7z" />
    </Svg>
)

export const CompassDash = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 2"
        style={{
            enableBackground: "new 0 0 1 2",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <Path d="M.5 2C.2 2 0 1.8 0 1.5v-1C0 .2.2 0 .5 0s.5.2.5.5v1c0 .3-.2.5-.5.5z" />
    </Svg>
)