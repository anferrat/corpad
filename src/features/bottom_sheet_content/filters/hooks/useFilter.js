import { useCallback, useState, useEffect } from "react"
import { EventRegister } from "react-native-event-listeners"

export const useFilter = ({ excluded, visible, onApply }) => {
    const [stagedToBeExluded, setStagedToBeExluded] = useState(excluded)

    const onChange = useCallback((value) => setStagedToBeExluded(state => state.indexOf(value) === -1 ? state.concat(value) : state.filter(o => o !== value)), [])

    useEffect(() => {
        const applyFilterListener = EventRegister.addEventListener('FILTER_APPLIED', () => {
            const synced = excluded.sort().join(',') === stagedToBeExluded.sort().join(',')
            if (!synced && visible)
                onApply(stagedToBeExluded)
        })
        return () => {
            EventRegister.removeEventListener(applyFilterListener)
        }
    }, [visible, stagedToBeExluded])

    return {
        notSelected: stagedToBeExluded,
        onChange
    }
}