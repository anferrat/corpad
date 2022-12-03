import React from 'react'
import { saveIcon } from '../../../components/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { saveState } from '../../../store/actions/item'
import MainActionButton from '../../../components/ActionButton'
import { hapticMedium } from '../../../native_libs/haptics'

const SaveButton = () => {
    const dispatch = useDispatch()
    const valid = useSelector(state => {
        if (state.item.edit.valid)
            return (Object.keys(state.item.edit.valid).every(v => state.item.edit.valid[v]))
        else return false
    })

    const onPressValidCheck = React.useCallback(() => {
        hapticMedium()
        dispatch(saveState())
    }, [dispatch])

    return (
        <MainActionButton
            icon={saveIcon}
            haptics={true}
            title='Save'
            onPress={onPressValidCheck}
            error={505}
            valid={valid}
        />
    )
}

export default React.memo(SaveButton)