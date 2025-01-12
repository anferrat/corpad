import React, { useEffect, useState } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { TestRepository } from '../app/repository/sqlite/TestRepo'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { setActiveMultimeter, updateSubscriptionStatus } from '../store/actions/settings'
import { pairMultimeter } from '../app/controllers/MultimeterController'
import { PokitProService } from '../app/services/survey/other/multimeter/devices/pokitPro/PokitProService'
import { bluetoothRepo } from '../app/controllers/_instances/repositories'
import { appStateListener, timeService } from '../app/controllers/_instances/general_services'
import { MeasurementPropertyTypes, MultimeterCaptureRate, MultimeterCycles, MultimeterListenerEvents, MultimeterModes, MultimeterReadingTypes, MultimeterSyncModes, MultimeterTypes, MultimeterVoltageRanges, TimeSyncSources } from '../constants/global'
import { PokitProAutoRange } from '../app/services/survey/other/multimeter/devices/pokitPro/services/PokitProAutoRange'
import { Reading } from '../app/entities/survey/multimeter/Reading'
import { CycleListener } from '../app/services/survey/other/multimeter/utils/CycleListener'
import CycleView from '../components/CycleView'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const count = 150

let listener

const pokitProService = new PokitProService(bluetoothRepo, appStateListener)

const cycleListener = new CycleListener(timeService)

const autoRangeService = new PokitProAutoRange()

const reading = new Reading(-0.283, Date.now(), MultimeterReadingTypes.VOLTAGE, 3, null)

const mmId = '28:76:81:A5:C6:27'

const connectMultimeter = async () => {
  try {
    pokitProService.start(mmId)
  }
  catch (er) {
    console.log(er)
  }
}

const disconnectMultimeter = async () => {
  try {
    pokitProService.stop(mmId)
  }
  catch (er) {
    console.log(er)
  }
}


const startCapture = async () => {
  try {
    await pokitProService.setSettings(mmId, MultimeterModes.POKIT.DC_VOLTS, MultimeterVoltageRanges.POKIT._10V, false, MultimeterCaptureRate._60Hz, 2500)
    listener = pokitProService.addListener(mmId, (type, value) => console.log(type, value), (er) => console.log(er))
    //cycleListener.addListener(pokitProService, mmId, (type, value) => console.log(type, value), (er) => console.log(er), MultimeterSyncModes.CYCLED, 2000, 500, MultimeterCycles.ON, 70, 70)
  }
  catch (er) {
    console.log(er)
  }
}

const stopCapture = async () => {
  try {
    await pokitProService.setSettings(mmId, MultimeterModes.POKIT.IDLE)
    listener ? listener.remove() : null
  }
  catch (er) {
    console.log(er)
  }
}



export default DevScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const makePremium = () => { dispatch(updateSubscriptionStatus(1, Date.now() + 1000000000)) }

  const openMMSettings = () => { navigation.navigate('CycleSettings') }

  const pairM = async () => {
    const { status, errorMessage } = await pairMultimeter({ id: mmId, multimeterType: MultimeterTypes.POKIT, name: 'Pokit Pro' })
    console.log(errorMessage)
    if (status === 200)
      dispatch(setActiveMultimeter(true, mmId, 'Pokit Pro', MultimeterTypes.POKIT, false))
  }

  //autoRangeService.execute(MultimeterListenerEvents.SINGLE_READ, reading, MultimeterVoltageRanges.POKIT._250MV, (range) => console.log('NEW RANGE', range), () => { })
  //console.log(reading)


  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />
      <Text category='h4' style={{ alignSelf: 'center', paddingBottom: 24 }}>Dev. options</Text>
      <Button onPress={() => navigation.goBack()} appearance='ghost'>Back to App</Button>
      <Button onPress={() => generateTestPoints({ count })} appearance='ghost'>Generate {count} test points</Button>
      <Button onPress={resetDatabase} appearance='ghost'>Reset DB</Button>
      <Button onPress={makePremium} appearance='ghost'>Make Premium</Button>
      <Button onPress={connectMultimeter} appearance='ghost'>Connect</Button>
      <Button onPress={disconnectMultimeter} appearance='ghost'>Disconnect</Button>
      <Button onPress={startCapture} appearance='ghost'>Start capture</Button>
      <Button onPress={stopCapture} appearance='ghost'>Stop Capture</Button>
      <Button onPress={stopCapture} appearance='ghost'>Stop Capture</Button>
      <Button onPress={openMMSettings} appearance='ghost'>Open mm settings</Button>
      <Button onPress={pairM} appearance='ghost'>Pair Multimeter</Button>
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