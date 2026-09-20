import React from 'react'
import { useFilterButton } from '../../hooks/useFilterButton'
import TopSideButton from './TopSideButton'
import { translateMap } from '../../../../localization'

const FilterButton = () => {
    const { counter, openSheet, isVisible } = useFilterButton()
    return <TopSideButton
        disabled={!isVisible}
        icon={counter > 0 ? 'funnel' : 'funnel-outline'}
        onPress={openSheet}
        title={`${translateMap('filter')}${counter ? ` (${counter})` : ''}`} />
}

export default React.memo(FilterButton)
