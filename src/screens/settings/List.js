import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SettingsList } from '../../features/settings/settings_list'

export default SettingsScreen = () => {
  return (
    <SafeAreaView style={globalStyle.screen} edges={['left', 'right']}>
      <SettingsList />
    </SafeAreaView>
  )
}
