import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { primary, danger, basic, success } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'


const ListItem = ({ disabled, status, icon, pack, title, subtitle, iconColor, onPress }) => {
    const color = iconColor ?? primary
    return (
        <Pressable
            disabled={disabled}
            android_ripple={androidRipple}
            style={styles.pressable}
            onPress={onPress}>
            <Icon
                name={icon}
                pack={pack}
                style={styles.icon}
                fill={color} />
            <View>
                <Text
                    status={status ?? 'default'}
                    category='s1'>
                    {title}
                </Text>
                {subtitle ?
                    <Text
                        category='s2'
                        appearance='hint'>
                        {subtitle}
                    </Text>
                    : null}
            </View>
        </Pressable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 15,
        height: 70

    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 24
    },
})