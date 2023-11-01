import { useDispatch, useSelector } from "react-redux"
import { useCallback, useState, useEffect, useRef } from 'react'
import { resetExport, setExportFormat, setExportItemType, setExportSorting, toggleExportItemProperty, toggleIncludeAssets, setIncludeMapLayers } from "../../../../store/actions/export"
import { getExportItemProperties } from "../../../../app/controllers/survey/ExportController"
import { errorHandler } from "../../../../helpers/error_handler"
import { ExportFormatTypes, ItemTypes } from "../../../../constants/global"
import { isProStatus } from "../../../../helpers/functions"

const useExportItemProperties = ({ navigateToExportOverview, navigateToExportPotentials, navigateToExportSubitems }) => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
    const itemType = useSelector(state => state.export.itemType)
    const sorting = useSelector(state => state.export.sorting)
    const includeAssets = useSelector(state => state.export.includeAssets)
    const exportType = useSelector(state => state.export.exportType)
    const includeMapLayers = useSelector(state => state.export.includeMapLayers)
    const itemProperties = useSelector(state => state.export.itemProperties)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)
    const formatOptionAvailable = itemType === ItemTypes.TEST_POINT || itemType === ItemTypes.RECTIFIER
    const assetOptionAvailable = (itemType === ItemTypes.TEST_POINT || itemType === ItemTypes.RECTIFIER) && exportType === ExportFormatTypes.CSV && isPro
    const sortingOptionAvailable = exportType !== ExportFormatTypes.KML
    const mapLayerOptionAvailable = exportType === ExportFormatTypes.KML && isPro


    useEffect(() => {
        componentMounted.current = true
        setLoading(true)
        const loadData = async () => {
            const { status, response } = await getExportItemProperties({ itemType })
            if (status === 200) {
                if (componentMounted.current)
                    setProperties(response)
            }
            else errorHandler(status)
            if (componentMounted.current)
                setLoading(false)
        }
        setTimeout(() => loadData(), 20)
        return () => {
            componentMounted.current = false
            dispatch(resetExport())
        }
    }, [itemType])

    const onSelectItemType = useCallback((selectedItemType) => {
        if (selectedItemType !== itemType)
            dispatch(setExportItemType(selectedItemType))
    }, [itemType])

    const onSelectSorting = useCallback((selectedIndex) => {
        dispatch(setExportSorting(selectedIndex))
    }, [])

    const toggleItemProperty = useCallback((property) => {
        dispatch(toggleExportItemProperty(property))
    }, [])

    const setIncludeAssets = useCallback((isChecked) => {
        dispatch(toggleIncludeAssets(isChecked))
    }, [])

    const onSelectExportFormat = useCallback((format) =>
        dispatch(setExportFormat(format)), [])

    const onCheckIncludeMapLayers = useCallback((isChecked) =>
        dispatch(setIncludeMapLayers(isChecked)), [])

    const onNextPress = useCallback(() => {
        if (itemType === 'TEST_POINT')
            navigateToExportPotentials()
        else if (itemType === 'PIPELINE')
            navigateToExportOverview()
        else
            navigateToExportSubitems()
    }, [itemType])

    return {
        itemType,
        sorting,
        itemProperties,
        properties,
        loading,
        assetOptionAvailable,
        includeAssets,
        includeMapLayers,
        exportType,
        formatOptionAvailable,
        sortingOptionAvailable,
        mapLayerOptionAvailable,
        setIncludeAssets,
        onSelectItemType,
        onSelectSorting,
        toggleItemProperty,
        onNextPress,
        onSelectExportFormat,
        onCheckIncludeMapLayers
    }
}

export default useExportItemProperties