import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateSubitemProperty } from '../../../../store/actions/subitem'
import { verifyTypes } from '../../../../helpers/functions'
import MultiSelectField from '../../../../components/MultiSelect'

const MultiSelectConnectionCardField = (props) => {
    const dispatch = useDispatch()

    const itemsList = React.useMemo(() => props.cardList.filter(item =>
        verifyTypes(item?.type, props.selectedTypes)).map(card => card.id), [props.cardList, props.selectedTypes])
    const displayList = React.useMemo(() => props.cardList.filter(item =>
        verifyTypes(item?.type, props.selectedTypes)).map(card => card.name), [props.cardList, props.selectedTypes])

    const selectAction = React.useCallback((selectedItems, property) => {
        dispatch(updateSubitemProperty(selectedItems, property))
    }, [dispatch])

    return (
        <MultiSelectField
            {...props}
            style={styles.select}
            itemsList={itemsList}
            displayList={displayList}
            selectedItems={props.selectedCards}
            onSelect={selectAction} />
    )
}

export default React.memo(MultiSelectConnectionCardField)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})