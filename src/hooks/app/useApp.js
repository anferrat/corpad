//Used at the app root (navigation container)
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useOnboardingScreen from "./useOnboardingScreen"
import { addFileUrlListener, addNetworkStatusListener, initializeApp } from "../../app/controllers/AppController"
import { resetCurrentSurveySettings, setSettingsOnAppLoad, setSurveySettings, updateLoader, updateNetworkStatus } from "../../store/actions/settings"
import { errorHandler } from "../../helpers/error_handler"

const useApp = () => {

  //What to display survey control screen or survey file manager screens?
  const isLoaded = useSelector(state => state.settings.currentSurvey.isLoaded)

  //used to determine what survey file screen to load first (cloud or device)
  const isCloud = useSelector(state => state.settings.currentSurvey.isCloudSurvey)

  //determines if onboarding screen shouldd be shown
  const isOnboardingVisible = useOnboardingScreen()

  const [loading, setLoading] = useState(true)

  const componentMounted = useRef(true)

  const dispatch = useDispatch()

  useEffect(() => {
    //fileUrlListener - listens for opened survey files from outside the app and loads them into database
    const urlListener = addFileUrlListener(
      (status) => {
        if (status === 'saving')
          dispatch(updateLoader(true, 'Saving survey', null))
        else if (status === 'loading') {
          dispatch(resetCurrentSurveySettings())
          dispatch(updateLoader(true, 'Loading file', null))
        }
      },
      (er) => {
        errorHandler(er)
        dispatch(updateLoader(false, null, null))
      },
      ({ name, fileName, syncTime, isCloud, isLoaded }) => {
        dispatch(setSurveySettings(name, fileName, syncTime, isCloud, isLoaded))
        dispatch(updateLoader(false, null, null))
      }
    )

    const networkStatus = addNetworkStatusListener(isInternetOn => dispatch(updateNetworkStatus(isInternetOn)))

    //onAppLoad - sets up initial data for database, logs in with Google Drive, checks if survey already loaded
    const onAppLoad = async () => {
      componentMounted.current = true
      const { status, response } = await initializeApp()

      if (status === 200) {
        const { isLoaded, syncTime, name, fileName, isCloud, isSigned, userName, isInternetOn, onboarding } = response
        dispatch(setSettingsOnAppLoad(isLoaded, syncTime, name, fileName, isCloud, isSigned, userName, isInternetOn, onboarding))
        if (componentMounted.current)
          setLoading(false)
      }
    }
    onAppLoad()
    return () => {
      componentMounted.current = false
      urlListener.remove()
      networkStatus()
    }
  }, [])

  return {
    loading,
    isCloud,
    isLoaded,
    isOnboardingVisible
  }

}

export default useApp

/*
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

  */