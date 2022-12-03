import React from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import BottomSheetContent from '../screens/BottomSheet'

const Sheet = React.forwardRef((props, bsRef) => {
    const renderBackdrop = (props) => <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1} />

    return <BottomSheet
        ref={bsRef}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        index={-1}
        snapPoints={[176, 297, 376, 371, 419]}>
        <BottomSheetContent />
    </BottomSheet>
})

export default Sheet
