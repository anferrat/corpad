import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic1000, basic700, primary, success } from '../../../../../styles/colors'

const ModalText = ({ children }) => {
    return (
        <View
            style={styles.container}>
            <Icon
                name={'circle'}
                pack={'cp'}
                fill={basic700}
                style={styles.icon} />
            <View style={styles.textContainer}>
                <Text
                    category={'s1'}
                    style={styles.title}>
                    {children}
                </Text>
            </View>
        </View>
    )
}

export default ModalText

const styles = StyleSheet.create({
    title: {
        lineHeight: 30,
        flex: 1
    },
    icon: {
        height: 12,
        width: 12,
        marginVertical: 9,
        marginRight: 12
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 4
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
    }
})