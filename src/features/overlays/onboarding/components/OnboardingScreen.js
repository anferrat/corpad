import React from 'react'
import { View, StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import IconButton from '../../../../components/IconButton'
import FocusAwareStatusBar from '../../../../components/FocusAwareStatusBar'
import useOnboardingScreen from '../hooks/useOnboardingScreen'
import { mainPages, lastVersionPages } from './OnboardingScreenContent'

// onBoarding screen can display either mainPages when app runs for the first time, or astVersionPages when new big update has been released

const OnboardingScreen = () => {
    const { primary, markVisited } = useOnboardingScreen()

    return (
        <>
            <FocusAwareStatusBar
                translucent={true}
                backgroundColor='transparent'
                barStyle='dark-content' />
            <Onboarding
                DoneButtonComponent={
                    () => (
                        <View
                            style={styles.doneButton}>
                            <IconButton
                                iconName='checkmark-circle-2'
                                onPress={markVisited} />
                        </View>
                    )}
                controlStatusBar={false}
                onSkip={markVisited}
                onDone={markVisited}
                pages={primary ? mainPages : lastVersionPages}
            />
        </>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    doneButton: {
        marginRight: 12
    }
})