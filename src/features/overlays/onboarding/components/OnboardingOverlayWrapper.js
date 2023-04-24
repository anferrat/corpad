import React from 'react'
import { Modal } from '@ui-kitten/components'
import { StyleSheet, Pressable } from 'react-native'
import useOnboardingOverlay from '../hooks/useOnboardingOverlay'

const OnboardingOverlayWrapper = ({ onboarding, children }) => {
    const { visible, markVisited } = useOnboardingOverlay(onboarding)
    if (visible)
        return (
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={markVisited}
                style={styles.modal}>
                <Pressable
                    style={styles.modal}
                    onPress={markVisited}>
                    {children}
                </Pressable>
            </Modal>
        )
    else return null
}

export default OnboardingOverlayWrapper

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modal: {
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    }
})