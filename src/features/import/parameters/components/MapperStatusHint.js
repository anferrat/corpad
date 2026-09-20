import React from 'react'
import { Text } from '@ui-kitten/components'
import { translateImport } from '../../../../localization'

const MapperStatusHint = ({ fieldValuesEmpty, propertyListEmpty, fieldIndexNull }) => {
    if (fieldValuesEmpty || propertyListEmpty || fieldIndexNull) {
        const hint = fieldIndexNull ?
            translateImport('parameters.selectColumnToStart')
            :
            (fieldValuesEmpty && !propertyListEmpty ?
                translateImport('parameters.allColumnValuesMapped') :
                (
                    !fieldValuesEmpty && propertyListEmpty ?
                        translateImport('parameters.allPropertyValuesMapped') :
                        translateImport('parameters.allValuesMapped')
                )
            )

        return (
            <Text appearance='hint' category='s2' status='warning' style={{alignSelf: 'center'}}>{hint}</Text>
        )
    }
    else return null
}

export default React.memo(MapperStatusHint)
