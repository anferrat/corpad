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

  //used to determine what survey file list screen to load first (cloud or device), or what survey type is currently opened
  const isCloud = useSelector(state => state.settings.currentSurvey.isCloudSurvey)

  //determines if onboarding screen should be shown
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