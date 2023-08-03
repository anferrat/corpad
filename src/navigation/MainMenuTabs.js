import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/SurveyList'
import { TopBar } from '../features/top_bar'
import CloudAuth from '../screens/Authorization'
import NoInternetEmptyComponent from '../features/navigation/components/NoConnectionEmptyScreen'
import { MainMenuBottomTabs } from '../features/navigation'
import useSurveyListBottomTabs from '../hooks/app/useSurveyListBottomTabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { Navigator, Screen } = createBottomTabNavigator()


export default TabNavigator = () => {
    const { isCloudSurvey, openBasicMenu, isSigned, isInternetOn } = useSurveyListBottomTabs()
    const insets = useSafeAreaInsets()
    return (
        <Navigator
            initialRouteName={isCloudSurvey ? 'CloudSurveyList' : 'DeviceSurveyList'}
            tabBar={props => <MainMenuBottomTabs {...props} openBasicMenu={openBasicMenu} />}
            screenOptions={{
                //insets has to be passed to header from the top, to avoid glitching when swicthing between screens
                headerStatusBarHeight: insets.top,
                header: ({ route, navigation, options }) => <TopBar screen={route.name} params={route.params} navigation={navigation} topInset={options.headerStatusBarHeight} />
            }}>
            {
                isInternetOn ? (
                    isSigned ? (
                        <Screen name='CloudSurveyList' component={Home} initialParams={{ isCloud: true }} />
                    ) : (
                        <Screen name='Authorization' component={CloudAuth} />
                    )) :
                    <Screen name='NoInternetScreen' component={NoInternetEmptyComponent} />
            }
            <Screen name='DeviceSurveyList' component={Home} initialParams={{ isCloud: false }} />
        </Navigator >
    )
}