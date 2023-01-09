import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { globalStyle } from '../../../../styles/styles'
import Pipeline from './Pipeline'
import Rectifier from './Rectifier'
import TestPoint from './TestPoint'
import AddSubitemButton from './AddSubitemButton'
import { addSubitem } from '../../../../store/actions/importData'
import { ImportData } from '..'
import { getPotentialsData } from '../helpers/functions'
import SubitemList from './SubitemList'

const ItemView = ({ pushToSubitem }) => {
    const importData = useContext(ImportData)
    const itemType = useSelector(state => state.importData.itemType)
    const dispatch = useDispatch()
    const subitems = useSelector(state => state.importData.subitems)

    const addSubitemHandler = React.useCallback((type) => {

        const { autoCreate, init } = getPotentialsData(
            importData.extraData.autoCreatePotentials,
            importData.extraData.potentialTypes,
            importData.extraData.referenceCellList)
        dispatch(addSubitem(type, autoCreate, init))
        pushToSubitem(null, true, type)

    }, [importData.extraData.autoCreatePotentials, importData.extraData.potentialTypes, importData.extraData.referenceCellList, pushToSubitem, dispatch])



    return (
        <>
            <View style={globalStyle.card}>
                <ItemSelector itemType={itemType} />
                <View style={styles.button}>
                    <AddSubitemButton
                        onSelect={addSubitemHandler}
                        itemType={itemType} />
                </View>
            </View>
            <SubitemList
                subitems={subitems}
                pushToSubitem={pushToSubitem} />
        </>
    )
}

export default ItemView

const ItemSelector = ({ itemType }) => {
    switch (itemType) {
        case 'TEST_POINT':
            return <TestPoint />
        case 'RECTIFIER':
            return <Rectifier />
        case 'PIPELINE':
            return <Pipeline />
        default:
            return null
    }
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: -12,
        marginBottom: -12
    }
})

