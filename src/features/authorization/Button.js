import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { primary } from '../../styles/colors'
import SignInButton from './components/SignInButton'


const Button = (props) => {
    const signing = useSelector(state => state.settings.session.signing)
    return (
        <>
            {signing ? <ActivityIndicator size={'large'} color={primary} /> : <SignInButton onPress={props.onPress} />}
        </>
    )
}

export default Button