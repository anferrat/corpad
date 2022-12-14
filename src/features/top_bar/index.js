import React, { useContext } from 'react'
import TopBarBase from './components/TopBarBase'
import { useDispatch } from 'react-redux'
import { getHeader } from './helpers/functions'
import { BS } from '../../../App'


export const TopBar = React.memo(({ screen, params, navigation }) => {
    const dispatch = useDispatch()
    const bottomSheet = useContext(BS)
    const header = getHeader(screen, params, navigation, dispatch, bottomSheet)
    if (header.display)
        return <TopBarBase
            noBorder={header?.noBorder}
            navigation={navigation}
            right={header.right}
            left={header.left}
            title={header.title}
            isPrimary={header.isPrimary}
        />
    else return null
}, () => {
    /*
    With ()=>true,  new header still renders with a new screen in stack, however it prevents header to re-render when switching between tabs, which is desired behavior
    */
    return false
})