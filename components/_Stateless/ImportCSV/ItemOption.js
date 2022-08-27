import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, Pressable, View } from 'react-native'
import { basic200, primary, basic, success } from '../../../styles/GlobalStyle'

const ItemOption = (props) => {
    return (
        <Pressable
            android_ripple={{ color: basic200 }}
            style={styles.pressable}
            onPress={props.onPress}>
            <Icon name={'checkmark-circle-2'} style={props.selected ? styles.checkIcon : styles.hidden} fill={success} />
            <Pressable onPress={props.onPress}
                style={styles.innerPressable}>

                <View style={{ ...styles.iconLayout, backgroundColor: props.selected ? primary : basic }}>
                    <Icon name={props.iconName} pack={props.pack} style={styles.icon} fill={'#fff'} />
                </View>
            </Pressable>
            <Text style={styles.text} appearance={props.selected ? 'default' : 'hint'}>{props.title}</Text>
        </Pressable>
    )
}

export default ItemOption

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        padding: 12,
        marginHorizontal: 6,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 6,
        maxWidth: '33%'
    },
    innerPressable: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconLayout: {
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 20,
        width: 20,
    },
    text: {
        alignSelf: 'center',
        paddingTop: 8,
        fontSize: 13
    },
    checkIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: -6,
        top: -6
    },
    hidden: {
        display: 'none'
    }
})