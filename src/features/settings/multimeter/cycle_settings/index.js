import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { globalStyle } from '../../../../styles/styles'
import useMultimeterSettings from './hooks/useMultimeterSettings'
import LoadingView from '../../../../components/LoadingView'
import Input from '../../../../components/Input'
import { MultimeterSyncModeLabels, TimeUnitLabels } from '../../../../constants/labels'
import { MultimeterSyncModes, TimeUnits } from '../../../../constants/global'
import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import StandardCycleToken from './components/StandardCycleToken'
import { getCaption } from './helpers/cycleTimeInvalidCaption'
import CheckBoxListItem from './components/CheckBoxListItem'
import BottomButton from '../../../../components/BottomButton'


const CycleSettings = () => {
    const {
        onTime,
        offTime,
        delay,
        syncMode,
        loading,
        multimeterType,
        standardCycles,
        firstCycle,
        onSyncModeChange,
        onFirstCycleChange,
        setStandardCycleTime,
        onCycleValidate,
        offCycleValidate,
        onOffCycleChanged,
        onOnCycleChanged,
        onSaveHandler
    } = useMultimeterSettings()
    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <View style={styles.container}>
                        <LoadingView loading={loading}>
                            <Text
                                category='label'
                                appearance='hint'>
                                Interruption cycles (ON | OFF)
                            </Text>
                            <View
                                style={styles.tokens}>
                                {standardCycles.map(({ on, off, title }) =>
                                    <StandardCycleToken
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
                                    onChangeText={onOnCycleChanged}
                                    onEndEditing={onCycleValidate}
                                    style={styles.left}
                                    label='On'
                                    property='cycleTime'
                                    unit={TimeUnitLabels[TimeUnits.MILISECONDS]}
                                    value={onTime.value}
                                    valid={onTime.valid} />
                                <Input
                                    onChangeText={onOffCycleChanged}
                                    onEndEditing={offCycleValidate}
                                    style={styles.right}
                                    label='Off'
                                    property='cycleTime'
                                    unit={TimeUnitLabels[TimeUnits.MILISECONDS]}
                                    value={offTime.value}
                                    valid={offTime.valid} />
                            </View>
                            {!onTime.valid || !offTime.valid ?
                                <Text
                                    status='danger'
                                    category='label'
                                    style={styles.invalidCaption}>
                                    {getCaption(multimeterType)}
                                </Text>
                                : null}
                            <View
                                style={styles.captureModeView}>
                                <Text
                                    style={styles.captureText}
                                    category='label'
                                    appearance='hint'>
                                    ON/OFF capture mode
                                </Text>

                                <CheckBoxListItem
                                    checked={syncMode === MultimeterSyncModes.GPS}
                                    value={MultimeterSyncModes.GPS}
                                    onPress={onSyncModeChange}
                                    title={MultimeterSyncModeLabels[MultimeterSyncModes.GPS]}
                                    description='Reporst captured values at the begining of ON and OFF cycles. Uses GPS to syncronize with global time. Cycle must start at the begining of a minute.' />
                                {syncMode === MultimeterSyncModes.GPS ?
                                    <>
                                        <Text
                                            category='label'
                                            appearance='hint'>
                                            First cycle
                                        </Text>
                                        <RadioGroup
                                            style={styles.radioView}
                                            onChange={onFirstCycleChange}
                                            selectedIndex={firstCycle}>
                                            <Radio>OFF</Radio>
                                            <Radio>ON</Radio>
                                        </RadioGroup>
                                    </>
                                    : null}
                                <CheckBoxListItem
                                    checked={syncMode === MultimeterSyncModes.HIGH_LOW}
                                    value={MultimeterSyncModes.HIGH_LOW}
                                    title={MultimeterSyncModeLabels[MultimeterSyncModes.HIGH_LOW]}
                                    description='Captures highest and lowest values within a cycle. Updates once per cycle.'
                                    onPress={onSyncModeChange} />
                                <CheckBoxListItem
                                    checked={syncMode === MultimeterSyncModes.CYCLED}
                                    title={MultimeterSyncModeLabels[MultimeterSyncModes.CYCLED]}
                                    value={MultimeterSyncModes.CYCLED}
                                    description='Evaluates values and determines shift between cycles. Reports captured values at the begining of ON and OFF cycles. Only works for cycles with different ON/OFF durations.'
                                    onPress={onSyncModeChange} />
                            </View>
                        </LoadingView>
                    </View>
                </View>
            </ScrollView>
            <BottomButton
                onPress={onSaveHandler}
                title={'Save'}
                icon={'save'}
            />
        </>
    )
}

export default CycleSettings

const styles = StyleSheet.create({
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
    },
    tokens: {
        paddingTop: 6,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingBottom: 12
    },
    invalidCaption: {
        textAlign: 'center',
        marginTop: -12,
        paddingBottom: 12
    },
    radioView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    captureModeView: {
        paddingVertical: 12
    },
    scrollView: {
        paddingBottom: 72
    },
    container: {
        minHeight: 300
    },
    captureText: {
        paddingBottom: 12
    },
})