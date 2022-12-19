import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FilePicker from './FilePicker'
import SelectFileView from './components/SelectFileView'
import SelectItem from './SelectItem'
import NextButton from './NextButton'


export const FilePickerImport = ({ navigateToSpreadsheet, navigateToImportItem }) => {

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
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
        flex: 1
    }
})