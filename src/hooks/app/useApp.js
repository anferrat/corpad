//Used at the app root (navigation container)
import { useState, useRef, useEffect, useCallback, useTransition } from "react"
import { useDispatch, useSelector } from "react-redux"
import useOnboardingScreen from "./useOnboardingScreen"
import { addUrlListener, addNetworkStatusListener, initializeApp } from "../../app/controllers/AppController"
import { resetCurrentSurveySettings, setSettingsOnAppLoad, setSurveySettings, updateLoader, updateNetworkStatus, hideLoader } from "../../store/actions/settings"
import { errorHandler } from "../../helpers/error_handler"
import { SurveyLoadingStatuses, UrlTypes } from "../../constants/global"
import useTimeSync from "./useTimeSync"
import { useNavigation } from '@react-navigation/native'
import { useMultimeterStatus } from "./useMultimeterStatus"

const useApp = () => {

  //What to display survey control screen or survey file manager screens?
  const [isTransitionLoading, startTransition] = useTransition()
  const isLoaded = useSelector(state => state.settings.currentSurvey.isLoaded)

  //used to determine what survey file list screen to load first (cloud or device), or what survey type is currently opened
  const isCloud = useSelector(state => state.settings.currentSurvey.isCloudSurvey)

  //determines if onboarding screen should be shown
  const isOnboardingVisible = useOnboardingScreen()

  useTimeSync()

  useMultimeterStatus()

  const [loading, setLoading] = useState(true)
  const [initialUrlLink, setInitialUrlLink] = useState({
    urlType: null,
    link: null
  })

  const componentMounted = useRef(true)

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const handleExternalDataLink = useCallback((link, urlType) => {
    if (urlType === UrlTypes.DATA_LINK && link)
      navigation.navigate('ExternalLink', { link, shouldLog: true })
  }, [navigation])

  useEffect(() => {
    if (initialUrlLink.urlType && initialUrlLink.link)
      handleExternalDataLink(initialUrlLink.link, initialUrlLink.urlType)
  }, [initialUrlLink])

  useEffect(() => {

    const networkStatus = addNetworkStatusListener(isInternetOn => dispatch(updateNetworkStatus(isInternetOn)))

    //fileUrlListener - listens for opened survey files from outside the app and loads them into database
    const urlListener = addUrlListener(
      (status, errorCode) => {
        if (status === SurveyLoadingStatuses.SAVING) {
          navigation.navigate('PipelineSurvey')
          dispatch(updateLoader('Saving survey', null))
        }
        else if (status === SurveyLoadingStatuses.LOADING) {
          dispatch(resetCurrentSurveySettings())
          dispatch(updateLoader('Loading file', null))
        }
        else if (status === SurveyLoadingStatuses.ERROR)
          errorHandler(errorCode)
      },
      (er) => {
        er !== 101 ? errorHandler(er) : null
        dispatch(hideLoader())
      },
      ({ name, fileName, syncTime, isCloud, isLoaded, uid, urlType, link }) => {
        if (urlType === UrlTypes.FILE) {
          dispatch(setSurveySettings(name, fileName, syncTime, isCloud, isLoaded, uid))
          dispatch(hideLoader())
        }
        else
          handleExternalDataLink(link, urlType)
      }
    )


    //onAppLoad - sets up initial data for database, logs in with Google Drive, checks if survey already loaded
    const onAppLoad = async () => {
      componentMounted.current = true
      const { status, response } = await initializeApp()
      if (status === 200) {
        const { isLoaded, syncTime, name, uid, fileName, isCloud, isSigned, userName, onboarding, multimeter, subscriptionStatus, subscriptionExpirationTime, urlType, link, managementUrl, bleInitialized } = response
        startTransition(() => {
          dispatch(setSettingsOnAppLoad(isLoaded, syncTime, name, uid, fileName, isCloud, isSigned, userName, onboarding, multimeter, subscriptionStatus, subscriptionExpirationTime, managementUrl, bleInitialized))
          if (componentMounted.current) {
            setLoading(false)
            setTimeout(() => setInitialUrlLink({
              urlType,
              link
            }), 500)
          }
        })

      }
    }
    onAppLoad()

    return () => {
      componentMounted.current = false
      if (urlListener.response)
        urlListener.response.remove()
      if (networkStatus)
        networkStatus()
    }
  }, [])

  return {
    loading: loading || isTransitionLoading,
    isCloud,
    isLoaded,
    isOnboardingVisible
  }

}

export default useApp