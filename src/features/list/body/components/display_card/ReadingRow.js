import React from 'react'
import { basic } from '../../../../../styles/colors'
import DataRow from './DataRow'
import { displayedReadingsValues } from '../../../helpers/functions'

const ReadingRow = ({ displayedReading, value, itemType, index }) => {
    if (value === null || value === undefined)
        return null
    else
        return <DataRow
            fill={basic}
            pack={displayedReadingsValues[itemType][displayedReading].icons[index].pack}
            icon={displayedReadingsValues[itemType][displayedReading].icons[index].icon}
            value={`${value}${displayedReadingsValues[itemType][displayedReading].icons[index].unit}`}
        />
}

export default ReadingRow