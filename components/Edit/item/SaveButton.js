import React from 'react'
import { saveIcon } from '../../_Stateless/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { saveState } from '../../../store/actions/item'
import MainActionButton from '../../_Stateless/MainActionButton'
import { hapticMedium } from '../../_nativeFeatures/haptics'

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