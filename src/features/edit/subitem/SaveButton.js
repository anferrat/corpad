import React from 'react'
import { saveIcon } from '../../../components/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { saveSubitemState } from '../../../store/actions/subitem'
import MainActionButton from '../../../components/ActionButton'
import { hapticMedium } from '../../../native_libs/haptics'

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