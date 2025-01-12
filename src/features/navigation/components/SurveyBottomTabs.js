import React from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const getTabIndex = (index) => index < 2 ? index : index + 1

const getStateIndex = (index) => index < 2 ? index : (index === 2 ? null : index - 1)

const testPointIcon = (props) => <Icon {...props} name='TSS-filled' pack='cp' />

const rectifierIcon = (props) => <Icon {...props} name='RT-filled' pack='cp' />

const pipelineIcon = (props) => <Icon {...props} name='PL-filled' pack='cp' />

const mapIcon = (props) => <Icon {...props} name='globe-2' />

const addIcon = (props) => <Icon {...props} name='plus-square' />

const SurveyBottomTabs = (props) => {
    const { state, navigation, openCreateMenu } = props
    const insets = useSafeAreaInsets()

    const selectedTab = getTabIndex(state.index)

    const onSelect = (index) => {
        if (index !== 2) {
            const stateIndex = getStateIndex(index)
            const isFocused = selectedTab === index
            const routeName = state.routes[stateIndex].name
            const routeKey = state.routes[stateIndex].key
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
            openCreateMenu()
        }
    }

    return (
        <BottomNavigation
            style={{ paddingBottom: insets.bottom }}
            onSelect={onSelect}
            selectedIndex={selectedTab}>
            <BottomNavigationTab title='Test points' icon={testPointIcon} />
            <BottomNavigationTab title='Pipelines' icon={pipelineIcon} />
            <BottomNavigationTab title='Add' icon={addIcon} />
            <BottomNavigationTab title='Map' icon={mapIcon} />
            <BottomNavigationTab title='Rectifiers' icon={rectifierIcon} />
        </BottomNavigation>
    )
}

export default React.memo(SurveyBottomTabs)