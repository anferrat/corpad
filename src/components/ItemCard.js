import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, Pressable, View } from 'react-native'
import { primary, basic, success, control, primary100, basic300 } from '../styles/colors'
import { androidRipple } from '../styles/styles'

const ItemCard = ({ onPress, selected, icon, pack, title }) => {
    return (
        <Pressable
            android_ripple={androidRipple}
            style={selected ? styles.pressableSelected : styles.pressable}
            onPress={onPress}>
            <Icon
                name={'checkmark-circle-2'}
                style={selected ? styles.checkIcon : styles.hidden}
                fill={success} />
            <View
                style={styles.innerPressable}>
                <View style={selected ? styles.iconLayoutSelected : styles.iconLayout}>
                    <Icon
                        name={icon}
                        pack={pack}
                        style={styles.icon}
                        fill={control} />
                </View>
            </View>
            <Text
                style={styles.text}
                appearance={selected ? 'default' : 'hint'}>
                {title}
            </Text>
        </Pressable>
    )
}

export default React.memo(ItemCard)

const styles = StyleSheet.create({
    pressableSelected: {
        flex: 1,
        padding: 12,
        marginHorizontal: 6,
        elevation: 5,
        borderRadius: 6,
        maxWidth: '33%',
        borderColor: basic300,
        borderWidth: 1,
        backgroundColor: primary100
    },
    pressable: {
        flex: 1,
        padding: 12,
        marginHorizontal: 6,
        elevation: 5,
        borderRadius: 6,
        maxWidth: '33%',
        borderColor: basic300,
        borderWidth: 1,
        backgroundColor: control
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
        alignItems: 'center',
        backgroundColor: basic
    },
    iconLayoutSelected: {
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary
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