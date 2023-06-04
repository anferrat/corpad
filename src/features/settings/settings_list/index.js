import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from '@ui-kitten/components'
import ListItem from './components/ListItem'
import useSettings from './hooks/useSettings'

export const SettingsList = () => {
    const {
        onExit,
        navigateToExport,
        navigateToAbout,
        navigateToPotentials,
        navigateToDefaultNames,
        navigateToExportedFiles,
        navigateToInfo,
        navigateToReferenceCells,
        navigateToMultimeter
    } = useSettings()
    return (
        <ScrollView
            style={styles.mainView}
            contentContainerStyle={styles.container}>
            <Text
                style={styles.title}
                appearance='hint'>
                Survey
            </Text>
            <ListItem
                icon={'home-outline'}
                title={'Survey overview'}
                subtitle={'See general stats of your survey, and status of completion'}
                onPress={navigateToInfo} />
            <ListItem
                icon={'RE'}
                pack='cp'
                title={'Reference cells'}
                subtitle={'Add and remove portable reference cells'}
                onPress={navigateToReferenceCells} />
            <ListItem
                icon={'grid-outline'}
                title={'Potentials'}
                subtitle={'Control default units for potential readings, add and remove potential reading types'}
                onPress={navigateToPotentials} />
            <ListItem
                icon={'download'}
                title={'Export to spreadsheet'}
                subtitle={'Export data from survey to a spreadsheet file and save it to your device'}
                onPress={navigateToExport} />
            <Text
                style={styles.title}
                appearance='hint'>
                App
            </Text>
            <ListItem
                icon={'info-outline'}
                title={'About'}
                subtitle={'Check app version, legal information and support contact'}
                onPress={navigateToAbout} />
            <ListItem
                icon={'bluetooth'}
                title={'Digital multimeter'}
                subtitle={'Control bluetooth multimeter settings'}
                onPress={navigateToMultimeter} />
            <ListItem
                icon={'people-outline'}
                title={'Default names'}
                subtitle={'Manage default names for new test points, rectifiers, readings and etc.'}
                onPress={navigateToDefaultNames} />
            <ListItem
                icon={'file-text-outline'}
                title={'Exported files'}
                subtitle={'View exported CSV and KML files, delete or share them with different apps'}
                onPress={navigateToExportedFiles} />
            <Text
                style={styles.title}
                appearance='hint'>
                Other
            </Text>
            <ListItem
                icon='log-out'
                title='Exit without saving'
                subtitle='Exit to the main screen. All changes made after last sync will not be saved in file. Use with caution.'
                onPress={onExit} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff'
    },
    container: {
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 12,
        paddingVertical: 6
    }
})