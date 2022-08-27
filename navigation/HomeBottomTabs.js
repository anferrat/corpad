import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, View } from 'react-native'
import BottomBarItem from '../components/_Stateless/BottomBarItem'
import { basic300 } from '../styles/GlobalStyle'
import { hapticKeyboardPress } from '../components/_nativeFeatures/haptics'
import Home from '../screens/Home'
import Header from '../components/Home/Header'
import NoInternetEmptyComponent from '../components/_Stateless/NoConnectionEmptyScreen'
import { useSelector } from 'react-redux'
import CloudAuth from '../screens/CloudAuth'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { Navigator, Screen } = createBottomTabNavigator()

const BottomBar = ({ navigation, state }) => {
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
                header: props => <Header {...props} />
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