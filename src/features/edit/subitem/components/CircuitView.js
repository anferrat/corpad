import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../../../../components/Input'

const CurrentView = ({ current, voltage, currentValid, voltageValid, validate, update, resetVoltageDrop }) => {

    const onChangeCurrent = React.useCallback((value) => {
        resetVoltageDrop()
        update(value, 'current')
    }, [update, resetVoltageDrop])

    const onChangeVoltage = React.useCallback((value) => update(value, 'voltage'), [update])

    const onEndEditingCurrent = React.useCallback(() => validate('current'), [update])

    const onEndEditingVoltage = React.useCallback(() => validate('voltage'), [validate])

    return (
        <View style={styles.mainView}>
            <Input
                onChangeText={onChangeCurrent}
                onEndEditing={onEndEditingCurrent}
                style={styles.fieldLeft}
                property='current'
                maxLength={10}
                label='Current'
                placeholder='Amps'
                keyboardType='numeric'
                value={current}
                valid={currentValid}
                unit='A' />
            <Input
                onChangeText={onChangeVoltage}
                onEndEditing={onEndEditingVoltage}
                style={styles.fieldRight}
                keyboardType='numeric'
                property='voltage'
                placeholder='Volts'
                maxLength={10}
                label='Voltage'
                value={voltage}
                valid={voltageValid}
                unit='V' />
        </View>
    )
}

export default React.memo(CurrentView)

const styles = StyleSheet.create({
    fieldLeft: {
        flex: 1,
        paddingRight: 6
    },
    fieldRight: {
        flex: 1,
        paddingLeft: 6
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})