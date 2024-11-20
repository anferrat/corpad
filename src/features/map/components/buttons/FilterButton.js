import React from 'react'
import { useFilterButton } from '../../hooks/useFilterButton'
import TopSideButton from './TopSideButton'

const FilterButton = () => {
    const { counter, openSheet, isVisible } = useFilterButton()
    if (isVisible)
        return <TopSideButton
            icon={counter > 0 ? 'funnel' : 'funnel-outline'}
            onPress={openSheet}
            title={`Filter${counter ? ` (${counter})` : ''}`} />
    else return null
}

export default React.memo(FilterButton)
