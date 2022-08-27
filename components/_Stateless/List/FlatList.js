import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

const DataLoaderFlatList = (props) => {
    return <FlatList
        {...props}
        StickyHeaderComponent={props.StickyHeaderComponent}
        ListHeaderComponent={props.ListHeaderComponent}
        contentContainerStyle={styles.container}
        keyExtractor={props.keyExtractor}
        initialNumToRender={18}
        ListEmptyComponent={props.ListEmptyComponent}
        removeClippedSubviews={true}
        data={props.data}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        onEndReachedThreshold={1}
        onEndReached={props.onEndReached}
        renderItem={props.renderItem}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={200}
        windowSize={21}
        ListFooterComponent={props.ListFooterComponent} />
}

export default React.memo(DataLoaderFlatList)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 12
    }
})