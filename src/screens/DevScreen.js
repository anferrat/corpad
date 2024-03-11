import React, { useEffect } from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { TestRepository } from '../app/repository/sqlite/TestRepo'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { generateTestPoints, resetDatabase } from '../app/controllers/DevController'
import { InitializePurchases } from '../app/services/purchases/InitializePurchases'
import { geolocationRepo, networkRepo, purchaseRepo, settingRepo, testPointRepo } from '../app/controllers/_instances/repositories'
import { permissions } from '../app/controllers/_instances/general_services'
import { useDispatch } from 'react-redux'
import { setActiveMultimeter, showPaywall, updateSubscriptionStatus } from '../store/actions/settings'
import { SettingRepository } from '../app/repository/sqlite/SettingRepository'
import { LinkEncoder } from '../app/services/byte_converter/encode/LinkEncoder'
import { TestPoint } from '../app/entities/survey/items/TestPoint'
import { Rectifier } from '../app/entities/survey/items/Rectifier'
import { Anode } from '../app/entities/survey/subitems/Anode'
import { Pipeline } from '../app/entities/survey/items/Pipeline'
import { PipelineLead } from '../app/entities/survey/subitems/PipelineLead'
import { Bond } from '../app/entities/survey/subitems/Bond'
import { Coupon } from '../app/entities/survey/subitems/Coupon'
import { Riser } from '../app/entities/survey/subitems/Riser'
import { Shunt } from '../app/entities/survey/subitems/Shunt'
import { Structure } from '../app/entities/survey/subitems/Structure'
import { Potential } from '../app/entities/survey/subitems/Potential'
import { PotentialType } from '../app/entities/survey/other/PotentialType'
import { PermanentPotentialTypes, ReferenceCellTypes } from '../constants/global'
import { ReferenceCell } from '../app/entities/survey/other/ReferenceCell'
import { pairMultimeter } from '../app/controllers/MultimeterController'
import { SoilResistivity } from '../app/entities/survey/subitems/SoilResistivity'
import { TestLead } from '../app/entities/survey/subitems/TestLead'
import { Isolation } from '../app/entities/survey/subitems/Isolation'
import { Circuit } from '../app/entities/survey/subitems/Circuit'
import { AnodeBed } from '../app/entities/survey/subitems/AnodeBed'
import { AnodeBedAnode } from '../app/entities/survey/subitems/AnodeBedAnode'
import { SoilResistivityLayer } from '../app/entities/survey/subitems/SoilResistivityLayer'
import { LinkDecoder } from '../app/services/byte_converter/decode/LinkDecoder'
import { GenerateCompositeItem } from '../app/services/byte_converter/GenerateCompositeItem'
import { DefaultNameRepository } from '../app/repository/sqlite/DefaultNameRepository'
import { DefaultPotentialTypes } from '../app/services/byte_converter/constants/DefaultPotentialTypes'
import { DefaultReferenceCells } from '../app/services/byte_converter/constants/DefaultReferenceCells'
import { SubitemFactory } from '../app/services/other/SubitemFactory'
import { StatReferenceCell } from '../app/entities/survey/subitems/StatReferenceCell'


const settings = new SettingRepository()
const count = 150
const initPurchases = new InitializePurchases(purchaseRepo, networkRepo, geolocationRepo, settingRepo, permissions)

