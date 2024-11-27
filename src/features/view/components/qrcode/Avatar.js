import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { control, primary } from '../../../../styles/colors'
import { ItemTypeIconsFilled } from '../../../../constants/icons'


const Avatar = ({ itemType }) => {
    return (
        <View
            style={styles.container}>
            <Icon
                name={ItemTypeIconsFilled[itemType]}
                fill={control}
                pack='cp'
                style={styles.icon} />
        </View>
    )
}


export default Avatar

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderRadius: 45,
        backgroundColor: primary,
    },
    icon: {
        width: 40,
        height: 40
    }
})