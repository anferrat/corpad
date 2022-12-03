import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { BS } from '../../App'
import MapScreen from '../screens/Map'
import List from '../screens/List'
import Header from '../features/navigation/survey_header/SurveyHeader'
import BottomBarItem from '../features/navigation/components/BottomBarItem'
import { updateSetting } from '../store/actions/settings'
import { basic300 } from '../styles/colors'
import { errorHandler } from '../helpers/error_handler'


const { Navigator, Screen } = createBottomTabNavigator()

const BottomBar = ({ navigation, state }) => {
    const bottomSheet = useContext(BS)

    const dispatch = useDispatch()
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
    const openSheet = () => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(3)
        else errorHandler(503)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'create' }))
    }

    return (
        <View style={styles.bar}>
            <BottomBarItem icon='TSS-filled' pack='cp' title='Test points' focused={state.index === 0} onPress={onPress.bind(this, state.index === 0, state.routes[0].name, state.routes[0].key)} />
            <BottomBarItem icon='PL-filled' pack='cp' title='Pipelines' focused={state.index === 1} onPress={onPress.bind(this, state.index === 1, state.routes[1].name, state.routes[1].key)} />
            <BottomBarItem icon='plus-square' title='Add' focused={false} onPress={openSheet} />
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
                header: props => <Header {...props} />
            }}>
            <Screen name='TestPoints' component={List} initialParams={{ dataType: 'TEST_POINT' }} />
            <Screen name='Pipelines' component={List} initialParams={{ dataType: 'PIPELINE' }} />
            <Screen name='Map' component={MapScreen} options={{ headerShown: false }} />
            <Screen name='Rectifiers' component={List} initialParams={{ dataType: 'RECTIFIER' }} options={{ headerStyle: { height: 80 } }} />
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