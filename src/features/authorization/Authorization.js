import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { loadSession } from '../../store/actions/settings'
import { errorHandler } from '../../helpers/error_handler'
import { signIn } from '../../api/cloud_drive/auth'
import Button from './Button'



const Authorization = () => {

    const dispatch = useDispatch()

    const onSignHandler = async () => {
        dispatch(loadSession({ signing: true }))
        const signInRequest = await signIn()
        if (signInRequest.status === 200) {
            dispatch(loadSession({ signing: false, isSigned: true, userName: signInRequest.userName }))
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