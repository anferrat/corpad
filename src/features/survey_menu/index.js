import React from 'react'
import { Divider } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import ListItem from './components/ListItemMenu'
import useSurveyManager from './hooks/useSurveyManager'
import { control } from '../../styles/colors'


export const MenuSheet = React.memo(({ closeSheet, navigateToCalculatorList, navigateToExport, navigateToSettings }) => {

    const { saveSurveyHandler, saveAndResetSurveyHandler, savingInProgress, syncTimeLabel } = useSurveyManager({ hideSheet: closeSheet })

    return (
        <View style={styles.mainView}>
            <ListItem
                title='Corrosion calculator'
                icon='calculator'
                pack='cp'
                onPress={navigateToCalculatorList} />
            <ListItem
                title='Export survey'
                icon='download-outline'
                onPress={navigateToExport} />
            <ListItem
                disabled={savingInProgress}
                title='Save changes'
                subtitle={savingInProgress ? 'Saving...' : syncTimeLabel}
                icon={savingInProgress ? 'activityIndicator' : 'save-outline'}
                onPress={saveSurveyHandler} />
            <ListItem
                disabled={savingInProgress}
                title='Save changes and exit'
                onPress={saveAndResetSurveyHandler}
                status='danger'
                icon='log-out' />
            <Divider />
            <ListItem title='Settings' icon='settings-outline' onPress={navigateToSettings} />
        </View>
    )
})

export const styles = StyleSheet.create({
    mainView: {
        backgroundColor: control,
    }
})