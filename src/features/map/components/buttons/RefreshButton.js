import React from 'react'
import TopSideButton from './TopSideButton'
import { useRefreshButton } from '../../hooks/useRefreshButton'

const RefreshButton = () => {
    const { isVisible, onRefreshPress } = useRefreshButton()
    if (isVisible)
        return <TopSideButton
            onPress={onRefreshPress}
            icon={'refresh'}
        />
    else
        return null
}

export default RefreshButton