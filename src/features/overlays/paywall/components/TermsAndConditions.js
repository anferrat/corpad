import React from 'react'
import { View, StyleSheet } from 'react-native'
import Pressable from '../../../../components/Pressable'
import { Text } from '@ui-kitten/components'
import { androidRipple } from '../../../../styles/styles'


const TermsAndConditions = ({ onPress }) => {
    return (
        <View
            style={styles.container}>
            <Pressable
                style={styles.pressable}
                android_ripple={androidRipple}
                onPress={onPress}>
                <Text
                    appearance='hint'
                    category='s2'
                    style={styles.button}>Terms & Conditions</Text>
            </Pressable>
        </View>
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 12
    },
    pressable: {
        flex: -1
    },
    button: {
        textDecorationLine: 'underline'
    }
})