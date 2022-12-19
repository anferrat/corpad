import React from 'react'
import { SafeAreaView } from 'react-native'
import { ImportItem } from '../../features/import/item'
import { globalStyle } from '../../styles/styles'

export default ImportDetails = ({ navigation, route }) => {
    const navigateToList = (itemType) => navigation.navigate('PipelineSurvey', { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { uri: uri, title: title })
    const navigateToParameters = (property, subitemIndex = null, potentialIndex = null) => navigation.navigate('ImportParameters', { property: property, subitemIndex: subitemIndex, potentialIndex: potentialIndex })
    const pushToSubitem = (subitemIndex, isNew, subitemType) => navigation.navigate('ImportSubitem', { subitemIndex: subitemIndex, isNewSubitem: isNew, itemType: null, subitemType: subitemType })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <ImportItem
                goBack={navigation.goBack}
                pushToSubitem={pushToSubitem}
                subitemIndex={route?.params?.subitemIndex ?? null}
                isNewSubitem={route?.params?.isNewSubitem ?? false}
                navigateToParameters={navigateToParameters}
                navigateToList={navigateToList}
                navigateToSpreadsheet={navigateToSpreadsheet} />
        </SafeAreaView>
    )
}