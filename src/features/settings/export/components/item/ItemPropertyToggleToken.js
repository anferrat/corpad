import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'
import { itemPropertyLabels } from '../../constants/constants'


const ItemPropertyToggleToken = ({ itemProperties, property, toggleToken }) => {
    const checked = ~itemProperties.indexOf(property)
    const onPress = useCallback(() => toggleToken(property), [property, toggleToken])
    return (
        <ToggleToken
            checked={checked}
            title={itemPropertyLabels[property]}
            onPress={onPress}
        />
    )
}

export default ItemPropertyToggleToken