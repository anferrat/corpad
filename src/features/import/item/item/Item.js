import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetImportItem } from '../../../../store/actions/importData'
import { useNavigation } from '@react-navigation/native'
import Pipeline from './Pipeline'
import Rectifier from './Rectifier'
import TestPoint from './TestPoint'

const ItemView = () => {
    const navigation = useNavigation()
    const navigateToParameters = (property, subitemIndex = null) =>
        navigation.navigate('ImportParameters',
            {
                property: property,
                subitemIndex: subitemIndex
            })
    const itemType = useSelector(state => state.importData.itemType)
    const fields = useSelector(state => state.importData.fields)
    const data = useSelector(state => state.importData.data)
    const dispatch = useDispatch()
    useEffect(() => () => {
        dispatch(resetImportItem())
    }, [])
    switch (itemType) {
        case 'TEST_POINT':
            return <TestPoint
                navigateToParameters={navigateToParameters}
                fields={fields}
                data={data} />
        case 'RECTIFIER':
            return null
        case 'PIPELINE':
            return null
        default:
            return null
    }
}

export default ItemView