import React from 'react'
import BottomSheetDefault, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import BottomSheetContent from './BottomSheetContent'

export const BottomSheet = React.forwardRef((props, bsRef) => {
    const renderBackdrop = (props) => <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1} />

    return <BottomSheetDefault
        ref={bsRef}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        index={-1}
        snapPoints={[176, 236, 376, 371, 419]}>
        <BottomSheetContent />
    </BottomSheetDefault>
})
