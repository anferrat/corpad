import { useState, useEffect, useCallback } from "react"
import useModal from "../../../../hooks/useModal"
import { EventRegister } from "react-native-event-listeners"
import { getNearbyItems } from "../../../../app/controllers/survey/items/ItemController"
import { errorHandler } from "../../../../helpers/error_handler"
import { useNavigation } from "@react-navigation/native"

const useNearbyItems = () => { //Re-work
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const { showModal, hideModal, visible } = useModal()
    const navigation = useNavigation()

    useEffect(() => {
        let listener
        if (!visible)
            listener = EventRegister.addEventListener('SHOW_NEARBY_ITEMS_MODAL', () => {
                showModal()
                getNearbyItems(
                    (er) => errorHandler(er, hideModal),
                    (response) => {
                        setLoading(false)
                        setList(response)
                    }
                )
            })

        return () => {
            if (!visible)
                EventRegister.removeEventListener(listener)
            else {
                setLoading(true)
                setList([])
            }
        }
    }, [visible])

    const navigateToItem = useCallback((id, itemType) => {
        if (itemType)
            navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    }, [])

    return {
        list,
        loading,
        visible,
        hideModal,
        navigateToItem
    }
}

export default useNearbyItems