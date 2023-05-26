import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider } from '@ui-kitten/components'
import { getListStateByType } from '../../../../helpers/functions'
import SortingFlatList from '../components/FlatList'
import RadioListOption from '../components/RadioListOption'
import { setSortingSetting } from '../../../../store/actions/list'
import { SortingOptions } from '../../../../constants/global'
import { SortingOptionLabels } from '../../../../constants/labels'

const sortingOptions = Object.values(SortingOptions)

const SortingDisplay = (props) => {
    const dispatch = useDispatch()
    const sorting = useSelector(state => getListStateByType(props.dataType, state).settings.sorting)

    const updateSortingHandler = React.useCallback((index) => {
        if (index !== sorting || index === 4) //index '4' - is for location update
            dispatch(setSortingSetting(props.dataType, index))
        props.closeSheet()
    }, [sorting, props.closeSheet, dispatch])

    const renderItem = React.useCallback(({ item }) => {
        return <RadioListOption
            checked={item === sorting}
            onChange={updateSortingHandler.bind(this, item)}
            title={SortingOptionLabels[item]} />
    }, [updateSortingHandler, sorting])

    return (
        <SortingFlatList
            ItemSeparatorComponent={Divider}
            data={sortingOptions}
            renderItem={renderItem} />
    )
}

export default SortingDisplay