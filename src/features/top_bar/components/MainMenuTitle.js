import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { control } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { hapticKeyboardPress } from '../../../native_libs/haptics'

const MainMenuTitle = () => {
    const navigation = useNavigation()
    const goToAbout = () => {
        hapticKeyboardPress()
        navigation.navigate('SettingDetails', { setting: 'about' })
    }
    return (
        <Pressable onPress={goToAbout}>
            <Icon pack='cp' name='logo-text' style={styles.logo} fill={control} />
        </Pressable>
    )
}

export default MainMenuTitle

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 30,
    }
})