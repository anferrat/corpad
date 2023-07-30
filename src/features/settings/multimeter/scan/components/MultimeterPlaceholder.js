import { Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet, Linking, Pressable } from 'react-native'
import { primary } from '../../../../../styles/colors'


const MultimeterPlaceholder = () => {
    const openLink = () => Linking.openURL('https://www.corpad.ca/multimeters')
    return (
        <View style={styles.container}>
            <Icon style={styles.icon}
                name='radio'
                fill={primary} />
            <Text category='h5'
                style={styles.title}>
                Multimeter
            </Text>
            <Text
                appearance='hint'
                style={styles.description}>
                Connect digital bluetooth multimeter in order to capture potential readings.
            </Text>
            <View style={styles.text}>
                <Text
                    appearance='hint'
                    category='s2'
                    style={styles.description}>
                    Find supported multimeters at
                </Text>
                <Pressable onPress={openLink}>
                    <Text
                        appearance='hint'
                        status='primary'
                        category='s2'
                        style={styles.description}> corpad.ca/multimeters.
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default React.memo(MultimeterPlaceholder)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24
    },
    icon: {
        width: 60,
        height: 60
    },
    title: {
        marginBottom: 6,
        marginTop: 12
    },
    description: {
        textAlign: 'center',
    },
    text: {
        paddingTop: 24,
        paddingBottom: 24
    }
})