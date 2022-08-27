import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListStateByType } from '../../customFunctions'
import SortingFlatList from '../../_Stateless/List/FlatList'
import { sortingOptions } from '../../../constants/constants'
import RadioListOption from '../../_Stateless/List/RadioListOption'
import { setSortingSetting } from '../../../store/actions/list'
import { Divider } from '@ui-kitten/components'

const SortingDisplay = (props) => {
    const dispatch = useDispatch()
    const sorting = useSelector(state => getListStateByType(props.dataType, state).settings.sorting)

    const updateSortingHandler = React.useCallback((index) => {
        if (index !== sorting || index === 4) //index '4' - is for location update
            dispatch(setSortingSetting(props.dataType, index))
        props.closeSheet()
    }, [sorting, props.closeSheet, dispatch])

    const renderItem = React.useCallback(({ item, index }) => {
        return <RadioListOption
            checked={index === sorting}
            onChange={updateSortingHandler.bind(this, index)}
            title={item}
        />
    }, [updateSortingHandler, sorting])
    return (
        <SortingFlatList
            ItemSeparatorComponent={Divider}
            data={sortingOptions}
            renderItem={renderItem}
        />
    )
}

export default SortingDisplay