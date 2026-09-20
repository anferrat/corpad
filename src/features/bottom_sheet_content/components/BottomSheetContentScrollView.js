import React from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useBottomSheetFocusHook from './useBottomSheetFocusHook'

const BottomSheetContentScrollView = ({ isActive = true, ...props }) => {
    const focusHook = useBottomSheetFocusHook(isActive)

    return <BottomSheetScrollView
        {...props}
        focusHook={focusHook} />
}

export default BottomSheetContentScrollView
