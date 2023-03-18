import React from 'react'
import TP from './items/TP'
import PL from './items/PL'
import RT from './items/RT'

const ItemFactory = ({ itemType, updateStatus, updateTap, data }) => {
    switch (itemType) {
        case 'TEST_POINT':
            return <TP
                itemType={itemType}
                data={data}
                updateStatus={updateStatus} />
        case 'RECTIFIER':
            return <RT
                itemType={itemType}
                data={data}
                updateStatus={updateStatus}
                updateTap={updateTap}
            />
        case 'PIPELINE':
            return <PL
                itemType={itemType}
                data={data} />
        default:
            return null
    }
}

export default ItemFactory