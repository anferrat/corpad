import { useEffect, useState } from "react"

export const useToggle = ({ isChecked, onApply }) => {
    const [turnedOn, setTurnedOn] = useState(isChecked)

    useEffect(() => {
        if (turnedOn !== isChecked)
            onApply(turnedOn)
    }, [turnedOn])

    return {
        onToggle: setTurnedOn,
        toggledOn: turnedOn
    }
}