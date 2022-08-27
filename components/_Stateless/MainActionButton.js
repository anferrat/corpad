import React, { useState, useEffect } from 'react'
import { androidStyle } from '../../styles/GlobalStyle'
import { Button } from '@ui-kitten/components'
import { Keyboard, Alert } from 'react-native'
import { errorHandler } from '../errorHandler'


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
            style={buttonDisabled || props.disabled ? androidStyle.SaveButtonDisabled : androidStyle.SaveButton}>
            {props.title}</Button>
    )
}

export default React.memo(MainActionButton)