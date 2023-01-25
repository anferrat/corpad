import React, { useEffect } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { sendRequest, sendCombinedRequest } from '../api/database/index'
import { genPoints, create_db_tables } from '../helpers/dev_test_point_generator'
import { resetFolder, test } from '../api/files/fs'
import { getReferenceCellList, updateMainReference, createReferenceCell, deleteReferenceCell } from '../app/controllers/survey/other/ReferenceCellController'
import { ItemController } from '../app/controllers/survey/items/ItemController'
import { EventRegister } from 'react-native-event-listeners'

export default DevScreen = ({ navigation }) => {
  const navigate = () =>
    navigation.goBack()

  const jaja = async () => {
    try {
      const repo = new ItemController()
      console.log(!!global.HermesInternal)
      //console.log(await repo.getIdList({ itemType: 'TEST_POINT', sorting: 1, filters: { readingTypeFilter: ['PL'], statusFilter: [], testPointTypeFilter: [], hideEmptyTestPoints: false } }))
    }
    catch (err) {
      console.log('Error', err)
    }
  }

  useEffect(() => {
    const listener = EventRegister.addEventListener('mainReferenceCellChanged', data => console.log('New UPDATE!!!', data))
    jaja()
    return () => {
      EventRegister.removeEventListener(listener)
    }
  }, [])


  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <Text category='h4'>Dev. options</Text>
      <Button onPress={navigate} appearance='ghost'>Back to App</Button>
      <Button onPress={genPoints.bind(this, 50)} appearance='ghost'>Generate test point</Button>
      <Button onPress={create_db_tables} appearance='ghost'>Reset DB</Button>
      <Button onPress={sqlTest} appearance='ghost'>TEST SQL</Button>
      <Button onPress={test} appearance='ghost'>Files test</Button>
      <Button onPress={resetFolder} appearance='ghost'>Files reset</Button>
    </SafeAreaView>
  )
}

const sqlTest = async () => {
  try {
    const test = await sendCombinedRequest([['SELECT', 'TEST_POINT', { testPointId: 1 }], ['SELECT', 'SETTINGS', {}]])
    //console.log(test)
  }
  catch (er) {
    //console.log(er)
  }
}

/*
 <DisplayCard2
        timeModified={Date.now()} // timeModified is used in React.memo to initiate rerender. if doesn't change DisplayCard won't rerender
        status={3}
        onPress={() => { }}
        name='TP#187'
        firstReadingIndex={1}
        dataType='TEST_POINT'
        displayedReading={2}
        subtitle='Test station'
        mainIcon='TS'
        dataList={[{ type: 'timeModified', value: getFormattedDate(Date.now()) }]}
        readingList={[{ uid: '21323', name: 'Card1', iconName: 'PL', readings: 'none' }, { uid: '21322323', name: 'Card2', iconName: 'PL', readings: ['0.554 V', null] }, { uid: '2ads1323', name: 'Card3', iconName: 'AN', readings: ['0.934 V', null] }]}
      />
      */