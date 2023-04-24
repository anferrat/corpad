import { useCallback } from 'react'
import { createItem } from '../../../app/controllers/survey/items/ItemController'
import { errorHandler } from '../../../helpers/error_handler'

const useCreateItem = ({ navigateToEdit, hideSheet }) => {

    const createItemHandler = useCallback((itemType) => {
        hideSheet()
        createItem({ itemType },
            er => errorHandler(er),
            ({ id }) => navigateToEdit(id, itemType)
        )
    }, [])

    return createItemHandler


}

export default useCreateItem