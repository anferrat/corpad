import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { google } from '../../../components/Icons'
import { primary } from '../../../styles/colors'


const SignInButton = ({ onPress, signing }) => {
    if (signing)
        return <ActivityIndicator
            size={'large'}
            color={primary} />
    return (
        <Button
            accessoryLeft={google}
            onPress={onPress}
            style={styles.button}>
            Sign in with Google Drive
        </Button>)
}

export default SignInButton

const styles = StyleSheet.create({
    button: {
        width: 300
    }
})