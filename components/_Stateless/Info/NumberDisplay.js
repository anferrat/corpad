import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../styles/GlobalStyle'

const NumberDisplay = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.numberRow}>
                <Icon name={props.icon} fill='#fff' style={styles.icon} pack='cp' />
                <Text style={styles.text} category='h3' status='control'>
                    {props.number}
                </Text>
            </View>
            <Text category='p1' status='control'>{props.title}</Text>
        </View>
    )
}

export default NumberDisplay

const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        padding: 12,
    },
    numberRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 6
    },
    icon: {
        width: 22,
        height: 22
    }
})