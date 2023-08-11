import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FilePicker from './FilePicker'
import SelectFileView from './components/SelectFileView'
import SelectItem from './SelectItem'
import NextButton from './NextButton'
import LastImportView from './LastImportView'


export const FilePickerImport = ({ navigateToSpreadsheet, navigateToImportItem, navigateToList }) => {

    return (
        <View
            style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <LastImportView navigateToList={navigateToList} />
                <SelectItem />
                <SelectFileView>
                    <FilePicker
                        navigateToSpreadsheet={navigateToSpreadsheet} />
                </SelectFileView>
            </ScrollView>
            <NextButton
                onPress={navigateToImportItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72,
    },
    container: {
        flex: 1
    }
})