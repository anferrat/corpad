import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { control } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { hapticKeyboardPress } from '../../../native_libs/haptics'
import { useSelector } from 'react-redux'
import { isProStatus, isVerifyStatus } from '../../../helpers/functions'

const MainMenuTitle = () => {
    const navigation = useNavigation()
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
    const isVerify = isVerifyStatus(subscriptionStatus)
    const goToAbout = () => {
        hapticKeyboardPress()
        navigation.navigate('SettingDetails', { setting: 'about' })
    }
    return (
        <Pressable
            style={styles.pressable}
            onPress={goToAbout}>{
                isPro || isVerify ?
                    <Icon pack='cp' name='pro-label' style={styles.proLabel} fill={control} /> :
                    <Icon pack='cp' name='logo-text' style={styles.logo} fill={control} />}
        </Pressable>
    )
}

export default MainMenuTitle

const styles = StyleSheet.create({
    logo: {
        width: 116,
        height: 35,
    },
    pressable: {
        flexDirection: 'row',
    },
    proLabel: {
        width: 136,
        height: 35,
    }
})