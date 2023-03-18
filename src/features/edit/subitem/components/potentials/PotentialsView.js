import React from 'react'
import { Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { AddPotentials } from '../../../../../components/AddPotentialModal'
import LoadingView from '../../../../../components/LoadingView'
import PotentialList from './PotentialList'
import usePotentialsData from '../../hooks/usePotentialsData'

const PotentialsView = ({ subitemId, itemId }) => {
    const { potentialsData, selected, createPotentialHandler, deletePotentialHandler, updatePotentialHandler } = usePotentialsData({ subitemId, itemId })
    const { loading, potentials, referenceCells, potentialTypes, unit } = potentialsData
    return (
        <LoadingView loading={loading} size={'small'} style={styles.loading}>
            <View
                style={styles.mainView}>
                <Text
                    style={styles.label}
                    appearance='hint'
                    category='label'>
                    Potentials
                </Text>
                <PotentialList
                    potentials={potentials}
                    unit={unit}
                    deletePotentialHandler={deletePotentialHandler}
                    updatePotentialHandler={updatePotentialHandler} />
                <AddPotentials
                    referenceCellList={referenceCells}
                    potentialTypes={potentialTypes}
                    onSelect={createPotentialHandler}
                    selectedTypes={selected} />
            </View>
        </LoadingView>
    )
}

export default React.memo(PotentialsView)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    loading: {
        height: 100
    },
    label: {
        paddingBottom: 4
    }
})