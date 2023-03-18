import React from 'react'
import TP from './items/TP'
import RT from './items/RT'
import PL from './items/PL'

const ItemFactory = ({ item, itemType, update, validate, createSubitem, updateLatAndLon, updateTap }) => {

    switch (itemType) {
        case 'TEST_POINT':
            return <TP
                data={item}
                updateLatAndLon={updateLatAndLon}
                itemType={itemType}
                update={update}
                validate={validate}
                createSubitem={createSubitem} />
        case 'RECTIFIER':
            return <RT
                updateTap={updateTap}
                updateLatAndLon={updateLatAndLon}
                itemType={itemType}
                data={item}
                update={update}
                validate={validate}
                createSubitem={createSubitem} />
        case 'PIPELINE':
            return <PL
                data={item}
                update={update}
                validate={validate} />
        default: return null
    }
}

export default ItemFactory