import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckBoxListItem from '../components/CheckBoxListItem'
import FlatList from '../components/FilterFlatList'
import { applyFilter, setFilterView } from '../../../../store/actions/list'
import { getListStateByType } from '../../../../helpers/functions'
import { testPointReadings, testPointTypeCodes, statusInfo, testPointTypes, labels } from '../../../../constants/constants'


const getOptionByFilter = (filter) => {
    switch (filter) {
        case 'statusFilter':
            return statusInfo.map((status, index) => ({ ...status, value: index }))
        case 'testPointTypeFilter':
            return testPointTypeCodes.map((type, index) => ({ icon: type, title: testPointTypes[index], value: index }))
        case 'readingTypeFilter':
            return testPointReadings.map(type => ({ icon: type, title: labels[type].label, value: type }))
    }
}
const initFilter = []

const FilterOptions = (props) => {
    const applyFilters = useSelector(state => getListStateByType(props.dataType, state).settings.applyFilters)
    const filterValues = useSelector(state => getListStateByType(props.dataType, state).settings.appliedFilters[props.filter])
    const filterOptions = React.useMemo(() => getOptionByFilter(props.filter), [props.filter])
    const [filter, setFilter] = useState(initFilter)
    const filtersSynced = React.useMemo(() => filter.every(f => filterValues.indexOf(f) !== -1) && filter.length === filterValues.length, [filterValues, filter, applyFilters, props.filterView])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!filtersSynced)
            setFilter(filterValues)
    }, [filterValues, props.filterView])

    const updateFilter = React.useCallback((value) => {
        setFilter(old => old.indexOf(value) === -1 ? old.concat(value) : old.filter(o => o !== value))
    }, [setFilter])

    useEffect(() => {
        if (applyFilters && !filtersSynced) {
            dispatch(applyFilter(props.dataType, props.filter, filter))
        }
        else if (applyFilters) {
            dispatch(setFilterView(props.dataType, 0))
        }
    }, [applyFilters])

    const renderOptions = React.useCallback(({ item }) => <CheckBoxListItem
        icon={item.icon}
        key={props.dataType + '-' + item.title + '-FilterOptions'}
        status={props.filter === 'statusFilter' ? item.status : undefined}
        pack={props.filter !== 'statusFilter' ? 'cp' : undefined}
        title={item.title}
        value={item.value}
        checked={filter.indexOf(item.value) === -1}
        onChange={updateFilter.bind(this, item.value)}
    />, [updateFilter, filter])

    //const options = React.useMemo(() => filterOptions.map(renderOptions), [renderOptions, filterOptions])

    return <FlatList
        data={filterOptions}
        renderItem={renderOptions}
    />
}


export default React.memo(FilterOptions)
