import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { MultimeterSettingContext } from '../context/MultimeterSettings'
import StandardCycleToken from './StandardCycleToken'
import { TimeUnitLabels } from '../../../../../constants/labels'
import { standardCycleTimes } from '../helpers/constants'
import Input from '../../../../../components/Input'
import { TimeUnits } from '../../../../../constants/global'


const CycleSelectionView = () => {
    const {
        setStandardCycleTime,
        onOnCycleChanged,
        onOffCycleChanged,
        validateEntry,
        onTime,
        offTime,
        onOffCaptureActive } = useContext(MultimeterSettingContext)
    const disabled = !onOffCaptureActive
    return (
        <View
            style={styles.container}>
            <Text
                category='label'
                appearance='hint'>
                Interruption cycle duration (ON | OFF)
            </Text>
            <View
                style={styles.tokens}>
                {standardCycleTimes.map(({ on, off, title }) =>
                    <StandardCycleToken
                        disabled={disabled}
                        key={title}
                        title={title}
                        checked={onTime.value === on && offTime.value === off}
                        setStandardCycle={setStandardCycleTime}
                        on={on}
                        off={off} />)}
            </View>
            <View
                style={styles.row}>
                <Input
                    disabled={disabled}
                    onChangeText={onOnCycleChanged}
                    onEndEditing={validateEntry}
                    style={styles.left}
                    label='On'
                    property='cycleTime'
                    unit={TimeUnitLabels[TimeUnits.MILISECONDS]}
                    value={onTime.value}
                    valid={onTime.valid} />
                <Input
                    disabled={disabled}
                    onChangeText={onOffCycleChanged}
                    onEndEditing={validateEntry}
                    style={styles.right}
                    label='Off'
                    property='cycleTime'
                    unit={TimeUnitLabels[TimeUnits.MILISECONDS]}
                    value={offTime.value}
                    valid={offTime.valid} />
            </View>
        </View>
    )
}


export default CycleSelectionView

const styles = StyleSheet.create({
    container: {
        paddingBottom: 6
    },
    tokens: {
        paddingTop: 6,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingBottom: 12
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    left: {
        flex: 1,
        paddingRight: 12,
    },
    right: {
        flex: 1,
        paddingLeft: 12,
    }
})