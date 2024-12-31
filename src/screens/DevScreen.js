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

export default DevScreen = ({ navigation, route }) => {
  const [time, setTime] = useState(null)
  const [delta, setDelta] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const del = timeService.getDelta()
      setDelta(del)
      const time = Date.now() + (del ?? 0)
      const seconds = new Date(time).getSeconds()
      setTime(seconds)
    }, 20)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const syncGPSTime = () => {
    //timeService.syncTime(TimeSyncSources.NTP)
    Toast.show({
      type: 'multimeterCaptureToast',
      position: 'top',
      autoHide: false,
      swipeable: false,
      props: {
        onTime: 4000,
        offTime: 1000,
        multimeterType: MultimeterTypes.POKIT,
        mType: MeasurementPropertyTypes.POTENTIAL,
        firstCycleOn: true,
        syncMode: MultimeterSyncModes.GPS,
        isSingleRead: false
      }
    })
  }

  const hideToast = () => {
    Toast.hide()
  }

  const makePremium = () => { dispatch(updateSubscriptionStatus(1, Date.now() + 1000000000)) }

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
      <Button onPress={syncGPSTime} appearance='ghost'>Show toast</Button>
      <Button onPress={hideToast} appearance='ghost'>Hide toast</Button>
      <Text>Seconds: {time}, Delta: {delta}</Text>
      <CycleView onTime={5000} offTime={1000} firstCycleOn={false} />
     
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