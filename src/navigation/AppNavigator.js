import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SurveyBottomTabs from './SurveyTabs'
import HomeBottomTabs from './MainMenuTabs'
import SettingsScreen from '../screens/settings/List'
import SettingDetails from '../screens/settings/Details'
import ViewItem from '../screens/View'
import EditItem from '../screens/edit/Item'
import EditSubitem from '../screens/edit/Subitem'
import DevScreen from '../screens/DevScreen'
import SearchBar from '../screens/Search'
import OnboardingScreen from '../screens/Onboarding'
import CalculatorList from '../screens/calculator/List'
import Calculator from '../screens/calculator/Calculator'
import CreateSurvey from '../screens/CreateSurvey'
import ImportItem from '../screens/import/Item'
import ImportSubitem from '../screens/import/Subitem'
import ImportFile from '../screens/import/File'
import ImportParameters from '../screens/import/Parameters'
import Spreadsheet from '../screens/Spreadsheet'
import CalculatorDescription from '../screens/calculator/Description'
import { TopBar } from '../features/top_bar'
import SplashScreen from '../features/navigation/components/SplashScreen'
import Licenses from '../screens/settings/Licenses'
import useApp from '../hooks/app/useApp'
import ExportItem from '../screens/export/Item'
import ExportPotentials from '../screens/export/Potentials'
import ExportSubitems from '../screens/export/Subitems'
import ExportOverview from '../screens/export/Overview'
import CycleSettings from '../screens/settings/CycleSettings'
import { MultimeterModal } from '../features/overlays/multimeter'
import EditMapLayer from '../screens/map_layer/Edit'
import ViewMapLayer from '../screens/map_layer/View'
import ViewMarkerInfo from '../screens/map_layer/ViewMarkerInfo'
import Paywall from '../features/overlays/paywall'
import ExternalLink from '../screens/externalLink/ExternalLink'
import FindItem from '../screens/externalLink/FindItem'
import PipelineMatching from '../screens/externalLink/PipelineMatching'


const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  const { loading, isCloud, isLoaded, isOnboardingVisible } = useApp()
  return (
    <>
      {!loading ?
        <>
          <MultimeterModal />
          <Paywall />
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              animation: 'fade',
              //insets has to be passed to header from the top, to avoid glitching when swicthing between screens
              header: ({ route, navigation, options }) => <TopBar screen={route.name} params={route.params} navigation={navigation} topInset={options.headerStatusBarHeight} />,
            }}>
            {isOnboardingVisible ? <Stack.Screen name='Onboarding' component={OnboardingScreen} /> : null}
            {
              isLoaded ? (
                <>
                  <Stack.Screen name='PipelineSurvey' component={SurveyBottomTabs} options={{ headerShown: false }} />
                  <Stack.Screen name='ViewItem' component={ViewItem} />
                  <Stack.Screen name='EditMapLayer' component={EditMapLayer} />
                  <Stack.Screen name='ViewMapLayer' component={ViewMapLayer} />
                  <Stack.Screen name='ViewMarkerInfo' component={ViewMarkerInfo} />
                  <Stack.Screen name='EditItem' component={EditItem} />
                  <Stack.Screen name='EditSubitem' component={EditSubitem} />
                  <Stack.Group screenOptions={{
                    animation: 'fade_from_bottom',
                  }}>
                    <Stack.Screen name='ImportItem' component={ImportItem} />
                    <Stack.Screen name='ImportSubitem' component={ImportSubitem} />
                    <Stack.Screen name='ImportFile' component={ImportFile} />
                    <Stack.Screen name='ImportParameters' component={ImportParameters} />
                    <Stack.Screen name='Settings' component={SettingsScreen} />
                    <Stack.Screen name='ExportItem' component={ExportItem} />
                    <Stack.Screen name='ExportPotentials' component={ExportPotentials} />
                    <Stack.Screen name='ExportSubitems' component={ExportSubitems} />
                    <Stack.Screen name='ExportOverview' component={ExportOverview} />
                  </Stack.Group >
                  <Stack.Group screenOptions={{ animation: 'fade' }}>
                    <Stack.Screen name='Search' component={SearchBar} />
                  </Stack.Group>
                </>
              ) : (
                <>
                  <Stack.Screen name='Home' component={HomeBottomTabs} initialParams={{ homeScreenCloud: isCloud }} />
                  <Stack.Group screenOptions={{ animation: 'fade' }}>
                    <Stack.Screen name='CreateSurvey' component={CreateSurvey} initialParams={{ withImport: false }} />
                  </Stack.Group>
                </>
              )
            }
            <Stack.Group screenOptions={{ animation: 'fade' }}>
              <Stack.Screen name='Spreadsheet' component={Spreadsheet} initialParams={{ uri: null, title: null }} />
              <Stack.Screen name='ExternalLink' component={ExternalLink} initialParams={{ link: null, shouldLog: false }} />
              <Stack.Screen name='FindItemInSurvey' component={FindItem} />
              <Stack.Screen name='PipelineMatching' component={PipelineMatching} />
            </Stack.Group>
            <Stack.Group screenOptions={{ animation: 'fade_from_bottom' }}>
              <Stack.Screen name='CalculatorList' component={CalculatorList} />
              <Stack.Screen name='Calculator' component={Calculator} />
              <Stack.Screen name='DevScreen' component={DevScreen} />
              <Stack.Screen name='CalculatorDescription' component={CalculatorDescription} />
              <Stack.Screen name='SettingDetails' component={SettingDetails} />
              <Stack.Screen name='Licenses' component={Licenses} />
              <Stack.Screen name='CycleSettings' component={CycleSettings} />
            </Stack.Group>
          </Stack.Navigator >
        </> : null}
      <SplashScreen
        loading={loading} />
    </>
  )
}