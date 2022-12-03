import React from 'react'
import { SectionList, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'

const DataLoaderSectionList = (props) => {
    return <SectionList
        {...props}
        keyExtractor={props.keyExtractor}
        sections={props.sections}
        renderSectionHeader={({ section }) => (
            section.data.length > 0 ? <Text appearance='hint' style={styles.header}>{section.title}</Text> : null
        )}
        contentContainerStyle={styles.container}
        initialNumToRender={18}
        ListEmptyComponent={props.ListEmptyComponent}
        removeClippedSubviews={true}
        refreshing={props.refreshing}
        SectionSeparatorComponent={props.SectionSeparatorComponent}
        onRefresh={props.onRefresh}
        onEndReachedThreshold={1}
        onEndReached={props.onEndReached}
        renderItem={props.renderItem}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={200}
        windowSize={21} />
}

export default React.memo(DataLoaderSectionList)

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