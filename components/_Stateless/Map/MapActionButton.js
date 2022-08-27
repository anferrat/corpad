import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { basic, basic200, primary } from '../../../styles/GlobalStyle'

const MapActionButton = (props) => {
    return <View style={styles.mainView}>
        <Pressable style={styles.pressable} android_ripple={{ color: basic200 }} onPress={props.onPress} hitSlop={5} disabled={props.disabled}>
            <Icon name={props.icon} pack={props.pack} style={styles.icon} fill='#fff' />
        </Pressable>
    </View>
}

export default MapActionButton

const styles = StyleSheet.create({
    mainView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        elevation: 5,
        backgroundColor: '#fff',
        overflow: "hidden",
        borderWidth: 0,
        borderColor: basic,
        backgroundColor: primary,
        marginBottom: 12,
    },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    }
})