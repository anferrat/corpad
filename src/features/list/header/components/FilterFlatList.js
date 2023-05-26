import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const FilterFlatList = (props) => {
    return <FlatList
        renderItem={props.renderItem}
        data={props.data} />
}

export default React.memo(FilterFlatList)