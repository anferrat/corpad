import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'
import { ExportItemPropertyLabels } from '../../../../../constants/labels'


const ItemPropertyToggleToken = ({ itemProperties, property, toggleToken }) => {
    const checked = ~itemProperties.indexOf(property)
    const onPress = useCallback(() => toggleToken(property), [property, toggleToken])
    return (
        <ToggleToken
            checked={checked}
            title={ExportItemPropertyLabels[property]}
            onPress={onPress} />
    )
}

export default ItemPropertyToggleToken