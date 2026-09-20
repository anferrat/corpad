import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../../styles/colors'
import { translateSurveyList } from '../../../localization'


const NoInternetEmptyComponent = () => {
    return (
        <View style={styles.mainView}>
            <Icon style={styles.icon} fill={basic} name='wifi-off' />
            <Text category='h3' style={styles.title}>{translateSurveyList('oops')}</Text>
            <Text category='p1' style={styles.text}>{translateSurveyList('noInternet')}</Text>
        </View>
    )
}

export default NoInternetEmptyComponent

const styles = StyleSheet.create({
    mainView: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: basic200,
        padding: 12
    },
    title: {
        marginBottom: 20,
        marginTop: 10
    },
    icon: {
        width: 80,
        height: 80,
    },
    text: {
        textAlign: 'center'
    }
})
