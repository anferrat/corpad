import React from 'react'
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { androidRipple, basic300, primary } from '../../../styles/GlobalStyle'

const MapButton = (props) => {

    const color = props.status === 'primary' ? '#FFF' : primary

    return <View style={props.status === 'primary' ? { ...styles.wrapper, ...styles.primary } : styles.wrapper} >
        <Pressable
            style={styles.pressable}
            android_ripple={androidRipple}
            onPress={props.onPress}
            hitSlop={5}
            disabled={props.disabled}>
            {props.icon === 'spinner' ?
                <ActivityIndicator color={color} /> :
                <Icon
                    name={props.icon}
                    pack={props.pack}
                    style={styles.icon}
                    fill={color} />}
        </Pressable>
    </View >
}

export default React.memo(MapButton)

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        height: 50,
        width: 50,
        borderRadius: 25,
        elevation: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: basic300
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
    primary: {
        borderWidth: 0,
        backgroundColor: primary,
    },
})