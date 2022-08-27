import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider, Text } from '@ui-kitten/components'
import { basic1000 } from '../../../styles/GlobalStyle'
import { useSelector } from 'react-redux'
import EditNameButton from './EditNameButton'


const SurveyName = (props) => {
    const surveyName = useSelector(state => state.settings.currentSurvey.name)
    return (
        <>
            <View style={styles.surveyTitle}>
                <Text category='h3' ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{surveyName}</Text>
                <EditNameButton surveyName={surveyName} />
            </View>
            <Divider style={styles.divider} />
        </>
    )
}

export default SurveyName

const styles = StyleSheet.create({
    surveyTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 6,
    },
    divider: {
        marginVertical: 12
    },
    title: {
        flex: 1,
        marginRight: 24
    },
})