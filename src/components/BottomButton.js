import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button, Icon } from '@ui-kitten/components'
import { Keyboard } from 'react-native'
import { basic, basic300, control } from '../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const BottomButton = (props) => {
    const { onPress, title, icon, pack, iconPosition } = props
    const [disabled, setDisabled] = useState(false)
    const { bottom } = useSafeAreaInsets()
    const style = disabled || props.disabled ? styles.disabled : styles.active
    // Button at the bottom of the screen can be accidentally pressed when numeric keybord is shown, because there is a gap between buttons and the bottom of the screen (Pixel 4)
    useEffect(() => {
        const removeShow = Keyboard.addListener("keyboardDidShow", disableButton)
        const removeHide = Keyboard.addListener("keyboardDidHide", enableButton)
        return () => {
            removeShow.remove()
            removeHide.remove()
        }
    }, [])

    const disableButton = React.useCallback(() => setDisabled(true), [])
    const enableButton = React.useCallback(() => setDisabled(false), [])

    const accessory = React.useCallback((props) => {
        if (icon)
            if (icon === 'loading')
                return <ActivityIndicator size='small' color={!disabled ? basic : control} {...props} />
            else return (
                <Icon {...props} pack={pack} name={icon} />
            )
        else return null
    }, [disabled, icon])

    return (
        <Button
            {...props}
            onPress={onPress}
            disabled={disabled || props.disabled}
            accessoryRight={iconPosition === 'right' ? accessory : null}
            accessoryLeft={iconPosition === 'right' ? null : accessory}
            style={{ ...style, bottom: bottom + 10 }}>
            {title}
        </Button>
    )
}

export default React.memo(BottomButton)

const styles = StyleSheet.create({
    active:
    {
        position: 'absolute',
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
        backgroundColor: basic300,
    }
})