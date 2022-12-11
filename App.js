import React, { useRef, createContext } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as eva from '@eva-design/eva'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ModalService } from '@ui-kitten/components'
import { AppNavigator } from './src/navigation/AppNavigator'
import { CPIconsPack } from './assets/CPIcons'
import { default as theme } from './src/styles/theme.json'
import item from './src/store/reducers/item'
import potentials from './src/store/reducers/potentials'
import testPointList from './src/store/reducers/testPointList'
import pipelineList from './src/store/reducers/pipelineList'
import subitem from './src/store/reducers/subitem'
import rectifierList from './src/store/reducers/rectifierList'
import map from './src/store/reducers/map'
import settings from './src/store/reducers/settings'
import exportSurvey from './src/store/reducers/exportSurvey'
import surveyList from './src/store/reducers/surveyList'
import importData from './src/store/reducers/importData'
import Sheet from './src/bottom_sheet/Sheet'
import FullScreenLoader from './src/features/overlays/loader/Loader'
import ExportModal from './src/features/overlays/export_modal/ExportModal'
import SessionModal from './src/features/overlays/session_modal/SessionModal'



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

export const version = '1.1'

const App = () => {
  const bottomSheet = useRef()
  const navigationRef = useNavigationContainerRef()
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, CPIconsPack]} />
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
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
