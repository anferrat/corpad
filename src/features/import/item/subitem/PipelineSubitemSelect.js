import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Select from '../../../../components/Select2'
import { getCardList, getSelectedConnectionIndex } from '../helpers/selectors'
import { useDispatch } from 'react-redux'
import { setImportSubitemSetting } from '../../../../store/actions/importData'
import { ImportData } from '..'

const COUPON_CONNECTION_TYPES = ['PL', 'RS']

const PipelineSubitemSelect = () => {
    const { subitemIndex } = useContext(ImportData)
    const dispatch = useDispatch()
    const connections = useSelector(state=>getCardList(state, COUPON_CONNECTION_TYPES))
    const selectedIndex = useSelector(state => getSelectedConnectionIndex(state, subitemIndex, COUPON_CONNECTION_TYPES))
    const onSelect = (newSelectedIndex) => {
        if (newSelectedIndex !== selectedIndex)
            dispatch(setImportSubitemSetting('pipelineCardKey', subitemIndex, connections[newSelectedIndex]?.key ?? null))
    }
    return (
        <Select
            placeholderOption={true}
            label={'Connected to'}
            placeholder={'Disconnected'}
            style={styles.select}
            itemList={connections}
            selectedIndex={selectedIndex}
            onSelect={onSelect} />
    )
}

export default PipelineSubitemSelect


const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})