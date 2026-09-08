import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import { basic300, success } from '../../../../styles/colors'

const CircularProgress = ({ progress, size = 140, strokeWidth = 6 }) => {
    const value = Number.isFinite(progress)
        ? Math.min(Math.max(progress, 0), 1)
        : 0
    const center = size / 2
    const radius = center - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - value)

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={StyleSheet.absoluteFillObject}>
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill='none'
                    stroke={basic300}
                    strokeWidth={strokeWidth} />
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill='none'
                    stroke={success}
                    strokeWidth={strokeWidth}
                    strokeLinecap='round'
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    rotation='-90'
                    origin={`${center}, ${center}`} />
                <SvgText
                    x={center}
                    y={center}
                    dy='0.35em'
                    fill={success}
                    fontSize={18}
                    textAnchor='middle'>
                    {`${Math.round(value * 100)}%`}
                </SvgText>
            </Svg>
        </View>
    )
}

export default CircularProgress

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
})
