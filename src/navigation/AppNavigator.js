import React, { useEffect, useState, useRef } from 'react'
import { Linking } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NetInfo from '@react-native-community/netinfo'
import { useDispatch, useSelector } from 'react-redux'
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
import ImportFile from '../screens/import/File'
import ImportParameters from '../screens/import/Parameters'
import Spreadsheet from '../screens/Spreadsheet'
import CalculatorDescription from '../screens/calculator/Description'
import { TopBar } from '../features/top_bar'
import { isSurveyLoaded, surveyLoader, saveSurveyHandler } from '../services/survey/manager'
import { loadSession, loadSurveySettings, updateOnboarding, resetCurrentSurveySettings, updateSetting } from '../store/actions/settings'
import SplashScreen from '../features/navigation/components/SplashScreen'
import { getSession, signInSilently } from '../api/cloud_drive/auth'
import { checkConnection } from '../api/cloud_drive/netinfo'
import { sendRequest } from '../api/database/index'
import { initDataBase } from '../services/database/initDataBase'
import { Onboarding, ONBOARDING_VERSION } from '../features/overlays/onboarding/'
import { errorHandler, warningHandler } from '../helpers/error_handler'
import Licenses from '../screens/settings/Licenses'


const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  const dispatch = useDispatch()
  //surveyLoaded - indicates what sets of screen needed to be presented - either home screens with survey lists or survey screens
  const surveyLoaded = useSelector(state => state.settings.currentSurvey.isLoaded)

  //homeScreenCloud - used to determine what type of survey was previously handled. based on that, app determines what home screen list to display
  const homeScreenCloud = useSelector(state => state.settings.currentSurvey.homeScreenCloud)

  //OnboardingMain - defines if onboarding screen needs to be presented
  const showOnboarding = useSelector(state => state.settings.onboarding.main || (state.settings.onboarding.versionOnboarding !== ONBOARDING_VERSION))
  const [screenReady, setScreenReady] = useState(false)
  const componentMounted = useRef(true)

  const openExternalFile = async (uri) => {
    const externalSurveyOpening = await surveyLoader(uri, 'external', null)
    if (externalSurveyOpening.status === 200) {
      dispatch(loadSurveySettings({
        isLoaded: true,
        name: externalSurveyOpening.name,
        fileName: externalSurveyOpening.fileName,
        isCloudSurvey: externalSurveyOpening.isCloud,
        syncTime: externalSurveyOpening.syncTime
      }))
    }
    else errorHandler(externalSurveyOpening.status)
  }

  const loadExternalSurvey = React.useCallback(async (uri) => {
    // Loads external survey into the app, saves old survey to the memory

    if (uri !== null) {
      dispatch(updateSetting('loader', { title: 'Loading external file', visible: true }))
      const isLoaded = await isSurveyLoaded()
      if (isLoaded.status === 200)
        if (isLoaded.isLoaded) {
          const confirm = await warningHandler(13, 'Proceed', 'Cancel')
          if (confirm) {
            dispatch(updateSetting('loader', { title: 'Saving', visible: true, text: isLoaded.fileName }))
            const currentSurveySaving = await saveSurveyHandler()
            if (currentSurveySaving.status === 200) {
              dispatch(resetCurrentSurveySettings())
              dispatch(updateSetting('loader', { title: 'Opening', visible: true }))
              await openExternalFile(uri)
            }
            else errorHandler(currentSurveySaving.status)
            dispatch(updateSetting('loader', { visible: false }))
          }
        }
        else {
          dispatch(updateSetting('loader', { title: 'Opening', visible: true }))
          await openExternalFile(uri)
        }
      else errorHandler(isLoaded.status)
      dispatch(updateSetting('loader', { visible: false }))
    }
  }, [dispatch])

  //First useEffect to get all app pre-settings - renders once on app launch!
  useEffect(() => {

    //listener if internet is on
    const netStatus = NetInfo.addEventListener(state => {
      dispatch(loadSession({ isInternetOn: state.isInternetReachable }))
    })
    const recievedUrl = Linking.addEventListener('url', (url) => loadExternalSurvey(url.url))

    const initialLoad = async () => {
      const initialUrl = await Linking.getInitialURL()
      //console.log('Link ', initialUrl)

      //initialize db and get onboarding values
      const onBoard = await initDataBase()
      if (onBoard !== null) {
        dispatch(updateOnboarding(JSON.parse(onBoard)))
      }
      // check if survey is loaded and dispatch state
      if (initialUrl !== null)
        await loadExternalSurvey(initialUrl)
      const isLoaded = await isSurveyLoaded()
      if (isLoaded.status === 200)
        if (isLoaded.isLoaded) {
          // deletes values with name == NULL. They can appear if exited app in a middle of creating new test item, need to re-work this
          await sendRequest('DELETE', 'EMPTY', [{ table: 'testPoints' }, { table: 'rectifiers' }, { table: 'pipelines' }, { table: 'cards' }, { table: 'circuits' }])
          dispatch(loadSurveySettings({
            isLoaded: true,
            name: isLoaded.name,
            fileName: isLoaded.fileName,
            isCloudSurvey: isLoaded.isCloud,
            syncTime: isLoaded.syncTime,
          }))
        }

      const isInternetOn = (await checkConnection()).status === 200
      //try to get info from current session if user is signed in, or try to sign in silently
      const session = await getSession()
      if (session.status === 200)
        if (session.isSigned) {
          dispatch(loadSession({ isSigned: true, userName: session.userName, isInternetOn: isInternetOn }))
        }
        else {
          dispatch(loadSession({ signing: true, isInternetOn: isInternetOn }))
          const silentSignIn = await signInSilently()
          if (silentSignIn.status === 200) {
            dispatch(loadSession({ signing: false, isSigned: true, userName: session.userName }))
          }
          else
            dispatch(loadSession({ signing: false, isSigned: false }))
        }
      else dispatch(loadSession({ isInternetOn: isInternetOn }))
      if (componentMounted.current)
        setScreenReady(true)
    }
    initialLoad()
    return () => {
      netStatus()
      componentMounted.current = false
      recievedUrl.remove()
    }
  }, [])
  if (!screenReady)
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
          header: ({ route, navigation }) => <>
            <Onboarding screen={route.name} params={route.params} />
            <TopBar screen={route.name} params={route.params} navigation={navigation} />
          </>,
        }}>
        {showOnboarding ? <Stack.Screen name='Onboarding' component={OnboardingScreen} /> : null}
        {
          surveyLoaded ? (
            <>
              <Stack.Screen name='PipelineSurvey' component={SurveyBottomTabs} options={{ headerShown: false }} />
              <Stack.Screen name='ViewItem' component={ViewItem} />
              <Stack.Screen name='DevScreen' component={DevScreen} />
              <Stack.Screen name='EditItem' component={EditItem} />
              <Stack.Screen name='EditSubitem' component={EditSubitem} />
              <Stack.Group screenOptions={{
                animation: 'fade_from_bottom',
              }}>
                <Stack.Screen name='ImportItem' component={ImportItem} />
                <Stack.Screen name='ImportSubitem' component={ImportItem} />
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
              <Stack.Screen name='Home' component={HomeBottomTabs} initialParams={{ homeScreenCloud: homeScreenCloud }} />
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
          <Stack.Screen name='CalculatorDescription' component={CalculatorDescription} />
          <Stack.Screen name='SettingDetails' component={SettingDetails} />
          <Stack.Screen name='Licenses' component={Licenses} initialParams={{ setting: 'licenses' }} />
        </Stack.Group>
      </Stack.Navigator >
    )
}