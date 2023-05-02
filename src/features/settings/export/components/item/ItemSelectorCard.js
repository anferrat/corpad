import React, { useCallback } from 'react'
import SelectToken from '../SelectToken'
import { labels } from '../../../../../constants/constants'

const ItemSelectorCard = ({ onPress, selectedItemType, itemType }) => {
    const selected = selectedItemType === itemType
    const onPressHandler = useCallback(() => onPress(itemType), [itemType, onPress])
    const title = `${labels[itemType].label}s`
    const icon = `${labels[itemType].icon}-filled`

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

