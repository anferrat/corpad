import React from 'react'
import { globalStyle } from '../../styles/styles'
import { View } from 'react-native'
import CycleSettings from '../../features/settings/multimeter/cycle_settings'

export default SettingsScreen = () => {
    return (
        <View style={globalStyle.screen}>
            <CycleSettings />
        </View>
    )
}