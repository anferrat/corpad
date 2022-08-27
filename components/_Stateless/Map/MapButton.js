import React from 'react'
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { basic200, basic300, primary } from '../../../styles/GlobalStyle'

const MapButton = (props) => {
    return <View style={styles.mainView}>
        <Pressable style={styles.pressable} android_ripple={{ color: basic200 }} onPress={props.onPress} hitSlop={5} disabled={props.disabled}>
            {props.icon === 'spinner' ? <ActivityIndicator color={primary} /> :
                <Icon name={props.icon} pack={props.pack} style={styles.icon} fill={primary} />}
        </Pressable>
    </View>
}

export default MapButton

const styles = StyleSheet.create({
    mainView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        elevation: 5,
        backgroundColor: '#fff',
        overflow: "hidden",
        borderWidth: 1,
        borderColor: basic300
    },
    pressable: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
    }
})