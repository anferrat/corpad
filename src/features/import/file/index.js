import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FilePicker from './FilePicker'
import SelectFileView from './components/SelectFileView'
import SelectItem from './SelectItem'
import NextButton from './NextButton'
import LastImportView from './LastImportView'


export const FilePickerImport = ({ navigateToSpreadsheet, navigateToImportItem, navigateToList }) => {

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <LastImportView navigateToList={navigateToList} />
            <SelectItem />
            <SelectFileView>
                <FilePicker
                    navigateToSpreadsheet={navigateToSpreadsheet} />
            </SelectFileView>
            <NextButton
                onPress={navigateToImportItem} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72,
    }
})