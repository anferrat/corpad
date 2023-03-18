import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hapticMedium } from '../../../native_libs/haptics'
import { EventRegister } from 'react-native-event-listeners'
import BottomButton from '../../../components/BottomButton'
import { errorHandler } from '../../../helpers/error_handler'
import { updateEditItemProperty } from '../../../store/actions/item'

const SaveButton = () => {
    const item = useSelector(state => state.item.edit)
    const dispatch = useDispatch()
    const { saving } = item
    const valid = useSelector(state => {
        if (state.item.edit.valid)
            return (Object.keys(state.item.edit.valid).every(v => state.item.edit.valid[v]))
        else return false
    })

    const onPress = React.useCallback(() => {
        if (valid) {
            hapticMedium()
            dispatch(updateEditItemProperty(true, 'saving'))
            EventRegister.emit('onItemSave', item)
        }
        else errorHandler(505)
    }, [valid, item, dispatch])

    return (
        <BottomButton
            disabled={saving}
            icon={saving ? 'loading' : 'save'}
            title='Save'
            onPress={onPress} />
    )
}

export default React.memo(SaveButton)