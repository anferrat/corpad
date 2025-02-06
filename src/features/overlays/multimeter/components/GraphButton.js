import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import Pressable from '../../../../components/Pressable'
import { basic, basic200, primary } from '../../../../styles/colors'


const GraphButton = ({ icon, pack, title, onPress, disabled }) => {
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


export default React.memo(GraphButton)

const styles = StyleSheet.create({
    container: {
        flex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        overflow: 'hidden'
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 12
    },
    pressable: {
        //width: '100%',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center'
    }
})