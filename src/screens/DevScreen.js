import React from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { TestRepository } from '../app/repository/sqlite/TestRepo'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { InitializePurchases } from '../app/services/purchases/InitializePurchases'
import { geolocationRepo, networkRepo, purchaseRepo, settingRepo } from '../app/controllers/_instances/repositories'
import { permissions } from '../app/controllers/_instances/general_services'
import { useDispatch } from 'react-redux'
import { showPaywall } from '../store/actions/settings'
import { SettingRepository } from '../app/repository/sqlite/SettingRepository'

const settings = new SettingRepository()

const initPurchases = new InitializePurchases(purchaseRepo, networkRepo, geolocationRepo, settingRepo, permissions)

export default DevScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const show = () => dispatch(showPaywall())

  const test = () => {
    settingRepo.updateOfflineCount(2)
  }


  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />
      <Text category='h4' style={{ alignSelf: 'center', paddingBottom: 24 }}>Dev. options</Text>
      <Button onPress={() => navigation.goBack()} appearance='ghost'>Back to App</Button>
      <Button onPress={() => generateTestPoints({ count: 10 })} appearance='ghost'>Generate 10 test points</Button>
      <Button onPress={resetDatabase} appearance='ghost'>Reset DB</Button>
      <Button onPress={show} appearance='ghost'>Show paywall</Button>
      <Button onPress={test} appearance='ghost'>Test count update</Button>

    </SafeAreaView>
  )
}

const sqlTest = async () => {
  try {
    const repo = new TestRepository()
    const result = await repo.test('SELECT * FROM rectifiers')
    //console.log('response: ', result)
  }
  catch (er) {
    //console.log(er)
  }
}