import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { basic, primary } from '../../styles/GlobalStyle'
import Unit from './Unit'

const TextLine = (props) => {
    if (props.hideEmpty && (props.value === '' || props.value === null || props.value === undefined))
        return null
    else
        return <View style={styles.mainView}>
            <Text category='p2' style={styles.title} >
                {props.title}
            </Text>
            <View style={styles.valueView}>
                {props.icon ? <Icon style={styles.icon} name={props.icon} pack={props.pack} fill={props.fill ?? basic} /> : null}
                <Text category='p1' style={styles.text}>
                    {props.value}
                </Text>
                <Unit unit={props.unit} />
            </View>
        </View>
}

export default React.memo(TextLine)

const styles = StyleSheet.create({
    mainView: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textTransform: 'uppercase',
        color: primary
    },

    valueView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        paddingRight: 3
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    }
})