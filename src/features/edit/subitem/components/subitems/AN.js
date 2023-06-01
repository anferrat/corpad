import React from 'react'
import { StyleSheet } from 'react-native'
import PotentialsView from '../potentials/PotentialsView'
import Select from '../../../../../components/Select'
import WireView from '../WireView'
import NameInput from '../NameInput'
import { AnodeMaterials } from '../../../../../constants/global'
import { AnodeMaterialLabels } from '../../../../../constants/labels'

const anodeMaterialList = Object.values(AnodeMaterials).map(material => ({ item: AnodeMaterialLabels[material], index: material }))

const ANCard = ({ data, itemId, subitemId, update, validate }) => {
    const { name, defaultName, valid, anodeMaterial, wireColor, wireGauge } = data

    const onSelect = React.useCallback((index) => {
        update(index, 'anodeMaterial')
    }, [update])

    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <PotentialsView
                subitemId={subitemId}
                itemId={itemId} />
            <Select
                style={styles.select}
                property='anodeMaterial'
                itemList={anodeMaterialList}
                selectedIndex={anodeMaterial}
                placeholder="Select material"
                placeholderOption={true}
                onSelect={onSelect}
                label='Anode material' />
            <WireView
                update={update}
                wireColor={wireColor}
                wireGauge={wireGauge} />
        </>
    )
}

export default React.memo(ANCard)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})