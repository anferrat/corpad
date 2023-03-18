import React, { useMemo, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import PotentialsView from '../potentials/PotentialsView'
import Select from '../../../../../components/Select2'
import WireView from '../WireView'
import NameInput from '../NameInput'

const pipeAccessory = {
    icon: 'PL',
    pack: 'cp'
}

const PLCard = ({ pipelineList, data, itemId, subitemId, update, validate }) => {
    const { name, defaultName, valid, wireColor, wireGauge, pipelineId } = data

    const itemList = useMemo(() => pipelineList.map(({ id, name }) => ({ item: name, id })), [pipelineList])

    const selectedIndex = useMemo(() => {
        const index = itemList.findIndex(({ id }) => pipelineId === id)
        return ~index ? index : null
    }, [itemList, pipelineId])

    const onSelect = useCallback((index) => {
        update(itemList[index]?.id ?? null, 'pipelineId')
    }, [update, itemList])


    return <>
        <NameInput
            name={name}
            valid={valid.name}
            defaultName={defaultName}
            update={update}
            validate={validate} />
        <Select
            style={styles.select}
            placeholderOption={true}
            accessory={pipeAccessory}
            onSelect={onSelect}
            property='pipelineId'
            itemList={itemList}
            selectedIndex={selectedIndex}
            placeholder="Select pipeline"
            label='Pipeline' />
        <PotentialsView
            subitemId={subitemId}
            itemId={itemId} />
        <WireView
            update={update}
            wireColor={wireColor}
            wireGauge={wireGauge} />
    </>
}

export default React.memo(PLCard)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})