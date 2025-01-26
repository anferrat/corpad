import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import Pressable from '../../../../components/Pressable'
import { basic, basic200, primary } from '../../../../styles/colors'


const MultimeterButton = ({ icon, pack, title, onPress, disabled }) => {
    return (
        <View
            style={styles.container}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: basic200 }}
                onPress={disabled ? null : onPress}>
                <Icon
                    style={styles.icon}
                    fill={disabled ? basic : primary}
                    name={icon}
                    pack={pack} />
                <Text
                    category={'p2'}
                    style={styles.text}>{title}</Text>
            </Pressable>
        </View>
    )
}


export default React.memo(MultimeterButton)

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        overflow: 'hidden'
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 6
    },
    pressable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center'
    }
})