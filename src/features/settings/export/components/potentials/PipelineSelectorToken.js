import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'


const PipelineSelectorToken = ({ selected, title, id, togglePipeline }) => {
    const onPress = useCallback(() => togglePipeline(id), [togglePipeline, id])
    return (
        <ToggleToken
            title={title}
            onPress={onPress}
            checked={selected}
        />
    )
}

export default PipelineSelectorToken