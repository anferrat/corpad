import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputField from '../InputField'

const CurrentView = (props) => {
    return (
        <View style={styles.mainView}>
            <InputField
                style={styles.fieldLeft}
                property='current'
                onChange={props.resetVoltageDrop}
                maxLength={10}
                label='Current'
                placeholder='Amps'
                keyboardType='numeric'
                value={props.current}
                valid={props.currentValid}
                unit='A' />
            <InputField
                style={styles.fieldRight}
                keyboardType='numeric'
                property='voltage'
                placeholder='Volts'
                maxLength={10}
                label='Voltage'
                value={props.voltage}
                valid={props.voltageValid}
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