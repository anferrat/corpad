import React, { useEffect, useState, useRef } from 'react'
import { Linking } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SurveyBottomTabs from './SurveyBottomTabs'
import SettingsScreen from '../screens/Settings'
import ViewItem from '../screens/ViewItem'
import EditItem from '../screens/EditItem'
import EditSubitem from '../screens/EditSubitem'
import DevScreen from '../screens/DevScreen'
import SearchBar from '../components/Survey/SearchBar/SearchBar'
import HomeBottomTabs from './HomeBottomTabs.js'
import SettingDetails from '../screens/SettingDetails'
import TopBar from '../components/Settings/TopBar'
import TopBarCalculator from '../components/Calculator/TopBar'
import OnboardingScreen from '../screens/Onboarding'
import CalculatorList from '../screens/CalculatorList'
import Calculator from '../screens/Calculator'
import CreateSurvey from '../components/Home/CreateSurvey/CreateSurvey.js'
import { useDispatch, useSelector } from 'react-redux'
import { isSurveyLoaded, surveyLoader, saveSurveyHandler } from '../components/surveyManagement.js'
import { loadSession, loadSurveySettings, updateOnboarding, resetCurrentSurveySettings, updateSetting } from '../store/actions/settings.js'
import SplashScreen from '../components/_Stateless/SplashScreen.js'
import { getSession, signInSilently, checkConnection } from '../files/cloud/auth.js'
import { gdrive } from '../files/cloud/gd.js'
import NetInfo from '@react-native-community/netinfo'
import { initDataBase, sendRequest } from '../database/db.js'
import ImportItem from '../screens/ImportItem.js'
import ImportDetails from '../screens/ImportDetails.js'
import { ONBOARDING_VERSION } from '../components/Modals/Onboarding/onboardingRequests'
import { errorHandler, warningHandler } from '../components/errorHandler'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  const dispatch = useDispatch()
  //surveyLoaded - indicates what sets of screen needed to be presented - either home screens with survey lists or survey screens
  const surveyLoaded = useSelector(state => state.settings.currentSurvey.isLoaded)

  //homeScreenCloud - used to determine what type of survey was previously handled. based on that app determines what home screen list to display
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
  }, [])

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
          gdrive.accessToken = session.driveToken
        }
        else {
          dispatch(loadSession({ signing: true, isInternetOn: isInternetOn }))
          const silentSignIn = await signInSilently()
          if (silentSignIn.status === 200) {
            dispatch(loadSession({ signing: false, isSigned: true, userName: session.userName }))
            gdrive.accessToken = silentSignIn.driveToken
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
          headerShown: false,
          animation: 'fade'
        }}>
        {showOnboarding ? <Stack.Screen name='Onboarding' component={OnboardingScreen} /> : null}
        {surveyLoaded ? (
          <>
            <Stack.Group>
              <Stack.Screen name='PipelineSurvey' component={SurveyBottomTabs} />
              <Stack.Screen name='ViewItem' component={ViewItem} />
              <Stack.Screen name='DevScreen' component={DevScreen} />
              <Stack.Screen name='ImportItem' component={ImportItem} />
              <Stack.Screen name='ImportDetails' component={ImportDetails} />
              <Stack.Screen name='EditItem' component={EditItem} />
              <Stack.Screen name='EditSubitem' component={EditSubitem} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name='Search' component={SearchBar} />
            </Stack.Group>
            <Stack.Group screenOptions={{
              headerShown: true,
              animation: 'fade_from_bottom',
              header: props => <TopBar {...props} />
            }}>
              <Stack.Screen name='Settings' component={SettingsScreen} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Group>
              <Stack.Screen name='Home' component={HomeBottomTabs} initialParams={{ homeScreenCloud: homeScreenCloud }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name='CreateSurvey' component={CreateSurvey} />
            </Stack.Group>
          </>
        )}
        <Stack.Group screenOptions={{
          headerShown: true,
          animation: 'fade_from_bottom',
          header: props => <TopBar {...props} />
        }}>
          <Stack.Screen name='SettingDetails' component={SettingDetails} />
        </Stack.Group>
        <Stack.Group screenOptions={{
          headerShown: true,
          animation: 'fade_from_bottom',
          header: props => <TopBarCalculator {...props} />
        }}>
          <Stack.Screen name='CalculatorList' component={CalculatorList} />
          <Stack.Screen name='Calculator' component={Calculator} />
        </Stack.Group>
      </Stack.Navigator >
    )
}