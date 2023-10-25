import React from 'react'
import { View, StyleSheet } from 'react-native'
import Pressable from '../../../../../components/Pressable'
import { Text, Icon } from '@ui-kitten/components'
import { control } from '../../../../../styles/colors'
import { androidRipple } from '../../../../../styles/styles'


const ImageControlButton = ({ icon, title, pack, onPress }) => {
    return (
        <View style={styles.wrapper}>
            <Pressable
                android_ripple={androidRipple}
                isPrimary={true}
                style={styles.container}
                onPress={onPress}>
                <Icon
                    fill={control}
                    name={icon}
                    style={styles.icon}
                    pack={pack} />
                <Text
                category="s2"
                    status='control'>
                    {title}
                </Text>
            </Pressable>
        </View>
    )
}

export default ImageControlButton

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 40,
        width: 90,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,

    },
    icon: {
        marginBottom: 6,
        width: 20,
        height: 20
    }
})