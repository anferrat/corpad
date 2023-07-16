import React, { useEffect, useState } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { TestRepository } from '../app/repository/sqlite/TestRepo'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { potentialCaptureSetup, addPotentialListener, pairMultimeter } from '../app/controllers/MultimeterController'
import { EventRegister } from 'react-native-event-listeners'


export default DevScreen = ({ navigation, route }) => {
  const pairTestMultimeter = () => {
    pairMultimeter({ id: 'kkk', multimeterType: 'POKIT', name: 'PokitPro' })
  }

  const testCapture = () => {
    EventRegister.emit('MULTIMETER_START_CAPTURE', {itemId: 1, subitemId: 1, potentialId: 1, measurementType: 'POTENTIALS'})
  }

  
  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />
      <Text category='h4' style={{ alignSelf: 'center', paddingBottom: 24 }}>Dev. options</Text>
      <Button onPress={() => navigation.goBack()} appearance='ghost'>Back to App</Button>
      <Button onPress={() => generateTestPoints({ count: 10 })} appearance='ghost'>Generate 10 test points</Button>
      <Button onPress={resetDatabase} appearance='ghost'>Reset DB</Button>
      <Button onPress={testCapture} appearance='ghost'>TEST potential capture</Button>
      <Button onPress={pairTestMultimeter} appearance='ghost'>Pair blank multimeter (restart required)</Button>
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