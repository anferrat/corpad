import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Home from '../screens/SurveyList'
import { TopBar } from '../features/top_bar'
import CloudAuth from '../screens/Authorization'
import NoInternetEmptyComponent from '../features/navigation/components/NoConnectionEmptyScreen'
import { MainMenuBottomTabs } from '../features/navigation'
import useSurveyListBottomTabs from '../hooks/app/useSurveyListBottomTabs'

const { Navigator, Screen } = createBottomTabNavigator()


export default TabNavigator = () => {
    const { isCloudSurvey, openBasicMenu, isSigned, isInternetOn } = useSurveyListBottomTabs()
    const insets = useSafeAreaInsets()

    return (
        <Navigator
            initialRouteName={isCloudSurvey ? 'CloudSurveyList' : 'DeviceSurveyList'}
            tabBar={props => <MainMenuBottomTabs {...props} openBasicMenu={openBasicMenu} />}
            screenOptions={{
                headerStatusBarHeight: insets.top,
                header: ({ route, navigation }) => <TopBar screen={route.name} params={route.params} navigation={navigation} />
            }}>
            {isInternetOn ? (
                isSigned ? (
                    <Screen name='CloudSurveyList' component={Home} initialParams={{ isCloud: true }} />
                ) : (
                    <Screen name='Authorization' component={CloudAuth} />
                )) :
                <Screen name='NoInternetScreen' component={NoInternetEmptyComponent} />
            }
            <Screen name='DeviceSurveyList' component={Home} initialParams={{ isCloud: false }} />
        </Navigator>
    )
}