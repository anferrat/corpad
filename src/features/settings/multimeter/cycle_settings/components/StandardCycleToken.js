import React from 'react'
import ToggleToken from '../../../../../components/ToggleToken'


const StandardCycleToken = ({ checked, setStandardCycle, on, off, title }) => {
    const onPress = React.useCallback(() => setStandardCycle(on, off), [on, off, setStandardCycle])
    return (
        <ToggleToken
            checked={checked}
            onPress={onPress}
            title={title}
        />
    )
}

export default StandardCycleToken
