import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import Select from '../../../../components/Select'
import { ImportData } from '../ImportDataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { getSubitemProperty } from '../helpers/functions'
import { setImportSubitemSetting } from '../../../../store/actions/importData'

const pipeIcon = {
    icon: 'PL',
    pack: 'cp'
}

const PipelineSelect = () => {
    const importData = useContext(ImportData)
    const selectedIndex = useSelector(state => getSubitemProperty(state, importData.subitemIndex, 'pipelineIndex'))
    const pipelineList = React.useMemo(() => importData.extraData.pipelineList.map(pipeline => pipeline.name), [importData.extraData.pipeineList])
    const dispatch = useDispatch()

    const onSelect = (selectedIndex) => {
        dispatch(setImportSubitemSetting('pipelineIndex', importData.subitemIndex, selectedIndex))
    }

    return (
        <Select
            placeholderOption={true}
            label={'Pipeline'}
            placeholder='Select pipeline'
            style={styles.select}
            itemList={pipelineList}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
            accessory={pipeIcon}
        />
    )
}

export default PipelineSelect

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})