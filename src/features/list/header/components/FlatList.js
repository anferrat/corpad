import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

const DataLoaderFlatList = (props) => {
    return <FlatList
        {...props}
        contentContainerStyle={{ ...styles.container, ...props.contentContainerStyle }}
        initialNumToRender={18} />
}

export default React.memo(DataLoaderFlatList)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 12
    }
})