import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BottomButton from '../../../components/BottomButton'
import { hapticMedium } from '../../../native_libs/haptics'
import { EventRegister } from 'react-native-event-listeners'
import { errorHandler } from '../../../helpers/error_handler'
import { updateSubitemProperty } from '../../../store/actions/subitem'

const SaveButton = () => {
    const saving = useSelector(state => state.subitem.saving)

    const dispatch = useDispatch()
    const valid = useSelector(state => {
        if (state.subitem.valid)
            return (Object.values(state.subitem.valid).every(v => v)) &&
                (state.potentials.potentials.every(({ valid }) => valid))
        else return false
    })

    const onPress = React.useCallback(() => {
        if (valid) {
            hapticMedium()
            dispatch(updateSubitemProperty(true, 'saving'))
            EventRegister.emit('onSubitemSave')
        }
        else errorHandler(505)
    }, [valid])

    return (
        <BottomButton
            disabled={saving}
            icon={saving ? 'loading' : 'save'}
            title='Save'
            onPress={onPress} />
    )
}

export default React.memo(SaveButton)