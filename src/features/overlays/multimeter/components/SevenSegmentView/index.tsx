import React from 'react'
import { View, StyleSheet } from 'react-native'
import Point from './components/Point'
import Minus from './components/Minus'
import Digit from './components/Digit'
import { Text } from '@ui-kitten/components'

type Flag = 'OR' | 'OL' | null

type SevenSegmentViewProps = {
    value: number //measured float value
    flag: Flag // flag to display insted of value
    digits: number //number of digits on the display
    decimalMax: number //max number of decimal points to be displayed
    unit: string // unit displayed,
    width: number,
    height: number,
    color: string,
    offColor: string
}

const roundToDigits = (value: number, digits: number, decimalMax: number) => {
    const integerPartLength = Math.floor(Math.log10(Math.abs(value))) + 1
    if (integerPartLength > digits)
        return 'Err'.slice(0, digits)
    const decimalPlaces = digits - integerPartLength
    return value.toFixed(decimalPlaces > decimalMax ? decimalMax : decimalPlaces)
}

const valueToArray = (value: number, flag: Flag, digits: number, decimalMax: number) => {
    if (flag === 'OR')
        return 'or'
    if (flag === 'OL')
        return '0L'
    return roundToDigits(value, digits, decimalMax)
}

const addSign = (value: string) => {
    const isNegative = value[0] === '-'
    return isNegative ? value : '+' + value
}

const generateSpaces = (count: number) => new Array(count + 1).join('#')

const addSpaces = (value: string, digits: number) => {
    const trimmed = value.replace('.', '').replace('-', '')
    if (trimmed.length === digits)
        return value
    else {
        const numberOfMissingDigits = digits - trimmed.length
        return `${value[0]}${generateSpaces(numberOfMissingDigits)}${value.substring(1)}`
    }
}

const getSegmentSize = (digits: number, width: number, height: number) => {
    const hLength = digits * 1.5 + 2.5
    const vLength = 2
    const segmentSizeWithWidth = Math.round(width / hLength)
    const segmentSizeWithHeight = Math.round(height / vLength)
    const segmentSize = segmentSizeWithWidth < segmentSizeWithHeight ? segmentSizeWithWidth : segmentSizeWithHeight
    const rounded = Math.round(segmentSize)
    return {
        w: rounded,
    }
}


const renderSign = (isNegative: Boolean, w: number, color: string, key: number) => <Minus w={w} color={color} isVisible={isNegative} key={key} />

const renderPoint = (w: number, color: string, key: number) => <Point w={w} color={color} key={key} />

const renderDigit = (w: number, color: string, offColor: string, char: string, key: number) => <Digit
    key={key}
    w={w}
    offColor={offColor}
    color={color}
    value={char} />


const SevenSegmentView = ({ value, digits, flag, decimalMax, unit, width, height, color, offColor }: SevenSegmentViewProps): React.JSX.Element => {
    const { w } = getSegmentSize(digits, width, height)
    const array = addSpaces(addSign(valueToArray(value, flag, digits, decimalMax)), digits).split('')
    return (
        <View
            style={styles.container}>
            {array.map((char, index) => {
                switch (char) {
                    case '-':
                    case '+':
                        return renderSign(char === '-', w, color, index)
                    case '.':
                        return renderPoint(w, color, index)
                    default:
                        return renderDigit(w, color, offColor, char, index)
                }
            }
            )}
            <Text
                style={{ ...styles.unit, width: w, color: color, marginLeft: w / 2, fontSize: w/2, fontWeight: 'bold' }}>{unit}</Text>
        </View>
    )
}

export default SevenSegmentView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green'
    },
    unit: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})