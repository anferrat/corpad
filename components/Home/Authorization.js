import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { loadSession } from '../../store/actions/settings'
import { gdrive } from '../../files/cloud/gd'
import { errorHandler } from '../errorHandler'
import { signIn } from '../../files/cloud/auth'
import Button from './Button'



const Authorization = () => {

    const dispatch = useDispatch()

    const onSignHandler = async () => {
        dispatch(loadSession({ signing: true }))
        const signInRequest = await signIn()
        if (signInRequest.status === 200) {
            dispatch(loadSession({ signing: false, isSigned: true, userName: signInRequest.userName }))
            gdrive.accessToken = signInRequest.driveToken
        }
        else {
            errorHandler(signInRequest.status)
            dispatch(loadSession({ signing: false }))
        }
    }

    return (
        <View style={styles.mainView}>
            <Button onPress={onSignHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Authorization