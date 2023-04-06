import React from 'react'
import { Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Onboarding from 'react-native-onboarding-swiper'
import { updateOnboarding } from '../../../store/actions/settings'
import { basic300, primary } from '../../../styles/colors'
import SingleIconButton from '../../../components/IconButton'
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar'
import { markAsVisited, ONBOARDING_VERSION, onboardingCompleted } from './onboardingRequests'

// onBoarding screen can display either mainPages when app runs for the first time, or astVersionPages when new big update has been released

const OnboardingScreen = () => {
    const displayMain = useSelector(state => state.settings.onboarding.main)
    const dispatch = useDispatch()
    // Shows upon firts app launch
    const mainPages = [
        {
            backgroundColor: basic300,
            image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
            title: 'Welcome to Corpad',
            subtitle: 'Application for corrosion professionals that allows you to create and manage pipeline surveys with your mobile device'
        },
        {
            backgroundColor: basic300,
            image: <Icon name='onboarding-create' pack='cp' fill={primary} style={styles.icon} />,
            title: 'Create',
            subtitle: 'Create new surveys "on the go" or import your data from spreadsheets'
        },
        {
            backgroundColor: basic300,
            image: <Icon name='onboarding-navigate' pack='cp' fill={primary} style={styles.icon} />,
            title: 'Navigate',
            subtitle: `Display test points on the map and import its location to other apps for navigation`
        },
        {
            backgroundColor: basic300,
            image: <Icon name='onboarding-calculator' fill={primary} pack='cp' style={styles.icon} />,
            title: 'Calculate',
            subtitle: 'Calculate resistivity, current and other properties with your phone. Save results or/and export them to spreadsheets.'
        },
        {
            backgroundColor: basic300,
            image: <Icon name='onboarding-export' pack='cp' fill={primary} style={styles.icon} />,
            title: 'Export',
            subtitle: 'Export your data to spreadsheets or store them as JSON files on your device and cloud storage'
        }
    ]
    // Shows after onboarding version update changes
    const lastVersionPages = [
        {
            backgroundColor: basic300,
            image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
            title: 'Updated to version 1.2',
            subtitle: 'Take a look at the fantastic features that are included in this update.'
        },
        {
            backgroundColor: basic300,
            image: <Icon name='file-text' fill={primary} style={styles.icon} />,
            title: 'Import from spreadsheet',
            subtitle: 'Using the new feature to import a complete property list from a spreadsheet, including support for various settings and units, can streamline your survey management.'
        },
        {
            backgroundColor: basic300,
            image: <Icon name='compass' fill={primary} style={styles.icon} />,
            title: 'Compass widget',
            subtitle: 'Incorporating a navigation component that displays the direction towards the selected item can expedite the process of locating test points and rectifiers.'
        },
        {
            backgroundColor: basic300,
            image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
            title: 'Lots of small things',
            subtitle: 'Check https://www.corpad.ca/updates for more info. If you encounter a bug, having issues or have great ideas on how to improve this app, please let me know at andrei@corpad.ca.'
        },
    ]


    const finishOnboarding = async () => {
        dispatch(updateOnboarding({ main: false, versionOnboarding: ONBOARDING_VERSION }))
        if (displayMain)
            await markAsVisited('main')
        await onboardingCompleted()
    }
    return (
        <>
            <FocusAwareStatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
            <Onboarding
                DoneButtonComponent={() => <View style={styles.doneButton}><SingleIconButton iconName='checkmark-circle-2' onPress={finishOnboarding} /></View>}
                controlStatusBar={false}
                onSkip={finishOnboarding}
                onDone={finishOnboarding}
                pages={displayMain ? mainPages : lastVersionPages}
            />
        </>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    icon: {
        width: 150,
        height: 150
    },
    doneButton: {
        marginRight: 12
    }
})