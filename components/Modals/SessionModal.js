import React from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Text, Modal, ListItem } from '@ui-kitten/components'
import { loadSession } from '../../store/actions/settings'
import { basic400, success, primary, basic200 } from '../../styles/GlobalStyle'
import { signIn, signOut } from '../../files/cloud/auth'
import { gdrive } from '../../files/cloud/gd'
import { errorHandler } from '../errorHandler'
import { google, person } from '../_Stateless/Icons'

const SessionModal = () => {
    const dispatch = useDispatch()
    const isInternetOn = useSelector(state => state.settings.session.isInternetOn)
    const userName = useSelector(state => state.settings.session.userName)
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const isVisible = useSelector(state => state.settings.session.sessionModalVisible)
    const signing = useSelector(state => state.settings.session.signing)


    const hideModal = React.useCallback(() => dispatch(loadSession({ sessionModalVisible: false })), [dispatch])

    const onSignInHandler = React.useCallback(async () => {
        hideModal()
        const onSignIn = await signIn()
        if (onSignIn.status === 200) {
            gdrive.accessToken = onSignIn.driveToken
            dispatch(loadSession({ userName: onSignIn.userName, signing: false, isSigned: true }))
            ToastAndroid.show(`Signed as ${onSignIn.userName}`, ToastAndroid.SHORT)
        }
        else errorHandler(onSignIn.status)
    }, [dispatch])

    const onSignOutHandler = React.useCallback(async () => {
        hideModal()
        const onSignOut = await signOut()
        if (onSignOut.status === 200) {
            dispatch(loadSession({ signing: false, isSigned: false, userName: null }))
            gdrive.accessToken = null
        }
        else errorHandler(onSignOut.status)
    }, [dispatch])

    return (
        <Modal
            onBackdropPress={hideModal}
            style={styles.modal}
            backdropStyle={styles.backdrop}
            visible={isVisible}>
            <View style={styles.mainView}>
                {isInternetOn ? (
                    isSigned ? (
                        <>
                            <Icon style={styles.iconSmall} fill={primary} name='cloud' pack='cp' />
                            <Text category={'h6'} style={styles.title}>
                                Cloud storage
                            </Text>
                            <ListItem
                                title={userName}
                                accessoryLeft={person}
                                description='Google Drive'
                                accessoryRight={(props) => <Icon style={props.style} fill={success} name='checkmark' />} />
                            <Button
                                style={styles.signOutButton}
                                onPress={onSignOutHandler}
                                status={'danger'}
                                appearance='ghost'>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Icon style={styles.icon} fill={basic400} name='cloud-crossed' pack='cp' />
                            <Text style={styles.text} >You are not signed in</Text>
                            <Button
                                onPress={onSignInHandler}
                                disabled={signing}
                                style={styles.signInButton}
                                accessoryLeft={google}>
                                Log in with Google Drive
                            </Button>
                        </>
                    )
                ) :
                    (
                        <>
                            <Icon style={styles.icon} fill={basic400} name='wifi-off' />
                            <Text style={styles.text}>Oops! No interent...</Text>
                        </>
                    )
                }
            </View>
        </Modal >
    )

}

export default SessionModal



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
    },
    icon: {
        width: 100,
        height: 100,
        marginTop: 12
    },
    iconSmall: {
        width: 50,
        height: 50,
        marginTop: 12
    },
    text: {
        padding: 12,
        textAlign: 'center'
    },
    signInButton: {
        margin: 12,
        marginBottom: 24,
    },
    signOutButton: {
        width: '100%',
        height: 60
    },
    title: {
        marginBottom: 12
    }
})