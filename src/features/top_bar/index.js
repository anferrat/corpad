import React, { useContext } from 'react'
import TopBarBase from './components/TopBarBase'
import { useDispatch } from 'react-redux'
import { getHeader } from './helpers/functions'
import { BS } from '../../../App'
import { useBottomSheetNavigation } from '../../hooks/bottom_sheet/useBottomSheetNavigation'
import { initialWindowMetrics } from 'react-native-safe-area-context'

export const TopBar = React.memo(({ screen, params, navigation }) => {
    const dispatch = useDispatch()
    const { openMenu } = useBottomSheetNavigation()
    const header = getHeader(screen, params, navigation, dispatch, openMenu)
    if (header.display)
        return <TopBarBase
            topInset={initialWindowMetrics.insets.top}
            noBorder={header?.noBorder}
            navigation={navigation}
            right={header.right}
            left={header.left}
            title={header.title}
            isPrimary={header.isPrimary}
        />
    else return null
})