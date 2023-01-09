import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'
import Potentials from './Potentials'

const OT = () => {
    return (
        <>
            <Parameter
                property='name' />
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

export default OT


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