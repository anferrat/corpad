import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, AppState, BackHandler } from 'react-native'
import { BS } from '../../App'
import { useNavigation } from '@react-navigation/native'
import Sorting from '../features/list/header/sorting/Sorting'
import Readings from '../features/list/header/readings/Readings'
import Filter from '../features/list/header/filter/Filter'
import CreateItemSheet from '../features/create_item/CreateItemSheet'
import MenuSheet from '../features/survey_menu/Menu'
import MoreOptionsSheet from '../features/navigation/more_options/MoreOptionsSheet'
import { errorHandler } from '../helpers/error_handler'

//implemented as single screen, possible to have embeded navigator inside

const BottomSheetContent = () => {
    const appState = useRef(AppState.currentState)
    const bottomSheetContent = useSelector(state => state.settings.bottomSheetContent)
    const bottomSheet = useContext(BS)
    const navigation = useNavigation()
    const closeSheet = React.useCallback(() => {
        if (bottomSheet.current?.close)
            bottomSheet.current.close()
        else errorHandler(503)
    }, [bottomSheet])

    useEffect(() => {
        const subscribeBack = BackHandler.addEventListener('hardwareBackPress', () => {
            closeSheet()
            return false
        })
      /*  const subscribeBlur = AppState.addEventListener("blur", () => {
            closeSheet()
        })*/
        const subscribeBackground = AppState.addEventListener("change", (nextState) => {
            if (nextState === 'background')
                closeSheet()
        })
        return () => {
            subscribeBack.remove()
            subscribeBackground.remove()
           // subscribeBlur.remove()
        }
    }, [appState])

    const isVisible = (itemType, content, bottomSheetContent) =>
        (bottomSheetContent.itemType === itemType && content === bottomSheetContent.content) ? styles.visible : styles.hidden

    const navigateToImport = React.useCallback(() => {
        closeSheet()
        navigation.navigate('ImportFile')
    }, [navigation])

    const navigateToEdit = React.useCallback((id, dataType) => navigation.navigate('EditItem', { itemId: id, isNew: true, dataTypeItem: dataType }), [navigation])

    const navigateToSettings = React.useCallback(() => {
        navigation.navigate('Settings')
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToExport = React.useCallback(() => {
        navigation.navigate('SettingDetails', { setting: 'export' })
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToExportedFiles = React.useCallback(() => {
        navigation.navigate('SettingDetails', { setting: 'exportedFiles' })
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToCalculatorList = React.useCallback(() => {
        navigation.navigate('CalculatorList')
        closeSheet()
    }, [navigation, closeSheet])

    return <>
        <View style={isVisible('TEST_POINT', 'sorting', bottomSheetContent)}>
            <Sorting dataType={'TEST_POINT'} closeSheet={closeSheet} />
        </View>
        <View style={isVisible('TEST_POINT', 'filter', bottomSheetContent)}>
            <Filter dataType={'TEST_POINT'} closeSheet={closeSheet} />
        </View>
        <View style={isVisible('TEST_POINT', 'readings', bottomSheetContent)}>
            <Readings dataType='TEST_POINT' closeSheet={closeSheet} />
        </View>
        <View style={isVisible('RECTIFIER', 'readings', bottomSheetContent)}>
            <Readings dataType='RECTIFIER' closeSheet={closeSheet} />
        </View>
        <View style={isVisible(null, 'create', bottomSheetContent)}>
            <CreateItemSheet navigateToEdit={navigateToEdit} closeSheet={closeSheet} navigateToImport={navigateToImport} />
        </View>
        <View style={isVisible(null, 'menu', bottomSheetContent)}>
            <MenuSheet
                navigateToExport={navigateToExport}
                navigateToCalculatorList={navigateToCalculatorList}
                navigateToSettings={navigateToSettings}
                closeSheet={closeSheet} />
        </View>
        <View style={isVisible(null, 'moreOptions', bottomSheetContent)}>
            <MoreOptionsSheet
                navigateToExportedFiles={navigateToExportedFiles}
                navigateToCalculatorList={navigateToCalculatorList}
                closeSheet={closeSheet} />
        </View>
    </>
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    visible: {
        flex: 1,
        display: 'flex'
    }
})

export default BottomSheetContent

const isVisible = (itemType, content, bottomSheetContent) =>
    bottomSheetContent.itemType === itemType && content === bottomSheetContent.content
