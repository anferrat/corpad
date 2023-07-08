import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { globalStyle } from '../../../../styles/styles'
import useMultimeterSettings from './hooks/useMultimeterSettings'
import LoadingView from '../../../../components/LoadingView'
import Input from '../../../../components/Input'
import { TimeUnitLabels } from '../../../../constants/labels'
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
                                    category='label'
                                    appearance='hint'>
                                    ON/OFF capture mode
                                </Text>

                                <CheckBoxListItem
                                    checked={syncMode === MultimeterSyncModes.GPS}
                                    value={MultimeterSyncModes.GPS}
                                    onPress={onSyncModeChange}
                                    title={'GPS syncronized'}
                                    description='Captures potentials at the begining of ON and OFF cycles. Updates once per full cycle, needs clear sky view and permission to use device GPS.' />
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
                                    title={'High/Low mode'}
                                    description='Captures highest and lowest potential values within a cycle. Updates at least once per cycle, or more often if high/low values were captured.'
                                    onPress={onSyncModeChange} />
                                <CheckBoxListItem
                                    checked={syncMode === MultimeterSyncModes.CYCLED}
                                    title={'Cyclical mode'}
                                    value={MultimeterSyncModes.CYCLED}
                                    description='Captures real-time potentials, determines on/off cycle by comparing number of recorded potentials to cycle periods. Reports once per cycle, takes full cycle before first report.'
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
    }
})