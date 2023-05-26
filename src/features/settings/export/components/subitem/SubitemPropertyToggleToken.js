import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'
import { ExportSubitemPropertyLabels } from '../../../../../constants/labels'


const SubitemPropertyToggleToken = ({ selected, property, subitemType, onPress }) => {
    const checked = ~selected.findIndex(([type, subitemProperty]) => type === subitemType && property === subitemProperty)
    const onPressHandler = useCallback(() => {
        onPress(subitemType, property)
    }, [subitemType, property, onPress])

    return (
        <ToggleToken
            checked={checked}
            title={ExportSubitemPropertyLabels[property]}
            onPress={onPressHandler} />
    )
}

export default SubitemPropertyToggleToken