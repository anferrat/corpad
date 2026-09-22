import React, { useEffect } from 'react'
import { globalStyle } from '../../styles/styles'
import { BackHandler, Platform, View } from 'react-native'
import { FilePickerImport } from '../../features/import/file'

const ImportFilePicker = ({ navigation }) => {
    useEffect(() => {
        if (Platform.OS !== 'android')
            return

        const onBackPress = () => {
            if (navigation.canGoBack())
                return false

            navigation.replace('PipelineSurvey')
            return true
        }

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
        return () => subscription.remove()
    }, [navigation])

    const navigateToImportItem = (itemType) => navigation.navigate('ImportItem', { itemType: itemType, subitemIndex: null, subitemType: null }) // itemtype for header 
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { uri: uri, title: title })
    const navigateToList = (itemType) =>
        navigation.popTo('PipelineSurvey',
            { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })
    return (
        <View style={globalStyle.screen}>
            <FilePickerImport
                navigateToList={navigateToList}
                navigateToImportItem={navigateToImportItem}
                navigateToSpreadsheet={navigateToSpreadsheet} />
        </View>
    )
}

export default ImportFilePicker
