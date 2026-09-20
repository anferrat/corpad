import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from '@ui-kitten/components'
import ListItem from './components/ListItem'
import useSettings from './hooks/useSettings'
import { Platform } from 'react-native'
import { translateSettings } from '../../../localization'

export const SettingsList = () => {
    const {
        onExit,
        navigateToExport,
        navigateToAbout,
        navigateToLocalization,
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
                {translateSettings('survey')}
            </Text>
            <ListItem
                icon={'home-outline'}
                 title={translateSettings('surveyOverview')}
                 subtitle={translateSettings('surveyOverviewDescription')}
                onPress={navigateToInfo} />
            <ListItem
                icon={'RE'}
                pack='cp'
                 title={translateSettings('referenceCells')}
                 subtitle={translateSettings('referenceCellsDescription')}
                onPress={navigateToReferenceCells} />
            <ListItem
                icon={'grid-outline'}
                 title={translateSettings('potentials')}
                 subtitle={translateSettings('potentialsDescription')}
                onPress={navigateToPotentials} />
            <ListItem
                icon={'image-outline'}
                 title={translateSettings('images')}
                 subtitle={translateSettings('imagesDescription')}
                onPress={navigateToImages} />
            <ListItem
                icon={'download'}
                 title={translateSettings('exportSurvey')}
                 subtitle={translateSettings('exportSurveyDescription')}
                onPress={navigateToExport} />
            <Text
                style={styles.title}
                appearance='hint'>
                 {translateSettings('app')}
            </Text>
            <ListItem
                icon={'info-outline'}
                 title={translateSettings('about')}
                 subtitle={translateSettings('aboutDescription')}
                onPress={navigateToAbout} />
            <ListItem
                icon={'globe-outline'}
                 title={translateSettings('language')}
                 subtitle={translateSettings('languageDescription')}
                onPress={navigateToLocalization} />
            <ListItem
                icon={'radio'}
                 title={translateSettings('digitalMultimeter')}
                 subtitle={translateSettings('multimeterDescription')}
                onPress={navigateToMultimeter} />
            <ListItem
                icon={'pricetags-outline'}
                 title={translateSettings('externalLinks')}
                subtitle={Platform.select({
                     android: translateSettings('externalLinksAndroidDescription'),
                     default: translateSettings('externalLinksDescription')
                })}
                onPress={navigateToExternalLinks} />
            <ListItem
                icon={'calculator'}
                pack='cp'
                 title={translateSettings('calculator')}
                 subtitle={translateSettings('calculatorDescription')}
                onPress={navigateToCalculator} />
            <ListItem
                icon={'people-outline'}
                 title={translateSettings('defaultNames')}
                 subtitle={translateSettings('defaultNamesDescription')}
                onPress={navigateToDefaultNames} />
            <ListItem
                icon={'file-text-outline'}
                 title={translateSettings('exportedFiles')}
                 subtitle={translateSettings('exportedFilesDescription')}
                onPress={navigateToExportedFiles} />
            <Text
                style={styles.title}
                appearance='hint'>
                 {translateSettings('other')}
            </Text>
            <ListItem
                icon='log-out'
                 title={translateSettings('exitWithoutSaving')}
                 subtitle={translateSettings('exitDescription')}
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
