import React from 'react'
import TP from './items/TP'
import RT from './items/RT'
import PL from './items/PL'
import { ItemTypes } from '../../../../constants/global'

const ItemFactory = ({ item, itemType, update, validate, createSubitem, updateLatAndLon, updateTap, isPro }) => {

    switch (itemType) {
        case ItemTypes.TEST_POINT:
            return <TP
                data={item}
                isPro={isPro}
                updateLatAndLon={updateLatAndLon}
                itemType={itemType}
                update={update}
                validate={validate}
                createSubitem={createSubitem} />
        case ItemTypes.RECTIFIER:
            return <RT
                updateTap={updateTap}
                isPro={isPro}
                updateLatAndLon={updateLatAndLon}
                itemType={itemType}
                data={item}
                update={update}
                validate={validate}
                createSubitem={createSubitem} />
        case ItemTypes.PIPELINE:
            return <PL
                data={item}
                update={update}
                validate={validate} />
        default: return null
    }
}

export default ItemFactory