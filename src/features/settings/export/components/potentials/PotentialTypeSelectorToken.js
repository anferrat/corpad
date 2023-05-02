import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'


const PotentialTypeSelectorToken = ({ togglePotentialType, selected, id, title }) => {
    const onPress = useCallback(() => togglePotentialType(id), [togglePotentialType, id])

    return (
        <ToggleToken
            onPress={onPress}
            title={title}
            checked={selected}
        />
    )
}

export default PotentialTypeSelectorToken