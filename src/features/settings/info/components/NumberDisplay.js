import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic1000 } from '../../../../styles/colors'

const NumberDisplay = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.numberRow}>
                <Icon name={props.icon} fill={basic1000} style={styles.icon} pack='cp' />
                <Text style={styles.text} category='h3' >
                    {props.number}
                </Text>
            </View>
            <Text
                category='p1'
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode='tail'>
                {props.title}
            </Text>
        </View>
    )
}

export default NumberDisplay

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        minWidth: 0,
        alignItems: 'center',
        padding: 6,
    },
    numberRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 6
    },
    title: {
        maxWidth: '100%',
        flexShrink: 1,
    },
    icon: {
        width: 22,
        height: 22
    }
})
