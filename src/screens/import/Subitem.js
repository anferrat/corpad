import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <ImportSubitem
                goBack={navigation.goBack}
                subitemIndex={route?.params?.subitemIndex ?? null}
                navigateToParameters={navigateToParameters} />
        </SafeAreaView>
    )
}

export default ImportSubitemScreen
