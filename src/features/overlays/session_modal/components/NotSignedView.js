import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'
import { basic400, control } from '../../../../styles/colors'

const NotSignedView = ({ signing, onSignIn }) => {

    const accessory = (props) => {
        if (signing)
            return <ActivityIndicator
                {...props}
                size='small'
                color={control} />
        else
            return <Icon
                {...props}
                name='google' />
    }
    return (
        <>
            <Icon
                style={styles.icon}
                fill={basic400}
                name='cloud-crossed'
                pack='cp' />
            <Text
                style={styles.text} >
                You are not signed in
            </Text>
            <Button
                onPress={onSignIn}
                disabled={signing}
                style={styles.signInButton}
                accessoryLeft={accessory}>
                Sign in with Google Drive
            </Button >
        </>
    )

}

export default NotSignedView


const styles = StyleSheet.create({
    icon: {
        width: 80,
        height: 80,
        marginTop: 12
    },
    text: {
        padding: 12,
        textAlign: 'center'
    },
    signInButton: {
        margin: 12,
        marginBottom: 24,
    }
})