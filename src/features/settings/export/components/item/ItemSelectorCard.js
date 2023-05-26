import React, { useCallback } from 'react'
import SelectToken from '../SelectToken'
import { ItemTypeLabelsPlural } from '../../../../../constants/labels'
import { ItemTypeIconsFilled } from '../../../../../constants/icons'

const ItemSelectorCard = ({ onPress, selectedItemType, itemType }) => {
    const selected = selectedItemType === itemType
    const onPressHandler = useCallback(() => onPress(itemType), [itemType, onPress])
    const title = ItemTypeLabelsPlural[itemType]
    const icon = ItemTypeIconsFilled[itemType]

    return (
        <SelectToken
            onPress={onPressHandler}
            icon={icon}
            pack={'cp'}
            title={title}
            selected={selected}
        />
    )
}

export default ItemSelectorCard

