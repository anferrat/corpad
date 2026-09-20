import React from 'react'
import { StyleSheet, View } from 'react-native'
import Select from '../../../../../components/Select'
import NameInput from '../NameInput'
import Input from '../../../../../components/Input'
import { LengthUnits, ResistivityUnits } from '../../../../../constants/global'
import { LengthUnitDescriptionLabels, LengthUnitLabels, ResistivityUnitDescriptionLabels } from '../../../../../constants/labels'
import { Button } from '@ui-kitten/components'
import { addIcon, plus, plusCircle } from '../../../../../components/Icons'
import SoilResistivityLayer from '../SoilResistivityLayer'
import { translateEdit } from '../../../../../localization'



const SRCard = ({ data, update, validate, deleteSoilResistivityLayerHandler, addSoilResistivityLayerHandler, updateSpacingUnit, updateSubProperty, validateSubProperty }) => {
    const { name, defaultName, valid, spacingUnit, resistivityUnit, comment, layers } = data
    const resistivityUnitList = React.useMemo(() => Object.values(ResistivityUnits).map(unit => ({ item: `${ResistivityUnitDescriptionLabels[unit]}` })), [])
    const spacingUnitList = React.useMemo(() => Object.values(LengthUnits).map(unit => ({ item: `${LengthUnitDescriptionLabels[unit]} (${LengthUnitLabels[unit]})`, index: unit })), [])

    const maxNumberReached = layers.length >= 6

    const onSelectSpacingUnit = React.useCallback((index) => {
        updateSpacingUnit(index)
    }, [updateSpacingUnit])

    const onSelectResistivityUnit = React.useCallback((index) => {
        update(index, 'resistivityUnit')
    }, [update])

    const onChangeText = React.useCallback((value) => update(value, 'comment'), [update])

    const onEndEditing = React.useCallback(() => validate('comment'), [validate])

    const onUpdateLayer = React.useCallback((value, property, index) => { updateSubProperty(value, property, index, 'layers') }, [updateSubProperty])

    const onValidateLayer = React.useCallback((property, index) => { validateSubProperty(property, index, 'layers') }, [validateSubProperty])

    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <View
                style={styles.units}>
                <Select
                    style={styles.selectLeft}
                    property='spacingUnit'
                    itemList={spacingUnitList}
                    selectedIndex={spacingUnit}
                    placeholder={translateEdit('selectMaterial')}
                    onSelect={onSelectSpacingUnit}
                    label={translateEdit('spacingUnit')} />
                <Select
                    style={styles.selectRight}
                    property='resistivityUnit'
                    itemList={resistivityUnitList}
                    selectedIndex={resistivityUnit}
                    placeholder={translateEdit('selectResistivityUnit')}
                    onSelect={onSelectResistivityUnit}
                    label={translateEdit('resistivityUnit')} />
            </View>
            <Input
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
                maxLength={300}
                multiline={true}
                valid={valid.comment}
                textAlignVertical={'top'}
                numberOfLines={3}
                value={comment}
                property='comment'
                />

            {layers.map(({ resistanceToZero, spacing }, index) =>
                <SoilResistivityLayer
                    onUpdateLayer={onUpdateLayer}
                    onValidateLayer={onValidateLayer}
                    spacingUnit={spacingUnit}
                    key={index}
                    valid={valid.layers[index]}
                    spacing={spacing}
                    resistance={resistanceToZero}
                    index={index}
                    deleteSoilResistivityLayer={deleteSoilResistivityLayerHandler}
                />)}
            <Button
                disabled={maxNumberReached}
                appearance='ghost'
                accessoryLeft={maxNumberReached ? null : addIcon}
                onPress={addSoilResistivityLayerHandler}
                style={styles.button}>
                {maxNumberReached ?
                    translateEdit('maxLayers') :
                    translateEdit('addLayer', { count: layers.length })}
            </Button>
        </>
    )
}

export default React.memo(SRCard)

const styles = StyleSheet.create({
    selectLeft: {
        paddingBottom: 12,
        flex: 1,
        marginRight: 6
    },
    selectRight: {
        paddingBottom: 12,
        flex: 1,
        marginLeft: 6
    },
    units: {
        flexDirection: 'row'
    },
    button: {
        marginHorizontal: -12,
        marginBottom: -12,
        height: 60
    }
})
