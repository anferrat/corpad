import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translateOverlay } from '../../../../../localization'


const Header = () => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                category='label'
                appearance='hint'>
                {translateOverlay('externalLink.pipelinesInLink')}
            </Text>
            <Text
                style={styles.select}
                category='label'
                appearance='hint'>
                {translateOverlay('externalLink.pipelinesInSurvey')}
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
