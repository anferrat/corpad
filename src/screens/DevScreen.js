import React from 'react'
import Share from 'react-native-share'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { sendRequest } from '../api/database/index'
import { genPoints, create_db_tables } from '../helpers/dev_test_point_generator'
import { resetFolder, test } from '../api/files/fs'
import { getSubitemListData } from '../app/controllers/survey/subitems/SubitemController'


const testObj = JSON.parse(`{"version":1,"type":"plsv","data":{"survey":[["8003dcd1-d70a-ca6f-bf31-9a458ee3a686","Yry","Wade Watts"]],"testPoints":[[1, "a5ea8b-e1b6-0ac0-7db5-e32784054ab7","TP1",null,"Bugagag",-122.090987,null,0,0,1674791569082,1674791571299],[2,"9ea4c6e2-1f2c-2f1f-3455-1d75acda7536","TP2",null,null,null,null,0,0,1675042971190,1675042974118]],"rectifiers":[],"pipelines":[[1,"bbd98ab1-7790-3383-ee44-ca7501fb4ee8","Pipeline",null,null,null,null,null,1674635057466,null,null]],"potentialTypes":[[1,"0ed1e078-0961-4a03-f505-9a9f5bde1861","On",0,"PERM_ON"],[2,"0c57b36f-5dab-f1e8-7761-e9d34c2d77d9","Off",0,"PERM_OFF"],[3,"ec798b88-dc41-45a5-bd81-bbb3e5d023e0","Native",0,"PERM_NATIVE"],[4,"64e035af-5074-d1f4-b554-d88f0e7ba640","Connected",0,"PERM_CONNECTED"],[5,"9941c9d6-87da-1b5f-dbf7-c4171303f427","Disconnected",0,"PERM_DISCONNECTED"]],"referenceCells":[[1,"75d921a8-54d7-cb64-8a70-231b47793a06",0,"RC1",1]],"cards":[],"potentials":[],"circuits":[],"sides":[]}}`)

export default DevScreen = ({ navigation, route }) => {
  const navigate = () =>
    navigation.goBack()

  const testBackend = async () => {
    console.log((await getSubitemListData({ itemType: 'TEST_POINT', itemId: 99 })).response)
  }

  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <Text category='h4'>Dev. options</Text>
      <Button onPress={navigate} appearance='ghost'>Back to App</Button>
      <Button onPress={genPoints.bind(this, 50)} appearance='ghost'>Generate test point</Button>
      <Button onPress={create_db_tables} appearance='ghost'>Reset DB</Button>
      <Button onPress={sqlTest} appearance='ghost'>TEST SQL</Button>
      <Button onPress={test} appearance='ghost'>Files test</Button>
      <Button onPress={resetFolder} appearance='ghost'>Files reset</Button>
      <Button onPress={testBackend} appearance='ghost'>TEST backend</Button>
    </SafeAreaView>
  )
}

const sqlTest = async () => {
  try {
    const test = await sendRequest('')
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