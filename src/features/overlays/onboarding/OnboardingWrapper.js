import React, { useState } from 'react'
import { Modal } from '@ui-kitten/components'
import { StyleSheet, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateOnboarding } from '../../../store/actions/settings'
import { markAsVisited } from './onboardingRequests'

const OnboardingWrapper = (props) => {
    const [visible, setVisible] = useState(true)
    const display = useSelector(state => state.settings.onboarding[props.onboarding])
    const dispatch = useDispatch()
    const hideOverlay = async () => {
        setVisible(false)
        dispatch(updateOnboarding({ [props.onboarding]: false }))
        await markAsVisited(props.onboarding)
    }
    if (display)
        return (
            <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={hideOverlay} style={styles.modal}>
                <Pressable style={styles.modal} onPress={hideOverlay}>
                    {props.children}
                </Pressable>
            </Modal>
        )
    else return null
}

export default OnboardingWrapper

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