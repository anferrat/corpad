import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'
import Unit from '../../../components/Unit'
import { LengthUnitLabels, ResistivityUnitLabels } from '../../../constants/labels'
import { displayResistance, displayResistivity, displaySpacing } from '../helpers/functions'


const ResistivityLayerView = ({ startSpacing, endSpacing, spacingUnit, resistance, resistivity, resistivityUnit }) => {
    const r1 = React.useMemo(() => displayResistance(resistance), [resistance])
    const r2 = React.useMemo(() => displayResistivity(resistivity), [resistivity])
    const s1 = React.useMemo(() => displaySpacing(startSpacing), [startSpacing])
    const s2 = React.useMemo(() => displaySpacing(endSpacing), [endSpacing])
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <Icon
                    name={'SR-layer'}
                    pack='cp'
                    style={styles.icon}
                    fill={basic} />
                <Text
                    category='s1'
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.mainTitle}>
                    Layer ({s1} - {s2} {LengthUnitLabels[spacingUnit]})
                </Text>
            </View>
            <DataRow
                label='Resistance'
                value={r1}
                unit={'\u03A9'} />
            <DataRow
                label='Resistivity'
                value={r2}
                unit={ResistivityUnitLabels[resistivityUnit]} />
        </View>
    )
}

export default ResistivityLayerView

const DataRow = ({ label, value, unit }) => (
    <View
        style={styles.result}>
        <Text
            appearance='hint'
            category='s2'
            style={styles.title}>
            {label}
        </Text>
        <View
            style={styles.valueView}>
            <Text
                style={styles.value}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {value ?? 'Error'}
            </Text>
            <Unit
                unit={unit} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12,
        flex: 1,
    },
    result: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    value: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right'
    },
    listItem: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    valueView: {
        flex: 1,
        flexDirection: 'row'
    },
    title: { maxWidth: '35%' },
    mainTitle: {
        flex: 1
    }
})