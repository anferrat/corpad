import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Input from '../../../../components/Input'
import { translateEdit } from '../../../../localization'


const CircuitShuntView = ({ ratioCurrent, ratioVoltage, voltageDrop, valid, update, validateShuntProperty }) => {

    const onChangeRatioCurrent = React.useCallback((value) => update(value, 'ratioCurrent'), [update])
    const onChangeRatioVoltage = React.useCallback((value) => update(value, 'ratioVoltage'), [update])
    const onChangeVoltageDrop = React.useCallback((value) => update(value, 'voltageDrop'), [update])

    const onEndEditingRatioCurrent = React.useCallback(() => { validateShuntProperty('ratioCurrent') }, [validateShuntProperty])
    const onEndEditingRatioVoltage = React.useCallback(() => { validateShuntProperty('ratioVoltage') }, [validateShuntProperty])
    const onEndEditingVoltageDrop = React.useCallback(() => { validateShuntProperty('voltageDrop') }, [validateShuntProperty])

    return (
        <View style={styles.mainView}>
            <View style={styles.subView}>
                <Text appearance='hint' category='label' style={styles.label}>{translateEdit('shuntRatio')}</Text>
                <Input
                    onChangeText={onChangeRatioCurrent}
                    onEndEditing={onEndEditingRatioCurrent}
                    style={styles.field}
                    keyboardType='numeric'
                    property='ratioCurrent'
                    maxLength={5}
                    value={ratioCurrent}
                    valid={valid.ratioCurrent}
                    hideLabel={true}
                    unit='A' />
                <Text style={styles.dash}>-</Text>
                <Input
                    onChangeText={onChangeRatioVoltage}
                    onEndEditing={onEndEditingRatioVoltage}
                    style={styles.field}
                    keyboardType='numeric'
                    property='ratioVoltage'
                    maxLength={5}
                    value={ratioVoltage}
                    valid={valid.ratioVoltage}
                    hideLabel={true}
                    unit='mV' />
            </View>
            <View style={styles.subView}>
                <Text appearance='hint' category='label' style={styles.label}>{translateEdit('voltageDrop')}</Text>
                <Input
                    onChangeText={onChangeVoltageDrop}
                    onEndEditing={onEndEditingVoltageDrop}
                    style={styles.field}
                    keyboardType='numeric'
                    property='voltageDrop'
                    maxLength={10}
                    value={voltageDrop}
                    valid={valid.voltageDrop}
                    hideLabel={true}
                    unit='mV' />
            </View>
        </View>
    )
}

export default React.memo(CircuitShuntView)

const styles = StyleSheet.create({
    mainView: {
        marginTop: 12
    },
    field: {
        flex: 1
    },
    subView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        flexBasis: 90,
        textAlignVertical: 'center',
        paddingBottom: 12
    },
    dash: {
        flex: .3,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingBottom: 12,
    }
})
