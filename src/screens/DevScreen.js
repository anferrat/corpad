import React, { useEffect, useState } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { updateSubscriptionStatus } from '../store/actions/settings'
import { useDispatch } from 'react-redux'
import { View } from "react-native";
import { CartesianChart, Line, useChartTransformState } from "victory-native";
import montserrat from '../../assets/fonts/Montserrat.ttf'
import { useFont } from '@shopify/react-native-skia'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Dvm2130Service } from '../app/services/survey/other/multimeter/devices/dvm2130/Dvm2130Service'
import { bluetoothRepo } from '../app/controllers/_instances/repositories'
import { MultimeterCaptureRate, MultimeterModes, MultimeterToggleStatuses, MultimeterVoltageRanges } from '../constants/global'


const count = 150

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}))

const service = new Dvm2130Service(bluetoothRepo)

const peripheralId = 'ED:67:6A:29:BC:95'


const connectMM = async () => {
  try {
    await service.start(peripheralId)
  }
  catch (er) {
    console.log(er)
  }
}

const disconnectMM = async () => {
  try {
    await service.stop(peripheralId)
  }
  catch (er) {
    console.log(er)
  }
}


export default DevScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const font = useFont(montserrat, 12)
  const [data, setData] = useState(DATA)
  const [range, setRange] = useState(MultimeterVoltageRanges.DVM2130._250V)
  const [viewport, setViewport] = useState({
    x: [15, 30],
    y: [40, 80],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData(state => state.concat({
        day: state.length,
        highTmp: 40 + 30 * Math.random(),
      })
      )
      setViewport(state => ({ ...state, x: [state.x[0] + 1, state.x[1] + 1] }))
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { state } = useChartTransformState({})
  const makePremium = () => { dispatch(updateSubscriptionStatus(1, Date.now() + 1000000000)) }

  const [xDomain, setXDomain] = useState([0, 10]);

  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />
      <Text category='h4' style={{ alignSelf: 'center', paddingBottom: 24 }}>Dev. options</Text>
      <Button onPress={() => navigation.goBack()} appearance='ghost'>Back to App</Button>
      <Button onPress={() => generateTestPoints({ count })} appearance='ghost'>Generate {count} test points</Button>
      <Button onPress={resetDatabase} appearance='ghost'>Reset DB</Button>
      <Button onPress={makePremium} appearance='ghost'>Make Premium</Button>
      <View style={{ height: 300, borderWidth: 1, }}>
        <CartesianChart
          padding={0}
          data={data}
          xKey="day"
          yKeys={["highTmp"]}
          viewport={viewport}
          transformState={state}
          xAxis={{
            font,
            tickCount: 5,
            formatXLabel: (x) => x + ' day',
            //enableRescaling: true
          }}
          yAxis={[{
            font,
            tickCount: 4
          }]}
          transformConfig={{
            pan: { dimensions: "x" },
          }}
        >
          {({ points }) => (
            <Line points={points.highTmp} color="red" strokeWidth={3} />
          )}
        </CartesianChart>
      </View>
    </SafeAreaView>
  )
}

/*


      */