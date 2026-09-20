import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translateSurveySearch } from '../../../localization'

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
                        {translateSurveySearch('noResults')}
                    </Text>
                    <Text
                        category='s2'
                        style={styles.text}>
                        {translateSurveySearch('searchHint')}
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
                {translateSurveySearch('searching')}
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
