import React from 'react'
import TopSideButton from './TopSideButton'
import { useRefreshButton } from '../../hooks/useRefreshButton'

const RefreshButton = () => {
    const { isVisible, onRefreshPress } = useRefreshButton()

    return <TopSideButton
        onPress={onRefreshPress}
        icon={'refresh'}
        disabled={isVisible}
    />
}

export default RefreshButton