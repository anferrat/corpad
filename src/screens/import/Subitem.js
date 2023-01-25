import React from 'react'
import { SafeAreaView } from 'react-native'
import { ImportSubitem } from '../../features/import/item/subitem'
import { globalStyle } from '../../styles/styles'

const ImportSubitemScreen = ({ navigation, route }) => {
    const navigateToParameters = (property, subitemIndex = null, potentialIndex = null) =>
        navigation.navigate('ImportParameters',
            {
                property: property,
                subitemIndex: subitemIndex,
                potentialIndex: potentialIndex
            })

    return (
        <SafeAreaView style={globalStyle.screen}>
            <ImportSubitem
                goBack={navigation.goBack}
                subitemIndex={route?.params?.subitemIndex ?? null}
                navigateToParameters={navigateToParameters} />
        </SafeAreaView>
    )
}

export default ImportSubitemScreen