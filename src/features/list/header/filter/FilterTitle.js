import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SheetHeader from '../components/SheetHeader'
import { getListStateByType } from '../../../../helpers/functions'
import { filterOptions } from './Filter'
import { setFilterView } from '../../../../store/actions/list'

const FilterTitle = (props) => {
    const filterView = useSelector(state => getListStateByType(props.dataType, state).settings.filterView)
    const dispatch = useDispatch()
    const onClose = () => {
        if (filterView)
            dispatch(setFilterView(props.dataType, 0))
        props.closeSheet()
    }

    return (
        <SheetHeader
            onCloseHandler={onClose}
            backActionHandler={filterView ? props.backAction : false}
            title={filterView ? filterOptions[props.dataType][filterView - 1]?.title : 'Filters'} />
    )
}

export default FilterTitle