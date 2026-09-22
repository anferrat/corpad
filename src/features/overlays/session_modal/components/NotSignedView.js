import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'
import { basic400, control } from '../../../../styles/colors'
import { translateOverlay } from '../../../../localization'

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
                {translateOverlay('session.notSignedIn')}
            </Text>
            <Button
                onPress={onSignIn}
                disabled={signing}
                style={styles.signInButton}
                accessoryLeft={accessory}>
                {evaProps => (
                    <Text
                        {...evaProps}
                        numberOfLines={1}
                        style={[evaProps.style, styles.buttonText]}>
                        {translateOverlay('session.signInGoogleDrive')}
                    </Text>
                )}
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
        width: '80%',
        marginBottom: 24
    },
    buttonText: {
        textAlign: 'center',
    }
})
