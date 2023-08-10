import React from 'react'
import { View, StyleSheet } from 'react-native'
import CycleDisplayView from './CycleDisplayView'
import { MultimeterCycles } from '../../../../constants/global'
import { MultimeterCycleLabels } from '../../../../constants/labels'
import SevenSegmentView from '../../../../components/SevenSegmentDisplay'


const Display = ({ onOffCaptureActive, onOffCaptureAvailable, values }) => {
    if (onOffCaptureActive && onOffCaptureAvailable)
        return (
            <View style={styles.container}>
                <CycleDisplayView
                    label={MultimeterCycleLabels[MultimeterCycles.ON]}
                    value={values[MultimeterCycles.ON]}
                    icon='On' />
                <CycleDisplayView
                    label={MultimeterCycleLabels[MultimeterCycles.OFF]}
                    value={values[MultimeterCycles.OFF]}
                    icon='Off' />
            </View>
        )
    else return <SevenSegmentView
        value={values[null]} />
}

export default Display

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
})