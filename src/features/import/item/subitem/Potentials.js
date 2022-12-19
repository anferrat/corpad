import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ImportData } from '..'
import { AddPotentials } from '../../../../components/AddPotentialModal'
import { addPotential, removePotential } from '../../../../store/actions/importData'
import { getSubitemProperty } from '../helpers/functions'
import PotentialList from './PotentialList'


const Potentials = () => {
    const dispatch = useDispatch()
    const importData = useContext(ImportData)
    const potentials = useSelector(state => getSubitemProperty(state, importData.subitemIndex, 'potentials'))
    const selectedTypes = React.useMemo(() => potentials.map(p => ({ potentialTypeIndex: p.potentialTypeIndex, referenceCellIndex: p.referenceCellIndex })), [potentials.length])
    const addPotentialHandler = React.useCallback((potentialTypeIndex, referenceCellIndex) => {
        dispatch(addPotential(importData.subitemIndex, potentialTypeIndex, referenceCellIndex))
    }, [dispatch])

    const deletePotentialHandler = React.useCallback((potentialIndex) => {
        dispatch(removePotential(importData.subitemIndex, potentialIndex))
    }, [dispatch])

        return (
            <View style={styles.mainView}>
                <PotentialList
                    deletePotentialHandler={deletePotentialHandler}
                    potentials={potentials}
                    navigateToParameters={importData.navigateToParameters}
                    subitemIndex={importData.subitemIndex}
                    fields={importData.fields}
                    data={importData.data} />
                <AddPotentials
                    referenceCellList={importData.extraData.referenceCellList}
                    potentialTypes={importData.extraData.potentialTypes}
                    selectedTypes={selectedTypes}
                    onSelect={addPotentialHandler} />
            </View>
        )
}

export default Potentials

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    }
})