import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'
import { subitemPropertyLabels } from '../../constants/constants'


const SubitemPropertyToggleToken = ({ selected, property, subitemType, onPress }) => {
    const checked = ~selected.findIndex(([type, subitemProperty]) => type === subitemType && property === subitemProperty)
    const onPressHandler = useCallback(() => {
        onPress(subitemType, property)
    }, [subitemType, property, onPress])

    return (
        <ToggleToken
            checked={checked}
            title={subitemPropertyLabels[property]}
            onPress={onPressHandler} />
    )
}

export default SubitemPropertyToggleToken