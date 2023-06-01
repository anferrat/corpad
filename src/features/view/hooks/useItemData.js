import { useCallback, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { EventRegister } from "react-native-event-listeners"
import { loadViewState, resetState, submitViewProperty, updateViewProperty, validateViewProperty } from "../../../store/actions/item"
import { useNavigation } from "@react-navigation/native"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { deleteItem as deleteItemRequest, getItemById, updateItem } from "../../../app/controllers/survey/items/ItemController"
import { createSubitem as createSubitemRequest } from "../../../app/controllers/survey/subitems/SubitemController"
import { hapticDelete } from "../../../native_libs/haptics"
import fieldValidation from '../../../helpers/validation'
import { ItemTypes } from "../../../constants/global"

const warningCodes = {
    TEST_POINT: 55,
    RECTIFIER: 53,
    PIPELINE: 54
}

const useItemData = ({ itemId, itemType, navigateToMap, navigateToEditSubitem }) => {
    const item = useSelector(state => state.item.view)
    const { loading, timeModified } = item
    const dispatch = useDispatch()
    const componentMounted = useRef(true)
    const navigation = useNavigation()
    const updateTracker = useRef({
        onLoadTimeModified: null,
        itemUpdated: false
    })
    const displayOnMapVisible = itemType !== ItemTypes.PIPELINE && item.latitude !== null && item.longitude !== null

    useEffect(() => {
        //Update tracker keeps timeModified on load, and tracks if it was changed. Emits global update event on screen unmount if changes were made
        if (!loading)
            updateTracker.current.itemUpdated = updateTracker.current.onLoadTimeModified !== timeModified
    }, [timeModified])

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getItemById({ id: itemId, itemType }, er => errorHandler(er, navigation.goBack))
            if (status === 200 && componentMounted.current) {
                dispatch(loadViewState(response))
                updateTracker.current.onLoadTimeModified = response.timeModified
            }
        }

        const itemUpdateHandler = EventRegister.addEventListener('ITEM_UPDATED', async (item) => {
            if (item.id === itemId)
                dispatch(loadViewState(item))
        })

        const subitemDeleteHandler = EventRegister.addEventListener('SUBITEM_DELETED', (data) => {
            if (itemId === data.itemId)
                dispatch(submitViewProperty(data.timeModified, 'timeModified'))
        })

        const subitemUpdateHandler = EventRegister.addEventListener('SUBITEM_UPDATED', ({ timeModified }) => {
            dispatch(submitViewProperty(timeModified, 'timeModified'))

        })

        const potentialUpdateHandler = EventRegister.addEventListener('POTENTIAL_UPDATED', ({ timeModified }) => {
            dispatch(submitViewProperty(timeModified, 'timeModified'))
        })

        loadData()
        return () => {
            EventRegister.removeEventListener(itemUpdateHandler)
            EventRegister.removeEventListener(subitemDeleteHandler)
            EventRegister.removeEventListener(subitemUpdateHandler)
            EventRegister.removeEventListener(potentialUpdateHandler)
            componentMounted.current = false
            if (updateTracker.current.itemUpdated)
                EventRegister.emit('GLOBAL_ITEM_UPDATED', { itemId, itemType })
            dispatch(resetState())
        }
    }, [])

    const submit = async (value, property) => {
        const validation = fieldValidation(value, property)
        if (validation.valid) {
            await updateItem(
                { itemType, ...item, [property]: validation.value },
                er => errorHandler(er),
                (result) => EventRegister.emit('ITEM_UPDATED', result)
            )
        }
        else dispatch(validateViewProperty(value, property))
    }

    const update = useCallback(async (value, property) => {
        dispatch(updateViewProperty(value, property))
    }, [dispatch])

    const deleteItem = useCallback(async () => {
        hapticDelete()
        const confirm = await warningHandler(warningCodes[itemType], 'Delete', 'Cancel')
        if (confirm)
            await deleteItemRequest({ id: itemId, itemType }, er => errorHandler(er), () => {
                EventRegister.emit('GLOBAL_ITEM_DELETED', { itemId, itemType })
                navigation.goBack()
            })
    }, [navigation])

    const displayOnMap = useCallback(() => {
        if (item.latitude !== null && item.longitude !== null) {
            EventRegister.emit('selectOnMap', { itemId, itemType })
            navigateToMap()
        }
    }, [item.latitude, item.longitude, navigateToMap])

    const createSubitem = useCallback(async (type) => {
        const { response, status } = await createSubitemRequest({ subitemType: type, itemId }, er => errorHandler(er))
        if (status === 200)
            navigateToEditSubitem(response.id, true, type)
    }, [itemId])

    return { item, loading, displayOnMapVisible, submit, update, deleteItem, displayOnMap, createSubitem }
}

export default (useItemData)