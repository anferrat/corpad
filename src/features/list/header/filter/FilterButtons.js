import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@ui-kitten/components'
import { filterHandler, resetFilters } from '../../../../store/actions/list'
import { getListStateByType } from '../../../../helpers/functions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const FilterButtons = (props) => {
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
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

    return <View
        style={{ ...styles.bottomBar, paddingBottom: insets.bottom + 12 }}>
        {displayReset ?
            <Button style={styles.button} appearance='outline' onPress={resetFiltersHandler}>Clear filters</Button>
            : <View style={styles.button} />}
        {displayApply ?
            <Button style={styles.button} onPress={activateFilters}>Apply</Button> : null}
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
        width: 125
    },
    buttonText: {
        fontWeight: 'bold',
        paddingHorizontal: 6,
    }
})