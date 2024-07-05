import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal } from '@ui-kitten/components'
import { basic200, control } from '../../../styles/colors'
import useSessionModal from './hooks/useSessionModal'
import NoInternetView from './components/NoInternetView'
import SignedView from './components/SignedView'
import NotSignedView from './components/NotSignedView'
import { getModalTop } from '../../../styles/dimensions'

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
        width: '80%',
        minWidth: 290,
        height: 230,
        position: 'absolute',
        top: getModalTop(230),
    },
    mainView: {
        flex: 1,
        backgroundColor: control,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: basic200,
        paddingTop: 12,
    }
})