import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, primary } from '../../../../styles/colors'

const EmptyList = ({ searching }) => {
    if (!searching)
        return (
            <View
                style={styles.main}>
                <Text category='p1' style={styles.mainText}>No results found on map</Text>
                <Text category='s2' style={styles.text}>Try different search parameter. Items without coordinates will not be displayed here.</Text>
            </View>
        )
    else
        return <View style={styles.searching}>
            <Text category='s2' appearance='hint' style={styles.text}> Searching...</Text>
        </View>
}

export default React.memo(EmptyList)

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    text: {
        textAlign: 'center',
    },
    mainText: {
        paddingBottom: 12,
        fontWeight: 'bold'
    },
    searching: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
})