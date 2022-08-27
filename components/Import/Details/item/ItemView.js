import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetImportItem } from '../../../../store/actions/importData'
import PipelineView from './PipelineView'
import RectifierView from './RectifierView'
import TestPointView from './TestPointView'

const ItemView = () => {
    const itemType = useSelector(state => state.importData.itemType)
    const dispatch = useDispatch()
    useEffect(() => () => {
        dispatch(resetImportItem())
    }, [])
    switch (itemType) {
        case 'TEST_POINT':
            return <TestPointView />
        case 'RECTIFIER':
            return <RectifierView />
        case 'PIPELINE':
            return <PipelineView />
        default:
            return null
    }
}

export default ItemView