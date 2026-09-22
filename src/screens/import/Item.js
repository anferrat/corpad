import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImportItem } from '../../features/import/item/item'
import { globalStyle } from '../../styles/styles'

const ImportItemScreen = ({ navigation }) => {
    const navigateToList = (itemType) =>
        navigation.popTo('PipelineSurvey',
            { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })

    const navigateToSpreadsheet = (uri, title) =>
        navigation.navigate('Spreadsheet', { uri: uri, title: title })

    const navigateToFile = () => navigation.navigate('ImportFile')

    const navigateToParameters = (property, subitemIndex = null, potentialIndex = null) =>
        navigation.navigate('ImportParameters',
            {
                property: property,
                subitemIndex: subitemIndex,
                potentialIndex: potentialIndex
            })

    const pushToSubitem = (subitemIndex, subitemType) =>
        navigation.navigate('ImportSubitem', {
            subitemIndex: subitemIndex,
            subitemType: subitemType // used for header
        })

    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <ImportItem
                navigateToFile={navigateToFile}
                pushToSubitem={pushToSubitem}
                navigateToParameters={navigateToParameters}
                navigateToList={navigateToList}
                navigateToSpreadsheet={navigateToSpreadsheet} />
        </SafeAreaView>
    )
}

export default ImportItemScreen
