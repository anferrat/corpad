import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic, primary, basic700, basic300 } from '../../../styles/GlobalStyle'

const TabButton = (props) => {
    return (
        <View style={styles.mainView}>
            <Pressable style={props.active ? styles.buttonActive : styles.buttonInactive} android_ripple={{ color: basic }} onPress={props.onPress}>
                <Text style={props.active ? styles.textActive : styles.textInactive} category='p1'>
                    {props.title}
                </Text>
            </Pressable>
        </View>
    )
}

export default TabButton

const styles = StyleSheet.create({
    mainView: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
    },

    buttonActive: {
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        paddingHorizontal: 18
    },
    buttonInactive: {
        backgroundColor: basic300,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        paddingHorizontal: 18
    },
    textInactive: {
        color: basic700
    },
    textActive: {
        color: '#fff'
    }
})