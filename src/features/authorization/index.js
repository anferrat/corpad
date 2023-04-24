import React from 'react'
import { View, StyleSheet } from 'react-native'
import useAuthorization from './hooks/useAuthorization'
import SignInButton from './components/SignInButton'
import AuthScreenMessage from './components/AuthScreenMessage'



export const Authorization = () => {
    const { signing, signInHandler } = useAuthorization()
    return (
        <>
            <AuthScreenMessage />
            <View style={styles.mainView}>
                <SignInButton
                    signing={signing}
                    onPress={signInHandler} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})
