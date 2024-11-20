import React from 'react'
import FilterButton from './FilterButton'
import { ItemTypes } from '../../../../constants/global'
import { useFilter } from '../hooks/useFilter'

const FilterHeaderButton = ({ itemType, openSheet }) => {
    const counter = useFilter({ itemType })
    if (itemType === ItemTypes.TEST_POINT)
        return <FilterButton
            icon={counter > 0 ? 'funnel' : 'funnel-outline'}
            onPress={openSheet}
            title={`Filter${counter ? ` (${counter})` : ''}`}
        />
    else return null
}

export default FilterHeaderButton
