import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'
import PipelineSelect from './PipelineSelect'
import Potentials from './Potentials'

const PL = () => {
    return (
        <>
            <Parameter
                property='name' />
            <PipelineSelect />
            <Potentials />
            <View style={styles.parameterRow}>
                <Parameter
                    style={styles.rowItem}
                    property='wireColor' />
                <Parameter
                    style={styles.rowItem}
                    property='wireGauge' />
            </View>
        </>
    )
}

export default PL


const styles = StyleSheet.create({
    parameterRow: {
        flexDirection: 'row',
        marginHorizontal: -6,
    },
    rowItem: {
        flex: 1,
        marginHorizontal: 6,
    },
})