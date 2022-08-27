import React from 'react'
import { Button } from '@ui-kitten/components'
import { google } from './Icons'
import { StyleSheet } from 'react-native'


const SignInButton = (props) => {
    return <Button accessoryLeft={google} onPress={props.onPress} style={styles.button}>
        Sign in with Google Drive
    </Button>
}

export default SignInButton

const styles = StyleSheet.create({
    button: {
        width: 300
    }
})