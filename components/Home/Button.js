import React from 'react'
import { ActivityIndicator } from 'react-native'
import { primary } from '../../styles/GlobalStyle'
import SignInButton from '../_Stateless/SignInButton'
import { useSelector } from 'react-redux'

const Button = (props) => {
    const signing = useSelector(state => state.settings.session.signing)
    return (
        <>
            {signing ? <ActivityIndicator size={'large'} color={primary} /> : <SignInButton onPress={props.onPress} />}
        </>
    )
}

export default Button