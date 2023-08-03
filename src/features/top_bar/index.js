import React, { useContext } from 'react'
import TopBarBase from './components/TopBarBase'
import { useDispatch } from 'react-redux'
import { getHeader } from './helpers/functions'
import { BS } from '../../../App'
import { useBottomSheetNavigation } from '../../hooks/bottom_sheet/useBottomSheetNavigation'


export const TopBar = React.memo(({ screen, params, navigation, topInset }) => {
    const dispatch = useDispatch()
    const bottomSheet = useContext(BS)
    const { openMenu } = useBottomSheetNavigation()
    const header = getHeader(screen, params, navigation, dispatch, openMenu)
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