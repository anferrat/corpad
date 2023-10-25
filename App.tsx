import React, { useRef, createContext, MutableRefObject } from 'react'
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
import exportSurvey from './src/store/reducers/export'
import importData from './src/store/reducers/importData'
import { BottomSheet } from './src/bottom_sheet'
import FullScreenLoader from './src/features/overlays/loader/Loader'
import { ExportModal } from './src/features/overlays/export_modal/'
import {SessionModal} from './src/features/overlays/session_modal/'
import { Animated } from 'react-native'
import { enableLatestRenderer } from 'react-native-maps'
import mapLayers from './src/store/reducers/mapLayers'


const rootReducer = combineReducers({
  subitem: subitem,
  potentials: potentials,
  item: item,
  testPointList: testPointList,
  pipelineList: pipelineList,
  rectifierList: rectifierList,
  map: map,
  settings: settings,
  export: exportSurvey,
  importData: importData,
  mapLayers: mapLayers
})

enableLatestRenderer()
const store = createStore(rootReducer)
export const BS = createContext<MutableRefObject<any> | null>(null)
export const ScrollRef = createContext<MutableRefObject<any> | null>(null)

ModalService.setShouldUseTopInsets = true

export const version = '1.4'
export const DEVELOPER_MODE_ON = false

function App(): JSX.Element {
  /*
bottom sheet ref - used to access bottomsheet via imperative methods, passed as ref to BottomSheet component
navigation ref - used to acces navigation methods outside Screens (e.g. global modals, bottom sheet) 
scrolling ref - used to implement title scrolling animation inside View screen. had to bring it all the way up...

  */

  const bottomSheet = useRef()
  const navigationRef = useNavigationContainerRef()
  const scrollingRef = useRef(new Animated.Value(0))
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, CPIconsPack]} />
      <SafeAreaProvider>
        <ApplicationProvider 
          {...eva} 
          theme={{ ...eva.light, ...theme }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollRef.Provider value={scrollingRef}>
              <BS.Provider value={bottomSheet}>
                <NavigationContainer onReady={SplashScreen.hide} ref={navigationRef}>
                <AppNavigator />
                  <BottomSheet ref={bottomSheet} />
                  <FullScreenLoader />
                  <ExportModal 
                    navigationRef={navigationRef} />
                  <SessionModal />
                </NavigationContainer>
              </BS.Provider>
            </ScrollRef.Provider>
          </GestureHandlerRootView>
        </ApplicationProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
