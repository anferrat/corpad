import React, { useState, useEffect } from 'react'
import { globalStyle } from '../../styles/styles'
import { View } from 'react-native'
import SettingsList from '../../features/settings/settings_list/SettingsList'
import LoadingView from '../../components/LoadingView'

export default SettingsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 10)
  }, [])

  const navigateToDetails = (setting) => navigation.navigate('SettingDetails', { setting: setting })
  return (
    <View style={globalStyle.screen}>
      <LoadingView loading={loading}>
        <SettingsList
          navigateToDetails={navigateToDetails} />
      </LoadingView>
    </View>
  )
}