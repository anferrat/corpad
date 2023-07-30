import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const ListItem = ({ icon, pack, title, subtitle, onPress }) => {
    return (
        <>
            <Pressable
                android_ripple={androidRipple}
                style={styles.pressable}
                onPress={onPress}>
                <Icon
                    name={icon}
                    pack={pack}
                    style={styles.icon}
                    fill={primary} />
                <View
                    style={styles.textView}>
                    <Text
                        style={styles.text}>
                        {title}
                    </Text>
                    <Text
                        appearance='hint'
                        category='p2'>
                        {subtitle}
                    </Text>
                </View>
            </Pressable>
        </>
    )
}

export default ListItem

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 30,
        paddingVertical: 15
    },
    textView: {
        flex: 1
    },
    iconView: {
        width: 40,
        height: 40,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        borderRadius: 20
    },
    icon: {
        height: 27,
        width: 27,
        marginHorizontal: 30,
    },
    text: {
        flexShrink: 1,
        paddingBottom: 3,
        fontSize: 16,
    }
})