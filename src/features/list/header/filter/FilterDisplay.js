import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { getListStateByType } from '../../../../helpers/functions'
import FilterOptions from './FilterOptions'


const FilterDisplay = (props) => {
    const filterView = useSelector(state => getListStateByType(props.dataType, state).settings?.filterView, (next, prev) => next !== props.filterViewIndex && (next !== 0 || prev !== props.filterViewIndex))
    return <View style={filterView === props.filterViewIndex ? styles.visible : styles.hidden}>
        <FilterOptions dataType={props.dataType} filter={props.filter} filterView={filterView} />
    </View>
}

export default React.memo(FilterDisplay)

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    visible: {
        display: 'flex',
        flex: 1
    }
})