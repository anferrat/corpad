import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { Keyboard } from 'react-native'
import { errorHandler } from '../helpers/error_handler'


const MainActionButton = (props) => {
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const onPressHandler = (valid, validAction, error) => {
        if (valid) {
            validAction()
        }
        else
            errorHandler(error)
    }

    useEffect(() => { // Button at the bottom of the screen can be accidentally pressed when numeric keybord is shown, because there is a gap between buttons and the bottom of the screen (Pixel 4)
        const removeShow = Keyboard.addListener("keyboardDidShow", disableButton)
        const removeHide = Keyboard.addListener("keyboardDidHide", enableButton)
        return () => {
            removeShow.remove()
            removeHide.remove()
        }
    }, [])

    const disableButton = React.useCallback(() => setButtonDisabled(true), [])
    const enableButton = React.useCallback(() => {
        setButtonDisabled(false)
        Keyboard.dismiss()
    }, [setButtonDisabled])

    return (
        <Button
            {...props}
            onPress={onPressHandler.bind(this, props.valid, props.onPress, props.error)}
            disabled={buttonDisabled || props.disabled}
            accessoryLeft={props.icon}
            style={buttonDisabled || props.disabled ? styles.disabled : styles.active}>
            {props.title}</Button>
    )
}

export default React.memo(MainActionButton)

const styles = StyleSheet.create({
    active:
    {
        position: 'absolute',
        bottom: 10,
        left: '2.5%',
        height: 50,
        width: '95%',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    disabled: {
        position: 'absolute',
        bottom: 10,
        left: '2.5%',
        height: 50,
        width: '95%',
        paddingHorizontal: 15,
    }
})