export default DevScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const show = () => dispatch(showPaywall())

  const setupMultimeter = () => {
    const id = '228noname'
    const multimeterType = 'POKIT'
    const name = 'Pokit Pro'
    pairMultimeter({ id, multimeterType, name }, () => { }, () => {
      dispatch(setActiveMultimeter(true, id, name, multimeterType))
    })

  }

  const encode = async () => {
    const pipelines = [
      new Pipeline(1, 'sdsdsds', 'Hui ego znaet', Date.now(), Date.now(), 'Nothis really', 3, null, true, null, null, 0),
      new Pipeline(2, 'lowkey', 'Niche blyat', Date.now(), Date.now(), null, null, null, true, null, null, 0)
    ]

    const referenceCells = [
      new ReferenceCell(1, 'sadsad', 1, 'RC1', true)
    ]

    const potentialTypes = [
      new PotentialType(1, 'asasasa', 'ON', PermanentPotentialTypes.ON, false),
      new PotentialType(2, 'skdskdsd', 'OFF', PermanentPotentialTypes.OFF, false),
      new PotentialType(3, 'aassa', 'Depol', PermanentPotentialTypes.DEPOL, false),
      new PotentialType(4, 'sdsdsds', 'Disc', PermanentPotentialTypes.DISCONNECTED, false),
      new PotentialType(5, 'sdasa', 'Connec', PermanentPotentialTypes.CONNECTED, false)
    ]

    const pipelineLead = new PipelineLead(2, 3, 'sdsdsdsd', 'My Pipe', null, 5, 3)
    pipelineLead.setPotentials([
      new Potential(1, 'asasas', 2, 0.890, 1, 1, true, null),
      new Potential(2, 'dasds', 2, 0.540, 2, 1, true, null),
      new Potential(3, 'sadas', 2, 0.540, 3, 1, true, null),
      new Potential(4, 'dsdsdsds', 2, -0.789, 1, 11, false, null)
    ])

    const testPoint =
      new TestPoint(3, '0bfd7953-e4ff-c758-1729-d91c0c40fcc9', 'MyTP1', 0, Date.now(), Date.now(), 'Nothing to say here', 'In your ass', 51.111936, -114.175154, 1)
    const subitems = [
      new Anode(1, 3, '787hdhujk-2ud-4hy-kski', 'my Anode', 2, 1, 0),
      pipelineLead,
      new Bond(3, 3, 'dsdsdsdsdsdsd', 'Bond 1', true, 1.3, [1], [2], null),
      new Coupon(4, 3, 'dsdsdss', 'Coupon 2', 5, 3, 2, 0, 23, null, 100, null),
      new Riser(5, 3, 'sdsdsds', 'Riser 2', 2, 4),
      new Shunt(6, 3, 'sdsdsdsd', 'Shunt 1', 0.322, 50, 20, true, 3, 15, true, [1], [2], 10),
      new Structure(7, 3, 'assasa', 'Jerr2', 'Nothing here'),
      new TestLead(8, 3, 'dksldks', 'Test lead 1', 4, 3),
      new Isolation(9, 3, 'asasasa', 'IK1', true, 0, true, -0.4, [5], [7]),
      new SoilResistivity(10, 3, 'asasa', 'SR1', 0, 0, 'cidid', [
        new SoilResistivityLayer(1, 'asasa', 10, 2, 5, null, null, null),
        new SoilResistivityLayer(2, 'asasa', 10, 4, 6, null, null, null),
        new SoilResistivityLayer(3, 'asasa', 10, 1, 9, null, null, null)
      ]),
      new StatReferenceCell(11, 3, 'sdsdsdsdsds', 'RefCell', 0, 3, 4)
    ]
    testPoint.setSubitems([])
    const rectifier = new Rectifier(1, '787hdhujk-2ud-4hy-kski', 'hooks', 0, Date.now(), Date.now(), 'Very cool rectifier', 'Cant believe it', 51.111936, -114.175154, 'My basic', 'non34urbusiness', 0, null, null, 2, 43, 2, 4, null, 34)
    rectifier.setSubitems([
      new Circuit(1, 1, 'dasas', 'JKdjdj', null, null, 1, 2, 1.5, 2, null),
      new AnodeBed(1, 1, '2323', 'Bed', 0, 0, 0, [
        new AnodeBedAnode(1, 'asa', 1, 2.2, 3, 4),
        new AnodeBedAnode(2, 'a32a', 1, 2.1, null, null),
        new AnodeBedAnode(3, 'a21sa', 1, 2.7, null, null)])
    ])
    const encoder = new LinkEncoder()
    const decoder = new LinkDecoder()
    const genItem = new GenerateCompositeItem(new DefaultNameRepository(), new DefaultPotentialTypes(), new DefaultReferenceCells(), new SubitemFactory())
    try {
      const link = encoder.encode(testPoint, pipelines, referenceCells, potentialTypes)
      console.log('ENCODED LINK')
      console.log(link)
      navigation.navigate('ExternalLink', { link })
      /*
      const data = decoder.decode(link)
      console.log('DECODED DATA')
      const res = await genItem.execute(data)
      console.log(res.item.subitems)
      */
    }
    catch (er) {
      console.log(er)
    }
  }

  const makePremium = () => { dispatch(updateSubscriptionStatus(1, Date.now() + 1000000000)) }

  const getItem = async () => {
    console.log(await testPointRepo.getAll())
  }

  return (
    <SafeAreaView style={{ ...globalStyle.screen, paddingTop: StatusBar.currentHeight }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />
      <Text category='h4' style={{ alignSelf: 'center', paddingBottom: 24 }}>Dev. options</Text>
      <Button onPress={() => navigation.goBack()} appearance='ghost'>Back to App</Button>
      <Button onPress={async () => {
        await generateTestPoints({ count });
        //console.log('Test points generated')
      }} appearance='ghost'>Generate {count} test points</Button>
      <Button onPress={resetDatabase} appearance='ghost'>Reset DB</Button>
      <Button onPress={makePremium} appearance='ghost'>Make Premium</Button>
      <Button onPress={show} appearance='ghost'>Show paywall</Button>
      <Button onPress={setupMultimeter} appearance='ghost'>Setup multimeter</Button>
      <Button onPress={getItem} appearance='ghost'>Check items</Button>
      <Button onPress={encode} appearance='ghost'>Test encoding</Button>
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