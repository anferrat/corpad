import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapScreen from '../screens/Map'
import List from '../screens/List'
import { TopBar } from '../features/top_bar/index'
import BottomBarItem from '../features/navigation/components/BottomBarItem'
import { basic300 } from '../styles/colors'
import { useBottomSheetNavigation } from '../hooks/bottom_sheet/useBottomSheetNavigation'

const { Navigator, Screen } = createBottomTabNavigator()

const BottomBar = ({ navigation, state }) => {
    const { openCreateMenu } = useBottomSheetNavigation()
    const onPress = (isFocused, routeName, routeKey) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: routeKey,
            canPreventDefault: true,
        })
        if (!isFocused && !event.defaultPrevented) {

            navigation.navigate({ name: routeName, merge: true })
        }
    }

    return (
        <View style={styles.bar}>
            <BottomBarItem icon='TSS-filled' pack='cp' title='Test points' focused={state.index === 0} onPress={onPress.bind(this, state.index === 0, state.routes[0].name, state.routes[0].key)} />
            <BottomBarItem icon='PL-filled' pack='cp' title='Pipelines' focused={state.index === 1} onPress={onPress.bind(this, state.index === 1, state.routes[1].name, state.routes[1].key)} />
            <BottomBarItem icon='plus-square' title='Add' focused={false} onPress={openCreateMenu} />
            <BottomBarItem icon='globe-2' title='Map' focused={state.index === 2} onPress={onPress.bind(this, state.index === 2, state.routes[2].name, state.routes[2].key)} />
            <BottomBarItem icon='RT-filled' pack='cp' title='Rectifiers' focused={state.index === 3} onPress={onPress.bind(this, state.index === 3, state.routes[3].name, state.routes[3].key)} />
        </View>
    )
}

export default TabNavigator = (props) => {
    const insets = useSafeAreaInsets()
    return (
        <Navigator
            tabBar={props => <BottomBar {...props} />}
            screenOptions={{
                headerShown: true,
                headerStatusBarHeight: insets.top,
                headerStyle: {
                    height: 80,
                },
                header: ({ route, navigation }) => <TopBar screen={route.name} params={route.params} navigation={navigation} />
            }}>
            <Screen name='TestPoints' component={List} initialParams={{ itemType: 'TEST_POINT' }} />
            <Screen name='Pipelines' component={List} initialParams={{ itemType: 'PIPELINE' }} />
            <Screen name='Map' component={MapScreen} options={{ lazy: false }} />
            <Screen name='Rectifiers' component={List} initialParams={{ itemType: 'RECTIFIER' }} options={{ headerStyle: { height: 80 } }} />
        </Navigator>
    )
}


const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#FFF',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: basic300,
    },
})