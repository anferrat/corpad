import React from 'react'
import { Text } from '@ui-kitten/components'
import { getTextByWarningType } from '../helpers/functions'

const WarningPoints = ({ warnings, success, expanded }) => {
    if (expanded)
        if (success)
            return (
                <>
                    {warnings.map((warning, index) => <Text appearance='hint' category='c1' key={index}>- {getTextByWarningType(warning)}</Text>)}
                </>
            )
        else return <Text appearance='hint' category='c1'>- Unable to import item from provided data</Text>
    else return null
}

export default WarningPoints