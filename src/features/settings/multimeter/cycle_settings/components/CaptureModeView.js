import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import CheckBoxListItem from './CheckBoxListItem'
import TimeSyncCaptureView from './TimeSyncCaptureView'
import { MultimeterSyncModes } from '../../../../../constants/global'
import { MultimeterSyncModeLabels } from '../../../../../constants/labels'
import { MultimeterSettingContext } from '../context/MultimeterSettings'



const CaptureModeView = () => {
    const { onSyncModeChange, syncMode, onOffCaptureActive } = useContext(MultimeterSettingContext)
    const disabled = !onOffCaptureActive
    if (!disabled)
        return (
            <View
                style={styles.container}>
                <Text
                    style={styles.title}
                    category='label'
                    appearance='hint'>
                    Cycle detection method
                </Text>
                <CheckBoxListItem
                    disabled={disabled}
                    checked={syncMode === MultimeterSyncModes.GPS}
                    value={MultimeterSyncModes.GPS}
                    onPress={onSyncModeChange}
                    title={MultimeterSyncModeLabels[MultimeterSyncModes.GPS]}
                    description='Reporst captured values at the begining of ON and OFF cycles. Uses GPS or NTP to syncronize with global time. Cycle must start at the begining of a minute.' />
                <TimeSyncCaptureView />
                <CheckBoxListItem
                    disabled={disabled}
                    checked={syncMode === MultimeterSyncModes.HIGH_LOW}
                    value={MultimeterSyncModes.HIGH_LOW}
                    title={MultimeterSyncModeLabels[MultimeterSyncModes.HIGH_LOW]}
                    description='Captures highest and lowest values within a cycle. Updates once per cycle.'
                    onPress={onSyncModeChange} />
                <CheckBoxListItem
                    disabled={disabled}
                    checked={syncMode === MultimeterSyncModes.CYCLED}
                    title={MultimeterSyncModeLabels[MultimeterSyncModes.CYCLED]}
                    value={MultimeterSyncModes.CYCLED}
                    description='Evaluates values and determines shift between cycles. Reports captured values at the begining of ON and OFF cycles. Only works for cycles with different ON/OFF durations.'
                    onPress={onSyncModeChange} />
            </View>
        )
    return null
}


export default CaptureModeView

const styles = StyleSheet.create({
   title: {
    paddingBottom: 6
   }
})