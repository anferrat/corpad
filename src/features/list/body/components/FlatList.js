import React from 'react'
import { StyleSheet, Animated } from 'react-native'

const DataLoaderFlatList = (props) => {
    return <Animated.FlatList
        {...props}
        StickyHeaderComponent={props.StickyHeaderComponent}
        ListHeaderComponent={props.ListHeaderComponent}
        contentContainerStyle={{ ...styles.container, ...props.contentContainerStyle }}
        keyExtractor={props.keyExtractor}
        initialNumToRender={18}
        ListEmptyComponent={props.ListEmptyComponent}
        data={props.data}
        refreshControl={props.refreshControl}
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