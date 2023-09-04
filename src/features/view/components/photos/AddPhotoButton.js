import React from 'react'
import { StyleSheet } from 'react-native'
import Pressable from '../../../../components/Pressable'
import { androidRipple } from '../../../../styles/styles'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'


const AddPhotoButton = ({ onPress, limitReached }) => {
    if (!limitReached)
        return (
            <Pressable
                disabled={limitReached}
                style={styles.container}
                onPress={onPress}
                android_ripple={androidRipple}
                isPrimary={false}>
                <Icon
                    style={styles.icon}
                    name={'camera'}
                    fill={primary} />
                <Text
                    status='primary'
                    category='s2'>
                    {'Add a photo'}
                </Text>
            </Pressable>
        )
    else
        return null
}

export default AddPhotoButton

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: primary,
        borderStyle: 'dashed',
        borderRadius: 15
    },
    icon: {
        width: 25,
        height: 25,
        marginBottom: 4
    }
})