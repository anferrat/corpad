import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FilePicker from './FilePicker'
import SelectFileView from './components/SelectFileView'
import SelectItem from './SelectItem'
import NextButton from './NextButton'
import LastImportView from './LastImportView'
import { globalStyle } from '../../../styles/styles'

export const FilePickerImport = ({ navigateToSpreadsheet, navigateToImportItem, navigateToList }) => {

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <LastImportView navigateToList={navigateToList} />
                <View
                    style={styles.container}>
                    <SelectItem />
                    <SelectFileView>
                        <FilePicker
                            navigateToSpreadsheet={navigateToSpreadsheet} />
                    </SelectFileView>
                </View>
            </ScrollView>
            <NextButton
                onPress={navigateToImportItem} />
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72,
    },
    container: {
        ...globalStyle.card_noPadding,
        flex: 1,
        marginTop: 6
    }
})