import React from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { translateNavigation } from '../../../localization'

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
            <BottomNavigationTab title={translateNavigation('testPoints')} icon={testPointIcon} />
            <BottomNavigationTab title={translateNavigation('pipelines')} icon={pipelineIcon} />
            <BottomNavigationTab title={translateNavigation('add')} icon={addIcon} />
            <BottomNavigationTab title={translateNavigation('map')} icon={mapIcon} />
            <BottomNavigationTab title={translateNavigation('rectifiers')} icon={rectifierIcon} />
        </BottomNavigation>
    )
}

export default React.memo(SurveyBottomTabs)
