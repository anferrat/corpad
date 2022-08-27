import React from 'react'
import BottomSheetBackdrop from '@gorhom/bottom-sheet'

export const renderBackdrop = (props) => <BottomSheetBackdrop
    {...props}
    disappearOnIndex={-1}
    appearsOnIndex={1}
/>
