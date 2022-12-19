import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'
import Potentials from './Potentials'

const RE = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Parameter
                property='rcType' />
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

export default RE


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