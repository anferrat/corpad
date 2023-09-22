import { useDispatch, useSelector } from "react-redux"
import { useCallback, useState, useEffect, useRef } from 'react'
import { resetExport, setExportItemType, setExportSorting, toggleExportItemProperty, toggleIncludeAssets } from "../../../../store/actions/export"
import { getExportItemProperties } from "../../../../app/controllers/survey/ExportController"
import { errorHandler } from "../../../../helpers/error_handler"
import { ItemTypes } from "../../../../constants/global"

const useExportItemProperties = ({ navigateToExportOverview, navigateToExportPotentials, navigateToExportSubitems }) => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const itemType = useSelector(state => state.export.itemType)
    const sorting = useSelector(state => state.export.sorting)
    const includeAssets = useSelector(state => state.export.includeAssets)
    const itemProperties = useSelector(state => state.export.itemProperties)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)
    const assetOptionAvailable = itemType === ItemTypes.TEST_POINT || itemType === ItemTypes.RECTIFIER

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
        setIncludeAssets,
        onSelectItemType,
        onSelectSorting,
        toggleItemProperty,
        onNextPress
    }
}

export default useExportItemProperties