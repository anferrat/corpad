import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'

const EmptyResult = ({ loading, isKeywordEmpty }) => {
    if (!loading)
        if (isKeywordEmpty)
            return null
        else
            return (
                <View
                    style={styles.main}>
                    <Text
                        category='p1'
                        style={styles.mainText}>
                        No results found in this survey
                    </Text>
                    <Text
                        category='s2'
                        style={styles.text}>
                        Try different search parameter. Items can be search by name only, not case-sensitive
                    </Text>
                </View>
            )
    else
        return <View
            style={styles.searching}>
            <Text
                category='s2'
                appearance='hint'
                style={styles.text}>
                Searching...
            </Text>
        </View>
}

export default React.memo(EmptyResult)

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