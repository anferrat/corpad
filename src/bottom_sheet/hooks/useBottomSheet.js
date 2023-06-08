import { useContext, useCallback, useEffect } from "react"
import { AppState, BackHandler } from "react-native"
import { BS } from "../../../App"
import { useNavigation } from "@react-navigation/native"
import { BOTTOM_SHEET_VIEWS } from "../../hooks/bottom_sheet/useBottomSheetNavigation"
import { useSelector } from "react-redux"

const useBottomSheetContent = () => {
    const bottomSheet = useContext(BS)
    const navigation = useNavigation()
    const { itemType, content } = useSelector(state => state.settings.bottomSheetContent)
    const selectedRoute = Object.keys(BOTTOM_SHEET_VIEWS)
        .find(key =>
            BOTTOM_SHEET_VIEWS[key].content === content && BOTTOM_SHEET_VIEWS[key].itemType === itemType)
    const closeSheet = useCallback(() => {
        if (bottomSheet.current?.close)
            bottomSheet.current.close()
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
    }, [])


    const navigateToImport = useCallback(() => {
        closeSheet()
        navigation.navigate('ImportFile')
    }, [navigation])

    const navigateToEdit = useCallback((id, itemType) => {
        closeSheet()
        navigation.navigate(itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines'))
        navigation.navigate('EditItem', { itemId: id, isNew: true, itemType: itemType })
    }, [navigation])

    const navigateToSettings = useCallback(() => {
        navigation.navigate('Settings')
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToExport = useCallback(() => {
        navigation.navigate('ExportItem')
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToExportedFiles = useCallback(() => {
        navigation.navigate('SettingDetails', { setting: 'exportedFiles' })
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToCalculatorList = useCallback(() => {
        navigation.navigate('CalculatorList')
        closeSheet()
    }, [navigation, closeSheet])

    const navigateToMultimeter = useCallback(() => {
        navigation.navigate('SettingDetails', { setting: 'multimeter' })
        closeSheet()
    }, [navigation, closeSheet])

    return {
        selectedRoute,
        navigateToImport,
        navigateToEdit,
        navigateToSettings,
        navigateToExport,
        navigateToExportedFiles,
        navigateToCalculatorList,
        navigateToMultimeter,
        closeSheet
    }
}


export default useBottomSheetContent