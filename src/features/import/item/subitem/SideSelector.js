import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import MultiSelect from '../../../../components/MultiSelect2'
import { useDispatch, useSelector } from 'react-redux'
import { ImportData } from '../ImportDataProvider'
import { getCardList, getSideSelectedIndexes } from '../helpers/selectors'
import { setImportSubitemSetting } from '../../../../store/actions/importData'


const SideSelector = ({ sideTypes, isSideA }) => {
    const { subitemIndex } = useContext(ImportData)
    const dispatch = useDispatch()
    const side = useSelector(state => getCardList(state, sideTypes))
    const selectedSideIndexes = useSelector(state => getSideSelectedIndexes(state, subitemIndex, sideTypes, isSideA))

    const onSelect = (selectedIndexes) => {
        dispatch(setImportSubitemSetting(isSideA ? 'sideA' : 'sideB', subitemIndex, selectedIndexes.map(i => side[i].key)))
    }

    return <MultiSelect
        style={styles.select}
        label={isSideA ? 'Side A' : 'Side B'}
        placeholder='Select items'
        valid={true}
        selectedItems={selectedSideIndexes}
        itemList={side}
        onSelect={onSelect} />
}

export default React.memo(SideSelector)

const styles = StyleSheet.create({
    select: {
        flex: 1
    }
})