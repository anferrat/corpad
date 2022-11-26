import React, { useRef, createContext } from 'react'
import * as eva from '@eva-design/eva'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ModalService } from '@ui-kitten/components'
import { AppNavigator } from './navigation/AppNavigator'
import { CPIconsPack } from './assets/CPIcons'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { default as mapping } from './mapping.json'
import item from './store/reducers/item'
import potentials from './store/reducers/potentials'
import testPointList from './store/reducers/testPointList'
import pipelineList from './store/reducers/pipelineList'
import subitem from './store/reducers/subitem'
import { default as theme } from './constants/theme.json'
import rectifierList from './store/reducers/rectifierList'
import map from './store/reducers/map'
import settings from './store/reducers/settings'
import SplashScreen from 'react-native-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import exportSurvey from './store/reducers/exportSurvey'
import surveyList from './store/reducers/surveyList'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Sheet from './components/Modals/BottomSheet/Sheet'
import FullScreenLoader from './components/Modals/FullScreenLoader'
import ExportModal from './components/Modals/ExportModal'
import SessionModal from './components/Modals/SessionModal'
import importData from './store/reducers/importData'


const rootReducer = combineReducers({
  subitem: subitem,
  potentials: potentials,
  item: item,
  testPointList: testPointList,
  pipelineList: pipelineList,
  rectifierList: rectifierList,
  map: map,
  settings: settings,
  exportSurvey: exportSurvey,
  surveyList: surveyList,
  importData: importData,
})

const store = createStore(rootReducer)
export const BS = createContext()

ModalService.setShouldUseTopInsets = true

const App = () => {
  const bottomSheet = useRef()
  const navigationRef = useNavigationContainerRef()
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, CPIconsPack]} />
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BS.Provider value={bottomSheet}>
              <NavigationContainer onReady={SplashScreen.hide} ref={navigationRef}>
                <AppNavigator />
                <Sheet ref={bottomSheet} />
                <FullScreenLoader />
                <ExportModal navigationRef={navigationRef} />
                <SessionModal />
              </NavigationContainer>
            </BS.Provider>
          </GestureHandlerRootView>
        </ApplicationProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
