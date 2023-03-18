import React from 'react'
import { Toggle } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import Input from '../../../../components/Input'

const IsolationView = ({ shorted, current, valid, update, validate, updateShortedHandler }) => {

    const onChangeCurrent = React.useCallback((value) => update(value, 'current'), [update])

    const onEndEditing = React.useCallback(() => validate('current'), [validate])

    return (
        <View style={styles.mainView}>
            <Toggle
                style={styles.toggle}
                status={shorted ? 'danger' : 'basic'}
                checked={Boolean(shorted)}
                onChange={updateShortedHandler}>
                Shorted
            </Toggle>
            <Input
                onChangeText={onChangeCurrent}
                onEndEditing={onEndEditing}
                maxLength={8}
                keyboardType='numeric'
                unit={'A'}
                property='current'
                label='Shorting current'
                style={shorted ? styles.input : styles.hidden}
                valid={valid}
                value={current} />
        </View>
    )
}

export default React.memo(IsolationView)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 12,
        height: 80
    },
    toggle: {
        paddingRight: 6,
        paddingTop: 8
    },
    input: {
        flex: 1,
        paddingLeft: 6
    },
    hidden: {
        display: 'none'
    }
})