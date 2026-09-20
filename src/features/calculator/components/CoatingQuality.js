import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translate } from '../../../localization'


const CoatingQuality = (props) => {
    const qualitiyList = {
        excellent: {
            title: 'excellent',
            status: 'success'
        },
        good: {
            title: 'good',
            status: 'success'
        },
        fair: {
            title: 'fair',
            status: 'warning'
        },
        bad: {
            title: 'poor',
            status: 'danger'
        }
    }
    const qualitiy = qualitiyList[props.coatingQuality]
    if (qualitiy)
        return (
            <View style={styles.mainView}>
                <Text appearance='hint' category='s2'>{translate('calculator.coatingQuality')}</Text>
                <Text style={styles.quality} status={qualitiy.status}>{translate(`calculator.${qualitiy.title}`)}</Text>
            </View>
        )
    else return null
}

export default CoatingQuality


const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
        alignItems: 'center'
    },
    quality: {
        fontWeight: 'bold'
    }
})
