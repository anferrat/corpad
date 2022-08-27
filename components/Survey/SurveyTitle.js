import { Text } from '@ui-kitten/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'

const SurveyTitle = () => {
    const title = useSelector(state => state.settings.currentSurvey.name)
    return <Text style={styles.title} category='h6' status='primary' numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
}

export default SurveyTitle

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        flexShrink: 1,
        flex: 1,
        marginRight: 4
    }
})