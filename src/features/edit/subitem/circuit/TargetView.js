import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import InputField from '../InputField'

const TargetView = (props) => {
    return (
        <View style={styles.mainView}>
            <Text category='label' appearance={'hint'} style={styles.label}>Target</Text>
            <InputField
                style={styles.field}
                keyboardType='numeric'
                property='targetMin'
                maxLength={10}
                placeholder='Min'
                value={props.targetMin}
                valid={props.targetMinValid}
                unit='A' />
            <Text style={styles.dash}>-</Text>
            <InputField
                style={styles.field}
                keyboardType='numeric'
                property='targetMax'
                maxLength={10}
                placeholder='Max'
                value={props.targetMax}
                valid={props.targetMaxValid}
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
       height: '100%',
       paddingBottom: 12
    },
    dash: {
        flex: .3,
        textAlign: 'center',
        textAlignVertical: 'center', 
        height: '100%',
        paddingBottom: 12,
    }
})