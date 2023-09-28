import React, { useEffect } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { TestRepository } from '../app/repository/sqlite/TestRepo'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { pairMultimeter } from '../app/controllers/MultimeterController'
import { EventRegister } from 'react-native-event-listeners'
import { _PokitMultimeterService } from '../app/services/survey/other/multimeter/_devices/pokitPro/_PokitMultimeterService'
import { useSelector } from 'react-redux'
import { GoogleDriveFileTransferManager } from '../app/repository/cloud_drive/GoogleDriveFileTransferManager'
import RNFS from 'react-native-fs'
import { fileSystemRepo } from '../app/controllers/_instances/repositories'
import { FileSystemLocations } from '../constants/global'
import { readGeoFile } from '../app/controllers/survey/other/MapLayerController'
import { errorHandler } from '../helpers/error_handler'


export default DevScreen = ({ navigation, route }) => {
  const id = useSelector(state => state.settings.activeMultimeter.id)
  const pairTestMultimeter = () => {
    pairMultimeter({ id: 'kkk', multimeterType: 'POKIT', name: 'PokitPro' })
  }

  const testCapture = () => {
    EventRegister.emit('MULTIMETER_START_CAPTURE', { itemId: 1, subitemId: 1, potentialId: 1, measurementType: 'POTENTIALS' })
  }

  const testDownload = async () => {
    const manager = new GoogleDriveFileTransferManager()
    const { jobId, promise } = manager.upload(`${RNFS.DocumentDirectoryPath}/surveys/kuku3.json`, 'kuku3.json', ['1N2ek1TMnwn6R2t-CSqV5cNvrLlgwMY5V'], 'application/json')
    //'1H0L-GYu4zULBis9zeKbs46EA2gljUf8s', `${RNFS.DocumentDirectoryPath}/surveys/kuku3.json`)
    //console.log(await promise)
  }

  const testKml = () => {
    readGeoFile((er, errorMessage) => {
      errorHandler(er)
      console.log(errorMessage)
    })
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
      <Button onPress={testKml} appearance='ghost'>Test KML parser</Button>
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