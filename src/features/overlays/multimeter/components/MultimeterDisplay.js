import React from 'react'
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from 'react-native'
import SevenSegmentView from './SevenSegmentView'
import { basic1000, basic200, control, primary } from '../../../../styles/colors'
import { MultimeterReadingTypes } from '../../../../constants/global'
import { CurrentUnitLabels, PotentialUnitLabels } from '../../../../constants/labels'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const getUnitLabel = (type, unit) => {
    switch (type) {
        case MultimeterReadingTypes.CURRENT:
            return CurrentUnitLabels[unit]
        case MultimeterReadingTypes.VOLTAGE:
            return PotentialUnitLabels[unit]
        default:
            return ''
    }
}

const MultimeterDisplay = ({ reading }) => {
    const { height, width } = useWindowDimensions()
    const insets = useSafeAreaInsets()
    const maxHeight = 180
    const heightOfOthers = 272 + insets.top
    if (reading !== null)
        return (
            <View style={styles.container}>
                <SevenSegmentView
                    value={reading.value}
                    digits={4}
                    flag={reading.flag}
                    decimalMax={3}
                    unit={getUnitLabel(reading.type, reading.unit)}
                    width={width - 24}
                    height={height - heightOfOthers >= maxHeight ? maxHeight : height - heightOfOthers}
                    color={basic1000}
                    offColor={control} />
            </View>
        )
    else return <ActivityIndicator color={primary} />

}


export default React.memo(MultimeterDisplay)

const styles = StyleSheet.create({
    container: {
        marginVertical: 24
    },
})