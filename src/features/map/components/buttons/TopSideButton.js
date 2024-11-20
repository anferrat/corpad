import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic300, control, primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'

const TopSideButton = ({ onPress, icon, pack, title }) => {
    return (
        <View
            style={styles.wrapper} >
            <Pressable
                style={styles.pressable}
                android_ripple={androidRipple}
                onPress={onPress}>
                {title ?
                    <Text
                        style={styles.text}
                        status='primary'
                        category='p1'>
                        {title}
                    </Text>
                    : null}
                <Icon
                    name={icon}
                    pack={pack}
                    style={styles.icon}
                    fill={primary} />

            </Pressable>
        </View>
    )
}

export default React.memo(TopSideButton)

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        borderRadius: 15,
        elevation: 5,
        backgroundColor: control,
        borderWidth: 1,
        borderColor: basic300,
        justifyContent: 'center',
        height: 44,
        marginRight: 12
    },
    pressable: {
        height: 50,
        paddingHorizontal: 18,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 22,
        height: 22,
        marginBottom: 3
    },
    primary: {
        borderWidth: 0,
        backgroundColor: primary,
    },
    text: {
        marginRight: 6,
    }
})