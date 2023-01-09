import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'
import PipelineSubitemSelect from './PipelineSubitemSelect'
import Potentials from './Potentials'
import Hint from '../../../../components/Hint'

const CN = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Parameter
                property='couponType' />
            <PipelineSubitemSelect />
            <Potentials />
            <Parameter
                property='area' />
            <Parameter
                property='current' />
            <View style={styles.hint}>
                <Hint>
                    Current density will be calculated after importing
                </Hint>
            </View>
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

export default CN


const styles = StyleSheet.create({
    parameterRow: {
        flexDirection: 'row',
        marginHorizontal: -6,
    },
    rowItem: {
        flex: 1,
        marginHorizontal: 6,
    },
    hint: {
        paddingBottom: 12
    }
})