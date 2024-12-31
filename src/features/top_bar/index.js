import React from 'react'
import TopBarBase from './components/TopBarBase'
import { useDispatch } from 'react-redux'
import { getHeader } from './helpers/functions'
import { useBottomSheetNavigation } from '../../hooks/bottom_sheet/useBottomSheetNavigation'
import { initialWindowMetrics, useSafeAreaInsets } from 'react-native-safe-area-context'

export const TopBar = React.memo(({ screen, params, navigation }) => {
    const dispatch = useDispatch()
    const { top } = useSafeAreaInsets()
    const { openMenu } = useBottomSheetNavigation()
    const header = getHeader(screen, params, navigation, dispatch, openMenu)
    const topInset = initialWindowMetrics !== null ? initialWindowMetrics.insets.top : top
    if (header.display)
        return <TopBarBase
            topInset={topInset}
            noBorder={header?.noBorder}
            navigation={navigation}
            right={header.right}
            left={header.left}
            title={header.title}
            isPrimary={header.isPrimary}
        />
    else return null
})