import React from 'react'
import { SectionList, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'

const renderSectionHeader = ({ section }) => (
    section.data.length > 0 ? <Text appearance='hint' style={styles.header}>{section.title}</Text> : null
)

const DataLoaderSectionList = ({ keyExtractor, sections, ListEmptyComponent, refreshing, onRefresh, renderItem, ListHeaderComponent, isEmpty }) => {
    return <SectionList
        stickySectionHeadersEnabled={false}
        keyExtractor={keyExtractor}
        sections={isEmpty ? [] : sections}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.container}
        initialNumToRender={18}
        removeClippedSubviews={true}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={1}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={200}
        windowSize={21} />
}

export default DataLoaderSectionList

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 12
    },
    header: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 12,
        paddingTop: 18
    }
})