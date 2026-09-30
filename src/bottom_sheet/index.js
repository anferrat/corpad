import React from 'react'
import BottomSheetDefault, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import BottomSheetContent from './BottomSheetContent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EventRegister } from 'react-native-event-listeners'

export const BottomSheet = React.forwardRef((_props, bsRef) => {
    const { bottom } = useSafeAreaInsets()
    const renderBackdrop = (backdropProps) => <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={1}
        disappearsOnIndex={-0.5}
        enableTouchThrough />

    const onClose = () => EventRegister.emit('BOTTOM_SHEET_CLOSING')

    const gestureEventsHandlersHook = () => ({
        handleOnStart: () => {
            'worklet'
        },
        handleOnChange: () => {
            'worklet'
        },
        handleOnEnd: (_source, { translationY }) => {
            'worklet'
        },
        handleOnFinalize: () => {
            'worklet'
        },
    })

    return <BottomSheetDefault
        ref={bsRef}
        onClose={onClose}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture
        enableHandlePanningGesture={false}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        gestureEventsHandlersHook={gestureEventsHandlersHook}
        index={-1}
        snapPoints={[234 + bottom, 236 + bottom, 381 + bottom, 385 + bottom, 416 + bottom, 445 + bottom, 480 + bottom]}>
        <BottomSheetContent />
    </BottomSheetDefault>
})
