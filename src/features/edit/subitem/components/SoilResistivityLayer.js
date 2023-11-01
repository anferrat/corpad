import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../../../../components/Input'
import { Icon, Text } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'
import { basic } from '../../../../styles/colors'
import { LengthUnitLabels } from '../../../../constants/labels'


const SoilResistivityLayer = ({ valid, spacing, resistance, deleteSoilResistivityLayer, index, spacingUnit, onUpdateLayer, onValidateLayer }) => {
    const onDelete = React.useCallback(() => {
        deleteSoilResistivityLayer(index)
    }, [])

    const onEditSpacing = (value) => onUpdateLayer(value, 'spacing', index)

    const onEditResistance = (value) => onUpdateLayer(value, 'resistanceToZero', index)

    const onEndEditingSpacing = React.useCallback(() => onValidateLayer('spacing', index), [index])

    const onEndEditingResistance = React.useCallback(() => onValidateLayer('resistanceToZero', index), [index])

    return (
        <View
            style={styles.container}>
            <View
                style={styles.title}>
                <View style={styles.titleText}>
                    <Icon
                        name='SR-layer'
                        pack='cp'
                        style={styles.icon}
                        fill={basic} />
                    <Text
                        category='p1'
                        appearance='hint'>
                        Layer #{index + 1}
                    </Text>
                </View>
                <IconButton
                    iconName='close'
                    onPress={onDelete} />
            </View>
            <View
                style={styles.inputs}>
                <Input
                    onChangeText={onEditSpacing}
                    onEndEditing={onEndEditingSpacing}
                    style={styles.leftInput}
                    maxLength={8}
                    valid={valid.spacing}
                    label='Spacing'
                    keyboardType={'numeric'}
                    value={spacing}
                    property='spacing'
                    unit={LengthUnitLabels[spacingUnit]}
                />
                <Input
                    style={styles.rightInput}
                    onChangeText={onEditResistance}
                    onEndEditing={onEndEditingResistance}
                    maxLength={8}
                    valid={valid.resistanceToZero}
                    label='Resistance'
                    keyboardType={'numeric'}
                    value={resistance}
                    property='resistanceToZero'
                    unit={'\u03A9'}
                />
            </View>
        </View>
    )
}

export default React.memo(SoilResistivityLayer)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
    },
    titleText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        flexDirection: 'row'
    },
    leftInput: {
        marginRight: 6,
        flex: 1
    },
    rightInput: {
        marginLeft: 6,
        flex: 1
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    }
})