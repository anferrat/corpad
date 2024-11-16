import React from 'react'
import ReadingButton from './ReadingButton'
import { ItemTypes } from '../../../../constants/global'
import { useReading } from '../hooks/useReading'

const ReadingsHeaderButton = ({ itemType, openSheet }) => {
    const reading = useReading({ itemType })
    if (itemType !== ItemTypes.PIPELINE)
        return <ReadingButton
            onPress={openSheet}
            itemType={itemType}
            reading={reading} />
    else return null
}

export default ReadingsHeaderButton
