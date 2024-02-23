import React from 'react'
import { ItemTypes } from '../../../constants/global'
import TP from '../items/TP'
import RT from '../items/RT'
import { combineLatLon } from '../helpers/functions'
import { getFullDate } from '../../../helpers/functions'


const ItemFactory = (props) => {
    const { itemType, latitude, longitude, timeModified } = props

    const coord = combineLatLon(latitude, longitude)
    const date = getFullDate(timeModified)

    switch (itemType) {
        case ItemTypes.TEST_POINT:
            return <TP
                {...props}
                coord={coord}
                date={date} />
        case ItemTypes.RECTIFIER:
            return <RT
                {...props}
                date={date}
                coord={coord} />
        default:
            return null
    }
}

export default ItemFactory