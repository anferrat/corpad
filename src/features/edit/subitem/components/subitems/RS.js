import React, { useMemo, useCallback } from 'react'
import PotentialsView from '../potentials/PotentialsView'
import { StyleSheet } from 'react-native'
import Select from '../../../../../components/Select2'
import { pipeDiameterList } from '../../../../../constants/constants'
import NameInput from '../NameInput'

const pipeAccessory = {
    icon: 'PL',
    pack: 'cp'
}

const RSCard = ({ pipelineList, data, itemId, subitemId, update, validate }) => {
    const { pipelineId, name, valid, nps, defaultName } = data

    const onSelectSize = React.useCallback((index) => update(index, 'nps'), [update])

    const itemList = useMemo(() => pipelineList.map(({ id, name }) => ({ item: name, id })), [pipelineList])

    const selectedIndex = useMemo(() => {
        const index = itemList.findIndex(({ id }) => pipelineId === id)
        return ~index ? index : null
    }, [itemList, pipelineId])

    const onSelectPipe = useCallback((index) => {
        update(itemList[index]?.id ?? null, 'pipelineId')
    }, [update, itemList])

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
                placeholderOption={true}
                accessory={pipeAccessory}
                onSelect={onSelectPipe}
                property='pipelineId'
                itemList={itemList}
                selectedIndex={selectedIndex}
                placeholder="Select pipeline"
                label='Pipeline' />
            <Select
                placeholderOption={true}
                style={styles.size}
                onSelect={onSelectSize}
                property='nps'
                itemList={pipeDiameterList}
                selectedIndex={nps}
                placeholder="Select NPS"
                label='Diameter' />
        </>
    )
}

export default React.memo(RSCard)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    },
    size: {
        paddingBottom: 12
    }
})