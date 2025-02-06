import React from 'react'
import { Divider } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../../components/MenuListItem'
import useSurveyManager from './hooks/useSurveyManager'
import { basic, control, danger, success, } from '../../../../styles/colors'


const SurveyMenuSheet = React.memo(({ closeSheet, navigateToExport, navigateToSettings, navigateToMultimeter, navigateToCalculatorList, navigateToMultimeterModal }) => {

    const { saveSurveyHandler, saveAndResetSurveyHandler, onPaywallShow, onMultimeterConnect, connecting, savingInProgress, syncTimeLabel, multimeterLablel, paired, connected, isPro, isVerify } = useSurveyManager({ hideSheet: closeSheet })

    return (
        <View style={styles.mainView}>
            {isPro || isVerify ?
                <MenuListItem
                    title='Multimeter'
                    subtitle={multimeterLablel}
                    icon={connecting ? 'activityIndicator' : 'radio'}
                    onPress={connected && !connecting ? navigateToMultimeterModal : navigateToMultimeter}
                    subtitleIcon={paired ? 'color-circle' : null}
                    subtitleIconPack='cp'
                    subtitleIconColor={connected && !connecting ? success : basic}
                    buttonIcon={!connected && paired && !connecting ? 'link-2' : undefined}
                    onButtonIconPress={onMultimeterConnect}
                /> :
                <MenuListItem
                    title='Upgrade to premium'
                    textStatus='primary'
                    icon='star'
                    iconColor={success}
                    onPress={onPaywallShow} />}
            <MenuListItem
                title='Corrosion calculator'
                icon='calculator'
                pack='cp'
                onPress={navigateToCalculatorList} />
            <MenuListItem
                title='Export survey'
                icon='download-outline'
                onPress={navigateToExport} />
            <MenuListItem
                disabled={savingInProgress}
                title='Save changes'
                subtitle={savingInProgress ? 'Saving...' : syncTimeLabel}
                icon={savingInProgress ? 'activityIndicator' : 'save-outline'}
                onPress={saveSurveyHandler} />
            <MenuListItem
                disabled={savingInProgress}
                title='Save changes and exit'
                onPress={saveAndResetSurveyHandler}
                iconColor={danger}
                icon='log-out' />
            <Divider />
            <MenuListItem title='Settings' icon='settings-outline' onPress={navigateToSettings} />
        </View>
    )
})

export default SurveyMenuSheet

export const styles = StyleSheet.create({
    mainView: {
        backgroundColor: control,
    }
})