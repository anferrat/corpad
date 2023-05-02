import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExportSubitemProperties } from '../../../../app/controllers/survey/ExportController'
import { errorHandler } from '../../../../helpers/error_handler'
import { toggleExportSubitemProperty } from '../../../../store/actions/export'


const useExportSubitems = (navigateToExportOverview) => {
    const itemType = useSelector(state => state.export.itemType)
    const [subitems, setSubitems] = useState([])
    const subitemProperties = useSelector(state => state.export.subitemProperties)
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)
    const dispatch = useDispatch()

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            setLoading(true)
            const { status, response } = await getExportSubitemProperties({ itemType })
            if (status === 200) {
                if (componentMounted.current) {
                    setSubitems(response)
                }
            }
            else errorHandler(status)
            setLoading(false)
        }
        setTimeout(() => loadData(), 20)
        return () => {
            componentMounted.current = false
        }
    }, [])

    const toggleSubitemProperty = useCallback((subitemType, property) => dispatch(toggleExportSubitemProperty(subitemType, property)), [])

    const onNextPress = useCallback(() => {
        navigateToExportOverview()
    }, [])

    return {
        loading,
        subitems,
        subitemProperties,
        toggleSubitemProperty,
        onNextPress
    }
}

export default useExportSubitems