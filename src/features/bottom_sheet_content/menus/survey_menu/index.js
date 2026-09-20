import React from 'react'
import { Divider } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../../components/MenuListItem'
import useSurveyManager from './hooks/useSurveyManager'
import { basic, control, danger, success, } from '../../../../styles/colors'
import { translateBottomSheet } from '../../../../localization'


const SurveyMenuSheet = React.memo(({ closeSheet, navigateToExport, navigateToSettings, navigateToMultimeter, navigateToCalculatorList, navigateToMultimeterModal }) => {

    const { saveSurveyHandler, saveAndResetSurveyHandler, onPaywallShow, onMultimeterConnect, connecting, savingInProgress, syncTimeLabel, multimeterLablel, paired, connected, isPro, isVerify } = useSurveyManager({ hideSheet: closeSheet })

    return (
        <View style={styles.mainView}>
            {isPro || isVerify ?
                <MenuListItem
                    title={translateBottomSheet('multimeter')}
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
                    title={translateBottomSheet('upgradePremium')}
                    textStatus='primary'
                    icon='star'
                    iconColor={success}
                    onPress={onPaywallShow} />}
            <MenuListItem
                title={translateBottomSheet('corrosionCalculator')}
                icon='calculator'
                pack='cp'
                onPress={navigateToCalculatorList} />
            <MenuListItem
                title={translateBottomSheet('exportSurvey')}
                icon='download-outline'
                onPress={navigateToExport} />
            <MenuListItem
                disabled={savingInProgress}
                title={translateBottomSheet('saveChanges')}
                subtitle={savingInProgress ? translateBottomSheet('saving') : syncTimeLabel}
                icon={savingInProgress ? 'activityIndicator' : 'save-outline'}
                onPress={saveSurveyHandler} />
            <MenuListItem
                disabled={savingInProgress}
                title={translateBottomSheet('saveChangesAndExit')}
                onPress={saveAndResetSurveyHandler}
                iconColor={danger}
                icon='log-out' />
            <Divider />
            <MenuListItem title={translateBottomSheet('settings')} icon='settings-outline' onPress={navigateToSettings} />
        </View>
    )
})

export default SurveyMenuSheet

export const styles = StyleSheet.create({
    mainView: {
        backgroundColor: control,
    }
})
