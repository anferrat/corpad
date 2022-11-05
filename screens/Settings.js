import React, { useState, useEffect } from 'react';
import { androidStyle } from '../styles/GlobalStyle';
import { View, InteractionManager } from 'react-native';
import SettingsList from '../components/Settings/SettingsList';
import LoadingView from '../components/_Stateless/Settings/LoadingView';

export default SettingsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 10)
  }, [])

  const navigateToDetails = (setting) => navigation.navigate('SettingDetails', { setting: setting })
  return (
    <View style={androidStyle.AndroidSafeArea}>
      <LoadingView loading={loading}>
        <SettingsList
          navigateToDetails={navigateToDetails} />
      </LoadingView>
    </View>
  )
}