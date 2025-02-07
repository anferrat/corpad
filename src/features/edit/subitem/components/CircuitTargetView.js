import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Input from '../../../../components/Input'

const TargetView = ({ update, validate, targetMin, targetMax, targetMinValid, targetMaxValid }) => {

    const onChangeTargetMin = React.useCallback((value) => { update(value, 'targetMin') }, [update])

    const onChangeTargetMax = React.useCallback((value) => { update(value, 'targetMax') }, [update])

    const onEndEditingTargetMin = React.useCallback(() => { validate('targetMin') }, [validate])

    const onEndEditingTargetMax = React.useCallback(() => { validate('targetMax') }, [validate])

    return (
        <View style={styles.mainView}>
            <Text category='label' appearance={'hint'} style={styles.label}>Target</Text>
            <Input
                onChangeText={onChangeTargetMin}
                onEndEditing={onEndEditingTargetMin}
                style={styles.field}
                keyboardType='numeric'
                property='targetMin'
                maxLength={10}
                placeholder='Min'
                value={targetMin}
                valid={targetMinValid}
                unit='A' />
            <Text style={styles.dash}>-</Text>
            <Input
                onChangeText={onChangeTargetMax}
                onEndEditing={onEndEditingTargetMax}
                style={styles.field}
                keyboardType='numeric'
                property='targetMax'
                maxLength={10}
                placeholder='Max'
                value={targetMax}
                valid={targetMaxValid}
                unit='A' />
        </View>
    )
}

export default React.memo(TargetView)

const styles = StyleSheet.create({
    field: {
        flex: 1
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        flexBasis: 50,
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