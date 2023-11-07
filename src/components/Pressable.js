import React from 'react'
import { Pressable as PressableDefault } from 'react-native'
import { pressable } from '../styles/styles'

const Pressable = (props) => {
    const { isPrimary, android_ripple } = props
    return <PressableDefault
        {...props}
        style={({ pressed }) => pressed && android_ripple ? [props.style, isPrimary ? pressable.pressedPrimary : pressable.pressed] : props.style} />
}

export default React.memo(Pressable)

