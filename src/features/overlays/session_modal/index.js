import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal } from '@ui-kitten/components'
import { basic200 } from '../../../styles/colors'
import useSessionModal from './hooks/useSessionModal'
import NoInternetView from './components/NoInternetView'
import SignedView from './components/SignedView'
import NotSignedView from './components/NotSignedView'

export const SessionModal = () => {
    const { isInternetOn, userName, isSigned, isVisible, signing, onSignIn, onSignOut, hideModal } = useSessionModal()

    return (
        <Modal
            onBackdropPress={hideModal}
            style={styles.modal}
            backdropStyle={styles.backdrop}
            visible={isVisible}>
            <View
                style={styles.mainView}>
                {!isInternetOn ? <NoInternetView /> : (
                    isSigned ? <SignedView
                        signing={signing}
                        userName={userName}
                        onSignOut={onSignOut} />
                        : <NotSignedView
                            signing={signing}
                            onSignIn={onSignIn} />
                )}
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: '70%',
        minWidth: 290,
    },
    mainView: {
        backgroundColor: '#fff',
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: basic200,
        paddingTop: 12,
    }
})