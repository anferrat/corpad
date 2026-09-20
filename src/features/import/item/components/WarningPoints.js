import React from 'react'
import { Text } from '@ui-kitten/components'
import { getTextByWarningType } from '../helpers/functions'
import { translateImport } from '../../../../localization'

const WarningPoints = ({ warnings, success, expanded }) => {
    if (expanded)
        if (success)
            return (
                <>
                    {warnings.map((warning, index) => <Text appearance='hint' category='c1' key={index}>- {getTextByWarningType(warning)}</Text>)}
                </>
            )
        else return <Text appearance='hint' category='c1'>- {translateImport('item.unableToImport')}</Text>
    else return null
}

export default WarningPoints
