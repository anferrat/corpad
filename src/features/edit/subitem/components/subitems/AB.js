import React from 'react'
import { StyleSheet } from 'react-native'
import Select from '../../../../../components/Select'
import NameInput from '../NameInput'
import { AnodeBedEnclosureTypes, AnodeBedMaterialTypes, AnodeBedTypes } from '../../../../../constants/global'
import { AnodeBedEnclosureTypeLabels, AnodeBedMateriaTypelLabels, AnodeBedTypeLabesl } from '../../../../../constants/labels'
import { addIcon } from '../../../../../components/Icons'
import { Button, Text } from '@ui-kitten/components'
import AnodeBedAnodeView from '../AnodeBedAnodeView'
import AnodeBedWireModal from '../AnodeBedWireModal'
import { translateEdit } from '../../../../../localization'

const ABCard = ({ data, update, validate, addAnodeBedAnodeHandler, deleteAnodeBedAnodeHandler, updateSubProperty, validateSubProperty, updateAnodeWireProperties }) => {
    const { name, defaultName, valid, bedType, materialType, enclosureType, anodes, } = data
    const anodeBedMaterialList = React.useMemo(() => Object.values(AnodeBedMaterialTypes).map(material => ({ item: AnodeBedMateriaTypelLabels[material], index: material })), [])
    const anodeBedEnclosureList = React.useMemo(() => Object.values(AnodeBedEnclosureTypes).map(enclosure => ({ item: AnodeBedEnclosureTypeLabels[enclosure], index: enclosure })), [])
    const anodeBedTypeList = React.useMemo(() => Object.values(AnodeBedTypes).map(type => ({ item: AnodeBedTypeLabesl[type], index: type })), [])

    const [modalIndex, setModalIndex] = React.useState(null)

    const maxNumberReached = anodes.length >= 10

    const onSelectMaterial = React.useCallback((index) => {
        update(index, 'materialType')
    }, [update])

    const onSelectType = React.useCallback((index) => {
        update(index, 'bedType')
    }, [update])

    const onSelectEnclosure = React.useCallback((index) => {
        update(index, 'enclosureType')
    }, [update])

    const onUpdateSubProperty = React.useCallback((value, property, index) => {
        updateSubProperty(value, property, index, 'anodes')
    }, [updateSubProperty])

    const onValidateSubProperty = React.useCallback((property, index) => {
        validateSubProperty(property, index, 'anodes')
    }, [validateSubProperty])

    const hideModal = React.useCallback(() => { setModalIndex(null) }, [])

    const showModal = React.useCallback((index) => { setModalIndex(index) }, [])
    
    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <Select
                style={styles.select}
                property='materialType'
                itemList={anodeBedMaterialList}
                selectedIndex={materialType}
                placeholderOption={true}
                onSelect={onSelectMaterial}
                label={translateEdit('material')} />
            <Select
                style={styles.select}
                property='bedType'
                itemList={anodeBedTypeList}
                selectedIndex={bedType}
                placeholderOption={true}
                onSelect={onSelectType}
                label={translateEdit('groundbedType')} />
            <Select
                style={styles.select}
                property='enclosureType'
                itemList={anodeBedEnclosureList}
                selectedIndex={enclosureType}
                placeholderOption={true}
                onSelect={onSelectEnclosure}
                label={translateEdit('enclosure')} />
            {anodes.length > 0 ?
                <Text
                    style={styles.label}
                    category='label'
                    appearance='hint'>
                    {translateEdit('outputCurrent')}
                </Text> : null}
            {anodes.map(({ current, wireColor, wireGauge }, index) =>
                <AnodeBedAnodeView
                    valid={valid.anodes[index]}
                    deleteAnodeBedAnodeHandler={deleteAnodeBedAnodeHandler}
                    key={'' + index}
                    current={current}
                    wireColor={wireColor}
                    wireGauge={wireGauge}
                    index={index}
                    showModal={showModal}
                    update={onUpdateSubProperty}
                    validate={onValidateSubProperty}
                />)}
            <Button
                disabled={maxNumberReached}
                appearance='ghost'
                accessoryLeft={maxNumberReached ? null : addIcon}
                onPress={addAnodeBedAnodeHandler}
                style={styles.button}>
                {maxNumberReached ?
                    translateEdit('maxAnodes') :
                    translateEdit('addAnode', { count: anodes.length })}
            </Button>
            <AnodeBedWireModal
                updateAnodeWireProperties={updateAnodeWireProperties}
                visible={modalIndex !== null}
                key={modalIndex}
                update={onUpdateSubProperty}
                hideModal={hideModal}
                wireColor={anodes[modalIndex] ? anodes[modalIndex].wireColor : null}
                wireGauge={anodes[modalIndex] ? anodes[modalIndex].wireGauge : null}
                index={modalIndex}
            />
        </>
    )
}

export default React.memo(ABCard)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    },
    button: {
        marginHorizontal: -12,
        marginBottom: -12,
        height: 60
    },
    label: {
        paddingBottom: 12
    }
})
