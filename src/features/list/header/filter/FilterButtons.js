import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@ui-kitten/components'
import { filterHandler, resetFilters } from '../../../../store/actions/list'
import { getListStateByType } from '../../../../helpers/functions'


const FilterButtons = (props) => {
    const dispatch = useDispatch()
    const displayReset = useSelector(state => getListStateByType(props.dataType, state).settings.filterCounter !== 0)
    const displayApply = useSelector(state => getListStateByType(props.dataType, state).settings.filterView !== 0)

    const resetFiltersHandler = () => {
        dispatch(resetFilters(props.dataType))
        props.closeSheet()
    }

    const activateFilters = () => {
        dispatch(filterHandler(props.dataType))
        props.closeSheet()
    }

    return <View style={styles.bottomBar}>
        <Button style={displayReset ? styles.button : styles.hidden} appearance='outline' onPress={resetFiltersHandler}>Clear filters</Button>
        <View style={displayReset ? styles.hidden : styles.button} />
        <Button style={displayApply ? styles.button : styles.hidden}  onPress={activateFilters}>Apply</Button>
    </View>
}

export default FilterButtons


const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        width: '100%'
    },
    button: {
        height: 42,
        width: 125
    },
    hidden: {
        display: 'none',
    },
    buttonText: {
        fontWeight: 'bold',
        paddingHorizontal: 6,
    }
})