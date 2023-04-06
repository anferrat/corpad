import { useRef, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { errorHandler } from "../../../../helpers/error_handler"
import { loadEditState, resetEditState, resetState, updateCurrentCoordinates, updateEditItemProperty, updateTapSetting, validateProperty } from "../../../../store/actions/item"
import { useNavigation } from "@react-navigation/native"
import { deleteItem, getItemById, updateItem } from "../../../../app/controllers/survey/items/ItemController"
import { EventRegister } from "react-native-event-listeners"
import { createSubitem as createSubitemRequest } from "../../../../app/controllers/survey/subitems/SubitemController"

const useItemData = ({ itemId, itemType, isNew, navigateToView, navigateToSubitem }) => {
    const item = useSelector(state => state.item.edit)
    const loading = useSelector(state => state.item.edit.loading)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const deleteOnExit = useRef(isNew)
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current === true
        const loadData = async () => {
            const { status, response } = await getItemById({ id: itemId, itemType }, er => errorHandler(er, navigation.goBack))
            if (status === 200 && componentMounted.current)
                dispatch(loadEditState(response))
        }
        if (loading)
            loadData()
    }, [loading])

    useEffect(() => {
        const onSaveHandler = EventRegister.addEventListener('onItemSave', async (item) => {
            const { status } = await updateItem(
                { itemType, ...item },
                er => errorHandler(er),
                (result) => {
                    EventRegister.emit('ITEM_UPDATED', result)
                    EventRegister.emit('GLOBAL_ITEM_UPDATED', { itemId, itemType })
                }
            )
            if (status === 200) {
                deleteOnExit.current = false
                navigateToView()
            }
            else {
                dispatch(updateEditItemProperty(false, 'saving'))
            }
        })
        return () => {
            dispatch(resetEditState())
            EventRegister.removeEventListener(onSaveHandler)
            componentMounted.current = false
            if (deleteOnExit.current) {
                deleteItem({ id: itemId, itemType })
                dispatch(resetState())
            }
        }
    }, [dispatch, navigateToView, deleteOnExit])

    const update = useCallback((value, property) => dispatch(updateEditItemProperty(value, property)), [dispatch])

    const validate = useCallback((property) => dispatch(validateProperty(property)), [dispatch])

    const updateLatAndLon = useCallback((latitude, longitude) => dispatch(updateCurrentCoordinates(latitude, longitude)), [dispatch])

    const createSubitem = useCallback(async (type) => {
        const { response, status, errorMessage } = await createSubitemRequest({ subitemType: type, itemId }, er => errorHandler(er))
        if (status === 200)
            navigateToSubitem(response.id, true, type)
    }, [itemId])

    const updateTap = useCallback((value) => { dispatch(updateTapSetting(value)) }, [dispatch])

    return { item, loading, update, validate, createSubitem, updateLatAndLon, updateTap }
}

export default useItemData