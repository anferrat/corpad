import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { SettingsList } from '../../features/settings/settings_list'

export default SettingsScreen = () => {
  return (
    <SafeAreaView style={globalStyle.screen}>
      <SettingsList />
    </SafeAreaView>
  )
}