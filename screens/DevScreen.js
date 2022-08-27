import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { exportJSON, sendRequest } from '../database/db'
import { genPoints, create_db_tables } from '../components/testPointGen'
import { resetFolder, test } from '../files/local/fs'


export default HomeScreen = ({ navigation }) => {
  const navigate = () =>
    navigation.goBack()

  return (
    <SafeAreaView style={{ ...androidStyle.AndroidSafeArea, paddingTop: StatusBar.currentHeight }}>
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
    const test = await sendRequest('INSERT', 'TEST_POINT', { uid: 'bla-bla' })
    console.log(test)
  }
  catch (er) {
    console.log(er)
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