import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const CoatingQuality = (props) => {
    const qualitiyList = {
        excellent: {
            title: 'Excellent',
            status: 'success'
        },
        good: {
            title: 'Good',
            status: 'success'
        },
        fair: {
            title: 'Fair',
            status: 'warning'
        },
        bad: {
            title: 'Poor',
            status: 'danger'
        }
    }
    const qualitiy = qualitiyList[props.coatingQuality]
    if (qualitiy)
        return (
            <View style={styles.mainView}>
                <Text appearance='hint' category='s2'>Coating quality</Text>
                <Text style={styles.quality} status={qualitiy.status}>{qualitiy.title}</Text>
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