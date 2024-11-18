import React, { useEffect, useRef } from 'react'
import { Icon } from '@ui-kitten/components'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import IconButton from '../../../../components/IconButton'
import Input from '../../../../components/Input'
import { basic400, primary } from '../../../../styles/colors'
import SearchItem from './SearchItem'
import EmptyList from './EmptyList'



const SearchModal = ({ hideModal, keyword, onChangeKeyword, markersFound, showOnMap, resetKeyword, searching }) => {
    const isEmptySearch = keyword === null

    const inputRef = useRef()

    useEffect(() => {
        const watch = setTimeout(() => {
            inputRef.current?.focus()
        }, 100)
        return () => clearTimeout(watch)
    }, [])

    const acessoryLeft = React.useCallback(
        () => <IconButton
            iconName={'arrow-back-outline'}
            fill={primary}
            onPress={hideModal}
            style={styles.back}
        />, [hideModal])

    const accessoryRight = React.useCallback((props) => {
        if (searching)
            return <ActivityIndicator size='small' color={primary} style={styles.activity} />
        else
            if (isEmptySearch)
                return <Icon {...props} name='search-outline' fill={primary} />
            else return <IconButton
                iconName={'close-circle'}
                fill={primary}
                onPress={resetKeyword}
                style={styles.back}
            />
    }, [isEmptySearch, resetKeyword, searching])

    const renderItem = React.useCallback(({ item }) => (
        <SearchItem
            showOnMap={showOnMap.bind(this, item)}
            name={item.name}
            markerType={item.markerType}
            status={item.status}
            location={item.location} />
    ), [])

    const onSubmitEditing = React.useCallback(() => {
        if (markersFound[0] && !searching) {
            showOnMap(markersFound[0].id, markersFound[0].itemType)
        }
    }, [markersFound, showOnMap, searching])

    const keyExtractor = React.useCallback((item => item.uid), [])
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.mainView}>
                <Input
                    valid={true}
                    placeholder='Search by name'
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={onChangeKeyword}
                    accessoryLeft={acessoryLeft}
                    accessoryRight={accessoryRight}
                    ref={inputRef}
                    style={styles.input}
                    value={keyword} />
                <FlashList
                    ListEmptyComponent={
                        <EmptyList searching={searching} />
                    }
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={styles.flatList}
                    data={markersFound}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={50}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default React.memo(SearchModal)

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: 12
    },
    input: {
        marginBottom: 0,
        width: '95%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: basic400,
    },
    back: {
        width: 30,
        height: 30,
        marginHorizontal: 4
    },
    flatList: {
        paddingBottom: 12
    },
    activity: {
        marginHorizontal: 4
    }
})