import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SevenSegmentDisplay from 'rn-seven-segment-display'
import { basic, basic1000, basic1100, basic200, basic300, basic400, control, primary } from '../../styles/colors'
import Point from './components/Point'
import Minus from './components/Minus'


const getPointIndex = (valueString) => {
    const index = valueString.indexOf(".")
    return ~index ? index : 0
}

const convertValue = (value) => {
    if (value === null || value === undefined || Number(value) === NaN)
        return 0
    else return value

}

const width = Math.floor(Dimensions.get('window').width / 14)
const height = Math.floor(Dimensions.get('window').width / 28)

const SevenSegmentView = ({ value = 0, onColor, size, overRange }) => {
    const converted = convertValue(value)
    const valueString = converted.toFixed(4).slice(0, 6)
    const isNegative = !overRange ? ~valueString.indexOf('-') : false
    const number = valueString.replace('-', '')
    const pointIndex = overRange ? 0 : getPointIndex(number)
    const digits = number.replace('.', '')
    const w = size === 'small' ? (width / 2.5) : width
    const h = size === 'small' ? (height / 2.5) : height

    const values = !overRange ? Array.apply(null, new Array(4)).map((_, index) => digits[index] ?? '-') : ['e', 'r', 'r', '_']
    return (
        <View
            style={styles.container}>
            <Minus
                onColor={onColor ?? basic1000}
                width={w}
                height={h}
                isOn={isNegative} />
            {values.map((char, index) => (
                <React.Fragment key={index}>
                    {index !== 0 ?
                        <Point
                            onColor={onColor ?? basic1000}
                            width={w}
                            height={h}
                            isOn={index === pointIndex} />
                        : null
                    }
                    <SevenSegmentDisplay
                        width={w}
                        height={h}
                        onColor={onColor ?? basic1000}
                        offColor={control}
                        value={String(char)} />
                </React.Fragment>
            )
            )}
        </View>
    )
}

export default SevenSegmentView

const styles = StyleSheet.create({
    container: {
        backgroundColor: control,
        flexDirection: "row",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})