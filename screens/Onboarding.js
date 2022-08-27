import React from 'react'
import { Icon } from '@ui-kitten/components'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateOnboarding } from '../store/actions/settings'
import Onboarding from 'react-native-onboarding-swiper'
import { basic300, primary } from '../styles/GlobalStyle'
import SingleIconButton from '../components/_Stateless/SingleIconButton'
import { markAsVisited } from '../components/Modals/Onboarding/onboardingRequests'


const OnboardingScreen = () => {
    const dispatch = useDispatch()
    const finishOnboarding = async () => {
        dispatch(updateOnboarding({ main: false }))
        await markAsVisited('main')
    }
    return (
        <>
            <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
            <Onboarding
                DoneButtonComponent={() => <View style={styles.doneButton}><SingleIconButton iconName='checkmark-circle-2' onPress={finishOnboarding} /></View>}
                controlStatusBar={false}
                onSkip={finishOnboarding}
                onDone={finishOnboarding}
                pages={[
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
                        image: <Icon name='onboarding-export' pack='cp' fill={primary} style={styles.icon} />,
                        title: 'Export',
                        subtitle: 'Export your data to spreadsheets or store them as JSON files on your device and cloud storage'
                    }
                ]}
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