import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic } from '../styles/colors'

const Hint = ({ text, hidden, children }) => {
    if (!hidden)
        return (
            <View style={styles.mainView}>
                <Icon name='alert-circle-outline' fill={basic} style={styles.icon} />
                <Text category='s2' appearance='hint' style={styles.text}>{text ?? children}</Text>
            </View>
        )
}

export default Hint

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 12
    },
    text: {
        textAlign: 'justify',
        flex: -1
    }
})