import React, { useEffect, useState, useRef } from 'react'
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
import OnboardingScreen from '../screens/Onboarding'
import CreateSurvey from '../components/Home/CreateSurvey/CreateSurvey.js'
import { useDispatch, useSelector } from 'react-redux'
import { isSurveyLoaded } from '../components/surveyManagement.js'
import { loadSession, loadSurveySettings, updateOnboarding } from '../store/actions/settings.js'
import SplashScreen from '../components/_Stateless/SplashScreen.js'
import { getSession, signInSilently, checkConnection } from '../files/cloud/auth.js'
import { gdrive } from '../files/cloud/gd.js'
import NetInfo from '@react-native-community/netinfo'
import { initDataBase, sendRequest } from '../database/db.js'
import ImportItem from '../screens/ImportItem.js'
import ImportDetails from '../screens/ImportDetails.js'
import { clearExported } from '../files/local/fs'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  const dispatch = useDispatch()
  //surveyLoaded - indicates what sets of screen needed to be presented - either home screens with survey lists or survey screens
  const surveyLoaded = useSelector(state => state.settings.currentSurvey.isLoaded)

  //homeScreenCloud - used to determine what type of survey was previously handled. based on that app determines what home screen list to display
  const homeScreenCloud = useSelector(state => state.settings.currentSurvey.homeScreenCloud)

  //OnboardingMain - defines if onboarding screen needs to be presented
  const showOnboarding = useSelector(state => state.settings.onboarding.main)
  const [screenReady, setScreenReady] = useState(false)
  const componentMounted = useRef(true)

  //First useEffect to get all app pre-settings - renders once on app launch!
  useEffect(() => {
    //listener if internet is on
    const netStatus = NetInfo.addEventListener(state => {
      dispatch(loadSession({ isInternetOn: state.isInternetReachable }))
    })

    const initialLoad = async () => {
      // clears exported folder. In future need to change it and allow user to go through exported files and not to delete them
      await clearExported()
      //initialize db and get onboarding values
      const onBoard = await initDataBase()
      if (onBoard !== null) {
        dispatch(updateOnboarding(JSON.parse(onBoard)))
      }
      // check if survey is loaded and dispatch state
      const isLoaded = await isSurveyLoaded()
      if (isLoaded.status === 200)
        if (isLoaded.isLoaded) {
          await sendRequest('DELETE', 'EMPTY') // deletes values with name == NULL. They can appear if exited app in a middle of creating new test item
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
              <Stack.Screen name='SettingDetails' component={SettingDetails} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Group>
              {showOnboarding ? <Stack.Screen name='Onboarding' component={OnboardingScreen} /> : null}
              <Stack.Screen name='Home' component={HomeBottomTabs} initialParams={{ homeScreenCloud: homeScreenCloud }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name='CreateSurvey' component={CreateSurvey} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator >
    )
}