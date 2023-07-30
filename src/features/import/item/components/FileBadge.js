import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { control, primary } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'


const FileBadge = (props) => (
    <View style={styles.mainView}>
        <Pressable style={styles.badge} android_ripple={androidRipple} onPress={props.onPress}>
            <Icon style={styles.icon} fill={control} name='file-text-outline' />
        </Pressable>
    </View>
)

export default FileBadge

const styles = StyleSheet.create({
    mainView: {
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        borderRadius: 20,
        width: 30,
        height: 30,
        backgroundColor: primary,
        padding: 8,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2
    },
    icon: {
        width: 15,
        height: 15
    }
})