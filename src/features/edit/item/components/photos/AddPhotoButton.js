import React from 'react'
import { StyleSheet, View } from 'react-native'
import Pressable from '../../../../../components/Pressable'
import { androidRipple } from '../../../../../styles/styles'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../../../styles/colors'
import { dimensions } from './size'
import { translateEdit } from '../../../../../localization'


const AddPhotoButton = ({ onPress, limitReached }) => {
    if (!limitReached)
        return (
            <View style={styles.container}>
                <Pressable
                    disabled={limitReached}
                    style={styles.pressable}
                    onPress={onPress}
                    android_ripple={androidRipple}
                    isPrimary={false}>
                    <Icon
                        style={styles.icon}
                        name={'camera'}
                        fill={primary} />
                    <Text
                        style={styles.label}
                        status='primary'
                        category='s2'>
                        {translateEdit('addPhoto')}
                    </Text>
                </Pressable>
            </View>
        )
    else
        return null
}

export default AddPhotoButton

const styles = StyleSheet.create({
    container: {
        width: dimensions.length,
        height: dimensions.length,
        borderWidth: 1,
        borderColor: primary,
        borderStyle: 'dashed',
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 12
    },
    pressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 25,
        height: 25,
        marginBottom: 4
    },
    label: {
       textAlign: 'center'
    }
})
