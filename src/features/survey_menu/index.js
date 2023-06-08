import React from 'react'
import { Divider } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import ListItem from './components/ListItemMenu'
import useSurveyManager from './hooks/useSurveyManager'
import { basic, control, success } from '../../styles/colors'
import { ItemStatuses } from '../../constants/global'


export const MenuSheet = React.memo(({ closeSheet, navigateToCalculatorList, navigateToExport, navigateToSettings, navigateToMultimeter }) => {

    const { saveSurveyHandler, saveAndResetSurveyHandler, savingInProgress, syncTimeLabel, multimeterLablel, paired, connected } = useSurveyManager({ hideSheet: closeSheet })

    return (
        <View style={styles.mainView}>
            <ListItem
                title='Multimeter'
                subtitle={multimeterLablel}
                icon='radio'
                onPress={navigateToMultimeter}
                subtitleIcon={paired ? 'color-circle' : null}
                subtitleIconPack='cp'
                subtitleIconColor={connected ? success : basic} />
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
                status={ItemStatuses.BAD}
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