import { useCallback, useEffect } from 'react'

const useVisibleFocusEffect = (effect, isActive) => {
    useEffect(() => {
        if (!isActive)
            return undefined

        return effect()
    }, [effect, isActive])
}

const useBottomSheetFocusHook = (isActive = true) => useCallback(
    function useBottomSheetFocusEffect(effect) {
        useVisibleFocusEffect(effect, isActive)
    },
    [isActive]
)

export default useBottomSheetFocusHook
