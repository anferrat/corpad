import React from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic300, basic400, control, primary } from '../styles/colors'
import { androidRipple } from '../styles/styles'


const ToggleToken = ({ checked, title, onPress, icon, pack }) => {
    const check = checked ? 'checkmark-circle-2' : 'radio-button-off-outline'
    return (
        <View style={styles.wrapper}>
            <Pressable
                android_ripple={androidRipple}
                style={styles.container}
                onPress={onPress}>
                <Icon
                    name={check}
                    fill={checked ? primary : basic400}
                    style={styles.icon} />
                {icon ?
                    <Icon
                        name={icon}
                        pack={pack}
                        fill={basic}
                        style={styles.icon} />
                    : null}
                <Text
                    style={styles.text}
                    category='s1'
                    ellipsizeMode={'tail'}
                    numberOfLines={1}>
                    {title}
                </Text>
            </Pressable>
        </View>
    )
}

export default ToggleToken

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        borderRadius: 20,
        margin: 4,
        elevation: 2,
    },
    container: {
        flex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingRight: 12,
        borderRadius: 20,
        borderColor: basic300,
        maxWidth: 200,      
        backgroundColor: control
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        flex: -1
    }
})