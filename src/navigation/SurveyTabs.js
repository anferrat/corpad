import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapScreen from '../screens/Map'
import List from '../screens/List'
import { TopBar } from '../features/top_bar/index'
import { useBottomSheetNavigation } from '../hooks/bottom_sheet/useBottomSheetNavigation'
import { SurveyBottomTabs } from '../features/navigation'

const { Navigator, Screen } = createBottomTabNavigator()

export default TabNavigator = () => {
    const insets = useSafeAreaInsets()
    const { openCreateMenu } = useBottomSheetNavigation()
    return (
        <Navigator
            tabBar={props => (
                <SurveyBottomTabs
                    {...props}
                    openCreateMenu={openCreateMenu} />
            )}
            screenOptions={{
                //insets has to be passed to header from the top, to avoid glitching when swicthing between screens
                headerStatusBarHeight: insets.top,
                header: ({ route, navigation, options }) => <TopBar screen={route.name} params={route.params} navigation={navigation} topInset={options.headerStatusBarHeight} />,
            }}>
            <Screen name='TestPoints' component={List} initialParams={{ itemType: 'TEST_POINT' }} />
            <Screen name='Pipelines' component={List} initialParams={{ itemType: 'PIPELINE' }} />
            <Screen name='Map' component={MapScreen} options={{ lazy: false }} />
            <Screen name='Rectifiers' component={List} initialParams={{ itemType: 'RECTIFIER' }} />
        </Navigator>
    )
}
