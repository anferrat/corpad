import React from 'react'
import { Text } from '@ui-kitten/components'

const MapperStatusHint = ({ fieldValuesEmpty, propertyListEmpty, fieldIndexNull }) => {
    if (fieldValuesEmpty || propertyListEmpty || fieldIndexNull) {
        const hint = fieldIndexNull ?
            'Select a data column to start mapping'
            :
            (fieldValuesEmpty && !propertyListEmpty ?
                'All values from data column were mapped' :
                (
                    !fieldValuesEmpty && propertyListEmpty ?
                        'All property values were mapped' :
                        'All values were mapped'
                )
            )

        return (
            <Text appearance='hint' category='s2' status='warning' style={{alignSelf: 'center'}}>{hint}</Text>
        )
    }
    else return null
}

export default React.memo(MapperStatusHint)