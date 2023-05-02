import React, { useCallback } from 'react'
import SelectToken from '../SelectToken'


const ReferenceCellSelectToken = ({ selected, id, selectReferenceCell, title }) => {
    const onPress = useCallback(() => selectReferenceCell(id), [selectReferenceCell, id])
    return (
        <SelectToken
            pack='cp'
            icon='RE-filled'
            title={title}
            onPress={onPress}
            selected={selected}
        />
    )
}

export default ReferenceCellSelectToken