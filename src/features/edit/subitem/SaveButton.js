import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BottomButton from '../../../components/BottomButton'
import { hapticMedium } from '../../../native_libs/haptics'
import { EventRegister } from 'react-native-event-listeners'
import { errorHandler } from '../../../helpers/error_handler'
import { updateSubitemProperty } from '../../../store/actions/subitem'

const SaveButton = () => {
    const saving = useSelector(state => state.subitem.saving)
    const subitem = useSelector(state => state.subitem)
    const potentials = useSelector(state => state.potentials)

    const dispatch = useDispatch()
    const valid = useSelector(state => {
        if (state.subitem.valid)
            return (Object.values(state.subitem.valid).every(v => v)) &&
                (state.potentials.potentials.every(({ valid }) => valid)) &&
                (!state.subitem.valid.layers || state.subitem.valid.layers.every(l => Object.values(l).every(v => v))) &&
                (!state.subitem.valid.anodes || state.subitem.valid.anodes.every(a => Object.values(a).every(v => v)))
        else return false
    })

    const onPress = React.useCallback(() => {
        if (valid) {
            hapticMedium()
            dispatch(updateSubitemProperty(true, 'saving'))
            EventRegister.emit('onSubitemSave', { subitem, potentials })
        }
        else errorHandler(505)
    }, [valid, subitem, potentials])

    return (
        <BottomButton
            disabled={saving}
            icon={saving ? 'loading' : 'save'}
            title='Save'
            onPress={onPress} />
    )
}

export default React.memo(SaveButton)