import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useAppLogo } from '../../hooks/useAppLogo'
import { primary } from '../../../../styles/colors'
import { Icon } from '@ui-kitten/components'


const AppLogo = () => {
    const { loading } = useAppLogo()
    if (!loading)
        return <Icon
            pack='cp'
            name='corpad-logo'
            fill={primary}
            style={styles.logo} />
    else return <ActivityIndicator
        style={styles.logo}
        color={primary} />

}

export default AppLogo


const styles = StyleSheet.create({
    logo: {
        width: 26,
        height: 26,
        marginLeft: 12,
        marginRight: 20
    },
})