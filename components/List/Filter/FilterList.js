import React from 'react'
import FilterListItem from '../../_Stateless/List/FilterListItem'
import { View, StyleSheet } from 'react-native'
import { filterOptions } from './Filter'
import { setFilterView } from '../../../store/actions/list'
import { useDispatch, useSelector } from 'react-redux'
import { getListStateByType } from '../../customFunctions'
import FilterCounter from './FilterCounter'
import FilterToggleListItem from '../../_Stateless/List/FilterToggleListItem'
import FilterToggle from './FilterToggle'
import { Text } from '@ui-kitten/components'

const FilterList = (props) => {
    const dispatch = useDispatch()
    const filterView = useSelector(state => getListStateByType(props.dataType, state).settings?.filterView)
    const updateFilterView = React.useCallback((filterView) => {
        dispatch(setFilterView(props.dataType, filterView))
    }, [props.dataType, dispatch])

    const renderFilters = React.useMemo(() => <>
        {filterOptions[props.dataType].map((filter, i) => <FilterListItem
            key={props.dataType + '-' + filter.property + '- ListItem'}
            title={<Text category='p2'>{filter.title} <FilterCounter dataType={props.dataType} filter={filter.property} /></Text>}
            onPress={updateFilterView.bind(this, i + 1)}
        />)}
        <FilterToggleListItem title={'Hide test points without readings'}>
            <FilterToggle filter={'hideEmptyTestPoints'} dataType={props.dataType} closeSheet={props.closeSheet} />
        </FilterToggleListItem>
    </>, [props.dataType, updateFilterView])

    return (
        <View style={!filterView ? styles.visible : styles.hidden}>
            {renderFilters}
        </View>
    )
}

export default FilterList

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    visible: {
        display: 'flex',
        flex: 1,
    }
})