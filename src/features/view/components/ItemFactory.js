import React from 'react'
import TP from './items/TP'
import PL from './items/PL'
import RT from './items/RT'

const ItemFactory = ({ itemType, updateStatus, submit, update, data }) => {
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
                submit={submit}
                update={update}
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