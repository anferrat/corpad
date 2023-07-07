import React, { useEffect, useState } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar, Platform } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { TestRepository } from '../app/repository/sqlite/TestRepo'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { potentialCaptureSetup, addPotentialListener, pairMultimeter } from '../app/controllers/MultimeterController'
import Geolocation from '@react-native-community/geolocation'
import { errorHandler } from '../helpers/error_handler'
import { useSelector } from 'react-redux'

Geolocation.setRNConfiguration({ skipPermissionRequests: true, locationProvider: 'android' })
const testObj = JSON.parse(`{"version":1,"type":"plsv","data":{"survey":[["8003dcd1-d70a-ca6f-bf31-9a458ee3a686","Yry","Wade Watts"]],"testPoints":[[1, "a5ea8b-e1b6-0ac0-7db5-e32784054ab7","TP1",null,"Bugagag",-122.090987,null,0,0,1674791569082,1674791571299],[2,"9ea4c6e2-1f2c-2f1f-3455-1d75acda7536","TP2",null,null,null,null,0,0,1675042971190,1675042974118]],"rectifiers":[],"pipelines":[[1,"bbd98ab1-7790-3383-ee44-ca7501fb4ee8","Pipeline",null,null,null,null,null,1674635057466,null,null]],"potentialTypes":[[1,"0ed1e078-0961-4a03-f505-9a9f5bde1861","On",0,"PERM_ON"],[2,"0c57b36f-5dab-f1e8-7761-e9d34c2d77d9","Off",0,"PERM_OFF"],[3,"ec798b88-dc41-45a5-bd81-bbb3e5d023e0","Native",0,"PERM_NATIVE"],[4,"64e035af-5074-d1f4-b554-d88f0e7ba640","Connected",0,"PERM_CONNECTED"],[5,"9941c9d6-87da-1b5f-dbf7-c4171303f427","Disconnected",0,"PERM_DISCONNECTED"]],"referenceCells":[[1,"75d921a8-54d7-cb64-8a70-231b47793a06",0,"RC1",1]],"cards":[],"potentials":[],"circuits":[],"sides":[]}}`)

export default DevScreen = ({ navigation, route }) => {
  const [multimeter, setMultimeter] = useState()
  const [value, setValue] = useState({ on: null, off: null })
  const t = useSelector(state => state.settings.timeAdjustment)
  console.log(t)
  const navigate = () =>
    navigation.goBack()

  const startCapture = async () => {
    try {
      const { response, status } = await potentialCaptureSetup()
      if (status === 200)
        setMultimeter(response)
    }
    catch (er) {
      console.log('Error', er)
    }
  }

  const testGeo = () => {
    Geolocation.getCurrentPosition((data) => {
      const jsTime = Date.now()
      errorHandler(`JS: ${jsTime}, GNSS: ${data.timestamp}, diff: ${jsTime - data.timestamp}`)
    },
      () => { }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 50 })
  }

  const pairTestMultimeter = () => {
    pairMultimeter({ id: 'kkk', multimeterType: 'POKIT', name: 'PokitPro' })
  }

  useEffect(() => {
    const removeListener = multimeter ? addPotentialListener((cycle, value) => {
      setValue(state => ({
        ...state,
        on: cycle ? value : state.on,
        off: !cycle ? value : state.off
      }))
    }, { ...multimeter, timeAdjustment: t.recoreded ? t.device - t.gnss : 0 }) : false
    return () => {
      if (removeListener)
        removeListener.response()
    }
  }, [multimeter])


  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />
      <Text category='h4' style={{ alignSelf: 'center', paddingBottom: 24 }}>Dev. options</Text>
      <Button onPress={navigate} appearance='ghost'>Back to App</Button>
      <Button onPress={() => generateTestPoints({ count: 10 })} appearance='ghost'>Generate test point</Button>
      <Button onPress={resetDatabase} appearance='ghost'>Reset DB</Button>
      <Button onPress={sqlTest} appearance='ghost'>TEST SQL</Button>
      <Button onPress={startCapture} appearance='ghost'>TEST potential capture</Button>
      <Text>ON: {value.on} OFF: {value.off}</Text>
      <Button onPress={testGeo} appearance='ghost'>TEST Location</Button>
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