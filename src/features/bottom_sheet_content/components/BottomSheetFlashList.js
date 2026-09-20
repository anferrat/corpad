import React from 'react'
import { useBottomSheetScrollableCreator } from '@gorhom/bottom-sheet'
import { FlashList } from '@shopify/flash-list'
import useBottomSheetFocusHook from './useBottomSheetFocusHook'

const BottomSheetFlashList = ({ isActive = true, ...props }) => {
    const focusHook = useBottomSheetFocusHook(isActive)
    const renderScrollComponent = useBottomSheetScrollableCreator({ focusHook })

    return <FlashList
        {...props}
        renderScrollComponent={renderScrollComponent} />
}

export default BottomSheetFlashList
