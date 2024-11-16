import React from 'react'
import { basic } from '../../../../../styles/colors'
import DataRow from './DataRow'
import { ReadingParameters } from '../../../constants/constants'

const ReadingRow = ({ displayedReading, value, itemType, index }) => {
    if (value === null || value === undefined)
        return null
    else
        return <DataRow
            fill={basic}
            pack={ReadingParameters[itemType][displayedReading][index].pack}
            icon={ReadingParameters[itemType][displayedReading][index].icon}
            value={`${value}${ReadingParameters[itemType][displayedReading][index].unit}`}
        />
}

export default ReadingRow