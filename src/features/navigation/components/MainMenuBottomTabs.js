import React from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components"
import { SafeAreaView } from 'react-native'

const MainMenuBottomTabs = (props) => {
    const { state, navigation, openBasicMenu } = props

    const onSelect = (i) => {
        if (i !== 2) {
            //Reversing index - in order to keep device screen first in the menu, while it's second in stack. Order in stack has to stay the same.
            const index = i === 0 ? 1 : 0
            const isFocused = state.index === index
            const routeName = state.routes[index].name
            const routeKey = state.routes[index].key
            const event = navigation.emit({
                type: 'tabPress',
                target: routeKey,
                canPreventDefault: true,
            })
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: routeName, merge: true })
            }
        }
        else {
            openBasicMenu()
        }
    }

    const deviceIcon = (props) => <Icon {...props} name='smartphone' />

    const cloudIcon = (props) => <Icon {...props} name='cloud' pack='cp' />

    const moreIcon = (props) => <Icon {...props} name='more-horizontal-outline' />


    return (
        <SafeAreaView>
            <BottomNavigation
                onSelect={onSelect}
                selectedIndex={state.index === 1 ? 0 : 1}>
                <BottomNavigationTab title='Device' icon={deviceIcon} />
                <BottomNavigationTab title='Cloud' icon={cloudIcon} />
                <BottomNavigationTab title='More' icon={moreIcon} />
            </BottomNavigation>
        </SafeAreaView>
    )
}

export default MainMenuBottomTabs