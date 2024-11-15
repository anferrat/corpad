import React from 'react'
import BottomSheetDefault, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import BottomSheetContent from './BottomSheetContent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EventRegister } from 'react-native-event-listeners'

export const BottomSheet = React.forwardRef((props, bsRef) => {
    const { bottom } = useSafeAreaInsets()
    const renderBackdrop = (props) => <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1} />

    const onClose = () => EventRegister.emit('BOTTOM_SHEET_CLOSING')

    return <BottomSheetDefault
        ref={bsRef}
        onClose={onClose}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        index={-1}
        snapPoints={[236 + bottom, 236 + bottom, 376 + bottom, 371 + bottom, 419 + bottom]}>
        <BottomSheetContent />
    </BottomSheetDefault>
})
