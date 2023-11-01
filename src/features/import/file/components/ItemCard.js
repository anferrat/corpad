import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { Platform, StyleSheet, View } from 'react-native'
import { primary, basic, success, control, primary100, basic300 } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const ItemCard = ({ onPress, selected, icon, pack, title }) => {
    return (
        <Pressable
            android_ripple={androidRipple}
            style={selected ? pressableStyleSelected : pressableStyle}
            onPress={onPress}>
            {selected ?
                <Icon
                    name={'checkmark-circle-2'}
                    style={styles.checkIcon}
                    fill={success} />
                : null}
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
    pressable: {
        flex: 1,
        padding: 12,
        marginHorizontal: 6,
        borderRadius: 6,
        maxWidth: '33%',
        backgroundColor: control,
    },
    pressablePlatformSpecific: Platform.select({
        android: {
            elevation: 5
        },
        default: {
            borderColor: basic300,
            borderWidth: 1,
        }
    }),
    pressableSelected: {
        backgroundColor: primary100
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
    }
})

const pressableStyle = StyleSheet.compose(styles.pressable, styles.pressablePlatformSpecific)

const pressableStyleSelected = StyleSheet.compose(pressableStyle, styles.pressableSelected)