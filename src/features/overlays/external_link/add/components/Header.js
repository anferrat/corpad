import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const Header = () => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                category='label'
                appearance='hint'>
                Pipelines in the link
            </Text>
            <Text
                style={styles.select}
                category='label'
                appearance='hint'>
                Pipelines in the survey
            </Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6
    },
    text: {
        flex: 1
    },
    select: {
        flex: 1.5
    }
})