import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BS } from '../../App'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Home from '../screens/SurveyList'
//import Header from '../features/navigation/survey_list_header/SurveyListHeader'
import { TopBar } from '../features/top_bar'
import CloudAuth from '../screens/Authorization'
import NoInternetEmptyComponent from '../features/navigation/components/NoConnectionEmptyScreen'
import BottomBarItem from '../features/navigation/components/BottomBarItem'
import { basic300 } from '../styles/colors'
import { updateSetting } from '../store/actions/settings'

const { Navigator, Screen } = createBottomTabNavigator()

const BottomBar = ({ navigation, state }) => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()

    const openSheet = React.useCallback(() => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(0)
        else errorHandler(503)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'moreOptions' }))
    }, [dispatch])

    const onPress = React.useCallback((isFocused, routeName, routeKey) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: routeKey,
            canPreventDefault: true,
        })
        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: routeName, merge: true })
        }
    }, [navigation])
    return (
        <View style={styles.bar}>
            <BottomBarItem icon='smartphone' title='Device' focused={state.index === 1} onPress={onPress.bind(this, state.index === 1, state.routes[1].name, state.routes[1].key)} />
            <BottomBarItem icon='cloud' pack='cp' title='Cloud' focused={state.index === 0} onPress={onPress.bind(this, state.index === 0, state.routes[0].name, state.routes[0].key)} />
            <BottomBarItem icon='more-horizontal-outline' title='More' focused={false} onPress={openSheet} />
        </View>
    )
}

export default TabNavigator = ({ route }) => {
    const { homeScreenCloud } = route.params
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const isInternetOn = useSelector(state => state.settings.session.isInternetOn)
    const insets = useSafeAreaInsets()
    return (
        <Navigator
            initialRouteName={homeScreenCloud ? 'CloudSurveyList' : 'DeviceSurveyList'}
            tabBar={props => <BottomBar {...props} />}
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

const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#fff',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: basic300,
    },
})