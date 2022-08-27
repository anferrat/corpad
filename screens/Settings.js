import React from 'react';
import { androidStyle } from '../styles/GlobalStyle';
import { View } from 'react-native';
import SettingsList from '../components/Settings/SettingsList';

export default SettingsScreen = ({ navigation, route }) => {

  const navigateToDetails = (setting) => navigation.navigate('SettingDetails', { setting: setting })
  return (
    <View style={androidStyle.AndroidSafeArea}>
      <SettingsList
        navigateToDetails={navigateToDetails} />
    </View>
  )
}