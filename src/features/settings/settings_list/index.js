import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from '@ui-kitten/components'
import ListItem from './components/ListItem'
import useSettings from './hooks/useSettings'
import { Platform } from 'react-native'

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
        navigateToMultimeter,
        navigateToCalculator,
        navigateToExternalLinks,
        navigateToImages
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
                icon={'image'}
                title={'Images'}
                subtitle={'View all the images assigned to test points and rectifiers in this survey'}
                onPress={navigateToImages} />
            <ListItem
                icon={'download'}
                title={'Export survey'}
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
                icon={'radio'}
                title={'Digital multimeter'}
                subtitle={'Control bluetooth multimeter settings'}
                onPress={navigateToMultimeter} />
            <ListItem
                icon={'nfc'}
                pack='cp'
                title={'NFC labels'}
                subtitle={Platform.select({
                    android: 'View recently scanned labels',
                    ios: 'Launch NFC scanning and view recently scanned labels'
                })}
                onPress={navigateToExternalLinks} />
            <ListItem
                icon={'calculator'}
                pack='cp'
                title={'Corrosion calculator'}
                subtitle={'Execute number of cathodic protection calculations and export results as files'}
                onPress={navigateToCalculator} />
            <ListItem
                icon={'people-outline'}
                title={'Default names'}
                subtitle={'Manage default names for new test points, rectifiers, readings and etc.'}
                onPress={navigateToDefaultNames} />
            <ListItem
                icon={'file-text-outline'}
                title={'Exported files'}
                subtitle={'View exported survey files, delete or share them with different apps'}
                onPress={navigateToExportedFiles} />
            <Text
                style={styles.title}
                appearance='hint'>
                Other
            </Text>
            <ListItem
                icon='log-out'
                title='Exit without saving'
                subtitle={'Exit to the main screen. All changes made after last sync will not be saved in file. Use with caution.'}
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