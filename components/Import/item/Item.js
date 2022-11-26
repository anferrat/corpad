import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetImportItem } from '../../../store/actions/importData'
import Pipeline from './Pipeline'
import Rectifier from './Rectifier'
import TestPoint from './TestPoint'

const ItemView = () => {
    const itemType = useSelector(state => state.importData.itemType)
    const dispatch = useDispatch()
    useEffect(() => () => {
        dispatch(resetImportItem())
    }, [])
    switch (itemType) {
        case 'TEST_POINT':
            return <TestPoint  />
        case 'RECTIFIER':
            return <Rectifier />
        case 'PIPELINE':
            return <Pipeline />
        default:
            return null
    }
}

export default ItemView