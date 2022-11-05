import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useSelector } from 'react-redux'
import EditNameButton from './EditNameButton'


const SurveyName = () => {
    const surveyName = useSelector(state => state.settings.currentSurvey.name)
    return (
        <View style={styles.surveyTitle}>
            <View style={styles.titleView}>
                <Text appearance='hint' category='label'>Survey name</Text>
                <Text category='h5' ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{surveyName}</Text>
            </View>
            <EditNameButton surveyName={surveyName} />
        </View>
    )
}

export default SurveyName

const styles = StyleSheet.create({
    surveyTitle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 6,
        paddingBottom: 24,
    },
    title: {
        flex: 1,
        marginRight: 24,
        marginLeft: 12,
    },
    titleView: {
        flex: 1
    }
})