import React from 'react'
import { StyleSheet } from 'react-native'
import PotentialsView from '../potentials/PotentialsView'
import WireView from '../WireView'
import NameInput from '../NameInput'
import Select from '../../../../../components/Select2'
import { ReferenceCellTypes } from '../../../../../constants/global'
import { ReferenceCellTypeLabels } from '../../../../../constants/labels'

const referenceCellTypes = Object.values(ReferenceCellTypes).map(type => ({ item: ReferenceCellTypeLabels[type], index: type }))

const RECard = ({ itemId, subitemId, data, update, validate }) => {
    const { name, defaultName, valid, rcType, wireColor, wireGauge } = data

    const onSelect = React.useCallback((index) => {
        update(index, 'rcType')
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
                placeholderOption={true}
                style={styles.select}
                onSelect={onSelect}
                property='rcType'
                itemList={referenceCellTypes}
                selectedIndex={rcType}
                placeholder="Select type"
                label='Reference cell type' />
            <WireView
                update={update}
                wireColor={wireColor}
                wireGauge={wireGauge} />
        </>
    )
}

export default React.memo(RECard)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})