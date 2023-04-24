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


const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  const { loading, isCloud, isLoaded, isOnboardingVisible } = useApp()
  if (loading)
    return <SplashScreen />
  else
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          animation: 'fade',
          headerStyle: {
            backgroundColor: 'red',
          },
          header: ({ route, navigation }) => <TopBar screen={route.name} params={route.params} navigation={navigation} />,
        }}>
        {isOnboardingVisible ? <Stack.Screen name='Onboarding' component={OnboardingScreen} /> : null}
        {
          isLoaded ? (
            <>
              <Stack.Screen name='PipelineSurvey' component={SurveyBottomTabs} options={{ headerShown: false }} />
              <Stack.Screen name='ViewItem' component={ViewItem} />

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
              </Stack.Group >
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='Search' component={SearchBar} />
              </Stack.Group>
            </>
          ) : (
            <>
              <Stack.Screen name='Home' component={HomeBottomTabs} initialParams={{ homeScreenCloud: isCloud }} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='CreateSurvey' component={CreateSurvey} />
              </Stack.Group>
            </>
          )
        }
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='Spreadsheet' component={Spreadsheet} initialParams={{ uri: null, title: null }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ animation: 'fade_from_bottom' }}>
          <Stack.Screen name='CalculatorList' component={CalculatorList} />
          <Stack.Screen name='Calculator' component={Calculator} />
          <Stack.Screen name='DevScreen' component={DevScreen} />
          <Stack.Screen name='CalculatorDescription' component={CalculatorDescription} />
          <Stack.Screen name='SettingDetails' component={SettingDetails} />
          <Stack.Screen name='Licenses' component={Licenses} initialParams={{ setting: 'licenses' }} />
        </Stack.Group>
      </Stack.Navigator >
    )
}