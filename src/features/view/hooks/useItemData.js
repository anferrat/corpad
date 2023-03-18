import { useCallback, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { EventRegister } from "react-native-event-listeners"
import { loadViewState, resetState, updateViewProperty } from "../../../store/actions/item"
import { useNavigation } from "@react-navigation/native"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { deleteItem as deleteItemRequest, getItemById, updateItemProperty } from "../../../app/controllers/survey/items/ItemController"
import { createSubitem as createSubitemRequest } from "../../../app/controllers/survey/subitems/SubitemController"
import { hapticDelete } from "../../../native_libs/haptics"

const warningCodes = {
    TEST_POINT: 55,
    RECTIFIER: 53,
    PIPELINE: 54
}

const useItemData = ({ itemId, itemType, navigateToMap, navigateToEditSubitem }) => {
    const item = useSelector(state => state.item.view)
    const { loading } = item
    const dispatch = useDispatch()
    const componentMounted = useRef(true)
    const navigation = useNavigation()

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getItemById({ id: itemId, itemType }, er => errorHandler(er.code, navigation.goBack))
            if (status === 200 && componentMounted.current)
                dispatch(loadViewState(response))
        }

        const itemUpdateHandler = EventRegister.addEventListener('ITEM_UPDATED', async (item) => {
            if (item.id === itemId)
                dispatch(loadViewState(item))
        })

        const subitemDeleteHandler = EventRegister.addEventListener('SUBITEM_DELETED', (data) => {
            if (itemId === data.itemId)
                dispatch(updateViewProperty(data.timeModified, 'timeModified'))
        })

        loadData()
        return () => {
            EventRegister.removeEventListener(itemUpdateHandler)
            EventRegister.removeEventListener(subitemDeleteHandler)
            componentMounted.current = false
            dispatch(resetState())
        }
    }, [])

    const updateStatus = useCallback(async (value) => {
        const { response, status } = await updateItemProperty({ value: value, propertyType: 'STATUS', itemType, id: itemId }, er => { console.log(er) })
        if (status === 200)
            dispatch(updateViewProperty(value, 'status', response.timeModified))
    }, [dispatch])

    const deleteItem = useCallback(async () => {
        hapticDelete()
        const confirm = await warningHandler(warningCodes[itemType], 'Delete', 'Cancel')
        if (confirm)
            await deleteItemRequest({ id: itemId, itemType: itemType }, er => errorHandler(er), () => navigation.goBack())
    }, [navigation])

    const displayOnMap = useCallback(() => {
        if (item.latitude !== null && item.longitude !== null) {
            EventRegister.emit('activateMapMarker', { itemId, itemType })
            navigateToMap()
        }
        else errorHandler(802)
    }, [item.latitude, item.longitude, navigateToMap])

    const createSubitem = useCallback(async (type) => {
        const { response, status } = await createSubitemRequest({ subitemType: type, itemId }, er => errorHandler(er))
        if (status === 200)
            navigateToEditSubitem(response.id, true, type)
    }, [itemId])

    return { item, loading, updateStatus, deleteItem, displayOnMap, createSubitem }
}

export default (useItemData)