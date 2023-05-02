import { useDispatch, useSelector } from "react-redux"
import { useCallback, useState, useEffect, useRef } from 'react'
import { setExportItemType, setExportSorting, toggleExportItemProperty } from "../../../../store/actions/export"
import { getExportItemProperties } from "../../../../app/controllers/survey/ExportController"
import { errorHandler } from "../../../../helpers/error_handler"

const useExportItemProperties = ({ navigateToExportOverview, navigateToExportPotentials, navigateToExportSubitems }) => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const itemType = useSelector(state => state.export.itemType)
    const sorting = useSelector(state => state.export.sorting)
    const itemProperties = useSelector(state => state.export.itemProperties)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)

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
        onSelectItemType,
        onSelectSorting,
        toggleItemProperty,
        onNextPress
    }
}

export default useExportItemProperties