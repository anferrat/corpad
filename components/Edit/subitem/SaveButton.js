import React from 'react'
import { saveIcon } from '../../_Stateless/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { saveSubitemState } from '../../../store/actions/subitem'
import MainActionButton from '../../_Stateless/MainActionButton'
import { hapticMedium } from '../../_nativeFeatures/haptics'

const SaveButton = () => {
    const dispatch = useDispatch()
    const valid = useSelector(state => {
        if (state.subitem.valid)
            return (Object.keys(state.subitem.valid).every(v => state.subitem.valid[v])) &&
                (state?.potentials.every(p => p.valid) ?? true)
        else return false
    })

    const onPressValidCheck = React.useCallback(() => {
        hapticMedium()
        dispatch(saveSubitemState())
    }, [dispatch])

    return (
        <MainActionButton
            icon={saveIcon}
            haptics={true}
            title='Save'
            onPress={onPressValidCheck}
            error={505}
            valid={valid} />
    )
}

export default React.memo(SaveButton)