import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import Sorting from '../../List/Sorting/Sorting'
import { BS } from '../../../App'
import Readings from '../../List/Readings/Readings'
import Filter from '../../List/Filter/Filter'
import CreateItemSheet from '../../Survey/Create/CreateItemSheet'
import { useNavigation } from '@react-navigation/native'
import MenuSheet from '../../Survey/Menu/MenuSheet'
import { errorHandler } from '../../errorHandler'

const BottomSheetContent = () => {
    const bottomSheetContent = useSelector(state => state.settings.bottomSheetContent)
    const bottomSheet = useContext(BS)
    const navigation = useNavigation()
    const closeSheet = React.useCallback(() => {
        if (bottomSheet.current?.close)
            bottomSheet.current.close()
        else errorHandler(503)
    }, [bottomSheet])

    const navigateToImport = React.useCallback(() => {
        closeSheet()
        navigation.navigate('ImportItem')
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

    return <>
        <View style={isVisible('TEST_POINT', 'sorting', bottomSheetContent) ? styles.visible : styles.hidden}>
            <Sorting dataType={'TEST_POINT'} closeSheet={closeSheet} />
        </View>
        <View style={isVisible('TEST_POINT', 'filter', bottomSheetContent) ? styles.visible : styles.hidden}>
            <Filter dataType={'TEST_POINT'} closeSheet={closeSheet} />
        </View>
        <View style={isVisible('TEST_POINT', 'readings', bottomSheetContent) ? styles.visible : styles.hidden}>
            <Readings dataType='TEST_POINT' closeSheet={closeSheet} />
        </View>
        <View style={isVisible('RECTIFIER', 'readings', bottomSheetContent) ? styles.visible : styles.hidden}>
            <Readings dataType='RECTIFIER' closeSheet={closeSheet} />
        </View>
        <View style={isVisible(null, 'create', bottomSheetContent) ? styles.visible : styles.hidden}>
            <CreateItemSheet navigateToEdit={navigateToEdit} closeSheet={closeSheet} navigateToImport={navigateToImport} />
        </View>
        <View style={isVisible(null, 'menu', bottomSheetContent) ? styles.visible : styles.hidden}>
            <MenuSheet
                navigateToExport={navigateToExport}
                navigateToSettings={navigateToSettings}
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
