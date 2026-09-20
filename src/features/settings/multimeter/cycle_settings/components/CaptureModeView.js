import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import CheckBoxListItem from './CheckBoxListItem'
import TimeSyncCaptureView from './TimeSyncCaptureView'
import { MultimeterSyncModes } from '../../../../../constants/global'
import { MultimeterSyncModeLabels } from '../../../../../constants/labels'
import { MultimeterSettingContext } from '../context/MultimeterSettings'
import { translateMultimeterSettings } from '../../../../../localization'



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
                    {translateMultimeterSettings('cycleDetectionMethod')}
                </Text>
                <CheckBoxListItem
                    disabled={disabled}
                    checked={syncMode === MultimeterSyncModes.GPS}
                    value={MultimeterSyncModes.GPS}
                    onPress={onSyncModeChange}
                    title={MultimeterSyncModeLabels[MultimeterSyncModes.GPS]}
                     description={translateMultimeterSettings('gpsDescription')} />
                <TimeSyncCaptureView />
                <CheckBoxListItem
                    disabled={disabled}
                    checked={syncMode === MultimeterSyncModes.HIGH_LOW}
                    value={MultimeterSyncModes.HIGH_LOW}
                    title={MultimeterSyncModeLabels[MultimeterSyncModes.HIGH_LOW]}
                     description={translateMultimeterSettings('highLowDescription')}
                    onPress={onSyncModeChange} />
                <CheckBoxListItem
                    disabled={disabled}
                    checked={syncMode === MultimeterSyncModes.CYCLED}
                    title={MultimeterSyncModeLabels[MultimeterSyncModes.CYCLED]}
                    value={MultimeterSyncModes.CYCLED}
                     description={translateMultimeterSettings('cycledDescription')}
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
