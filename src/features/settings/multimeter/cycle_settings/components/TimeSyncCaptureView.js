import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Radio, RadioGroup, } from '@ui-kitten/components'
import { MultimeterSettingContext } from '../context/MultimeterSettings'
import Input from '../../../../../components/Input'
import { MultimeterSyncModes, TimeSyncSources, TimeUnits } from '../../../../../constants/global'
import { TimeUnitLabels } from '../../../../../constants/labels'
import { translateMultimeterSettings } from '../../../../../localization'

const timeSyncOptions = [TimeSyncSources.GPS, TimeSyncSources.NTP, TimeSyncSources.MIXED]

const TimeSyncCaptureView = () => {
    const {
        firstCycle,
        onSetup,
        offDelay,
        onFirstCycleChange,
        timeSyncMode,
        onOnSetupChanged,
        onOffDelayChanged,
        onTimeSyncChanged,
        syncMode,
        onOffCaptureActive,
        validateEntry
    } = useContext(MultimeterSettingContext)
    const index = timeSyncOptions.indexOf(timeSyncMode)
    const timeSyncModeIndex = index !== -1 ? index : 2
    const onTimeSyncChangeHandler = React.useCallback((index) => { onTimeSyncChanged(timeSyncOptions[index]) }, [onTimeSyncChanged])
    const visible = (syncMode === MultimeterSyncModes.GPS) && Boolean(onOffCaptureActive)
    if (visible)
        return (
            <View
                style={styles.container}>
                <Text
                    category='label'
                    appearance='hint'>
                    {translateMultimeterSettings('timeSynchronizationMethod')}
                </Text>
                <RadioGroup
                    style={styles.radioView}
                    onChange={onTimeSyncChangeHandler}
                    selectedIndex={timeSyncModeIndex}>
                    <Radio>{translateMultimeterSettings('gps')}</Radio>
                    <Radio>{translateMultimeterSettings('ntp')}</Radio>
                    <Radio>{translateMultimeterSettings('mixed')}</Radio>
                </RadioGroup>
                <Text
                    category='label'
                    appearance='hint'>
                    {translateMultimeterSettings('firstCycle')}
                </Text>
                <RadioGroup
                    style={styles.onOffRadioView}
                    onChange={onFirstCycleChange}
                    selectedIndex={Number(firstCycle)}>
                    <Radio>{translateMultimeterSettings('off').toUpperCase()}</Radio>
                    <Radio>{translateMultimeterSettings('on').toUpperCase()}</Radio>
                </RadioGroup>

                <View
                    style={styles.delayView}>
                    <Input
                        keyboardType='numeric'
                        style={styles.left}
                        onChangeText={onOnSetupChanged}
                        onEndEditing={validateEntry}
                        label={translateMultimeterSettings('onDelay')}
                        property='onSetup'
                        value={onSetup.value}
                        unit={TimeUnitLabels[TimeUnits.MILISECONDS]}
                        valid={onSetup.valid} />
                    <Input
                        keyboardType='numeric'
                        style={styles.right}
                        onChangeText={onOffDelayChanged}
                        onEndEditing={validateEntry}
                        label={translateMultimeterSettings('offDelay')}
                        property='offDelay'
                        unit={TimeUnitLabels[TimeUnits.MILISECONDS]}
                        value={offDelay.value}
                        valid={offDelay.valid} />
                </View>


            </View>
        )
    return null
}


export default TimeSyncCaptureView

const styles = StyleSheet.create({
    container: {},
    radioView: {
        paddingTop: 6,

        justifyContent: 'space-evenly',
        paddingBottom: 12
    },
    onOffRadioView: {
        paddingTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 12
    },
    delayView: {
        flexDirection: 'row',
    },
    left: {
        flex: 1,
        paddingRight: 12,
    },
    right: {
        flex: 1,
        paddingLeft: 12,
    },
    radioOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})
