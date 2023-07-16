import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { loadListState, setOffset, setRefresh, deleteItemFromList, updateList, resetListState } from '../../../store/actions/list'
import { getListStateByType } from '../../../helpers/functions'
import DisplayCard from './components/display_card/DisplayCard'
import FooterLoader from './components/FooterLoader'
import EmptyListComponent from './components/EmptyListComponent'
import { getLocationAsync, fetchData, fetchIdList } from '../helpers/functions'
import FlatList from './components/FlatList'
import { primary } from '../../../styles/colors'
import { EventRegister } from 'react-native-event-listeners'
import { Button } from '@ui-kitten/components'
import ListHeader from '../header/header/ListHeader'

const indice =[0]
const ItemList = ({ itemType, navigateToView }) => {
    const dispatch = useDispatch()
    const t = useSelector(state => getListStateByType(itemType, state))

    useEffect(() => {
        const onUpdateHandler = EventRegister.addEventListener('GLOBAL_ITEM_UPDATED', async (updated) => {
            if (itemType === updated.itemType) {
                const [item] = await fetchData(
                    itemType,
                    [updated.itemId],
                    t.settings.appliedFilters,
                    t.settings.displayedReading)
                if (item.id)
                    dispatch(updateList(itemType, updated.itemId, item))
            }
        })

        const onDeleteHandler = EventRegister.addEventListener('GLOBAL_ITEM_DELETED', (deleted) => {
            if (deleted.itemType === itemType)
                dispatch(deleteItemFromList(itemType, deleted.itemId))
        })

        return () => {
            EventRegister.removeEventListener(onUpdateHandler)
            EventRegister.removeEventListener(onDeleteHandler)
        }
    }, [t.settings.appliedFilters, t.settings.displayedReading])

    useEffect(() => { //loading data from database to state
        const loadMoreDataFromDB = async () => {
            if (!t.settings.idListLoaded) { //checks if idList fetched. (if we update filters, sorting or refresh, idList resets)
                const coord = t.settings.sorting === 4 ? await getLocationAsync() : { latitude: 0, longitude: 0 }
                const idList = await fetchIdList( //first fetching list of ids of all the elements
                    itemType,
                    t.settings.appliedFilters,
                    t.settings.sorting,
                    coord.latitude,
                    coord.longitude)
                const data = await fetchData( //fetching data using fetched list of ids with pagination
                    itemType,
                    idList.slice(t.settings.offset * t.settings.limit, t.settings.limit),
                    t.settings.appliedFilters,
                    t.settings.displayedReading
                )
                dispatch(loadListState(itemType, data, idList))
            }
            else {
                // Id list is already fetched and loaded to state. just need to fetch data for the next page and load to state
                const data = await fetchData(
                    itemType,
                    t.idList.slice(t.settings.offset * t.settings.limit, (t.settings.offset + 1) * t.settings.limit),
                    t.settings.appliedFilters,
                    t.settings.displayedReading
                )
                dispatch(loadListState(itemType, data, []))
            }
        }

        if (t.settings.refreshing && !t.settings.endReached) {
            loadMoreDataFromDB()
        }
    }, [t.settings.refreshing])

    useEffect(() => {
        return () => {
            dispatch(resetListState(itemType))
        }
    }, [])

    const refreshHandler = React.useCallback(() => { //refresh
        dispatch(setRefresh(itemType))
    }, [dispatch])

    const offsetHandler = React.useCallback(() => { // sets offset + 1, triggers loading more data from database (pagination)
        if (!t.settings.refreshing && !t.settings.endReached)
            dispatch(setOffset(itemType))
    }, [t.settings.refreshing, !t.settings.endReached, dispatch])

    const renderItem = React.useCallback(({ item }) => <DisplayCard
        timeModified={item.timeModified} // timeModified is used in React.memo to initiate rerender. if doesn't change DisplayCard won't rerender
        status={item.status}
        onPress={navigateToView.bind(this, item.id)}
        name={item.name}
        firstReadingIndex={item.firstReadingIndex}
        itemType={item.itemType}
        displayedReading={t.settings.displayedReading}
        subtitle={item.subtitle}
        icon={item.icon}
        dataList={item.dataList}
        readingList={item.readingList} />
        , [t.settings.displayedReading, navigateToView])

    const renderFooter = React.useCallback(() => { //spinner when next page is loading and counter
        return <FooterLoader loadingMore={!t.settings.endReached && t.idList.length !== 0}
            count={t.itemList.length}
            refreshing={t.settings.refreshing} />
    }, [t.settings.endReached, t.idList.length, t.settings.refreshing, t.itemList.length])

    const renderEmptyListComponent = React.useCallback(() =>
        <EmptyListComponent
            filtered={t.settings.filterCounter !== 0 && t.settings.filterCounter !== undefined}
            visible={!t.settings.refreshing} />, [t.settings.refreshing, t.settings.filterCounter])

    //When elements are updated from outside we only recieve an id, so we create a blocking view with loading indicator while data is fetched from db to update that element.
    const UpdatingView = React.memo(({ updating }) => <View style={updating ? styles.backdrop : styles.hidden}><ActivityIndicator color={primary} size='large' /></View>)

    //Keep timeModified as part of the key. When card is updated, it will reset internal card state
    const keyExtractor = React.useCallback((item) => itemType + item.uid + item.timeModified, [itemType])

    return (
        <>
            <FlatList
                contentContainerStyle={styles.container}
                keyExtractor={keyExtractor}
                ListEmptyComponent={renderEmptyListComponent}
                data={t.itemList}
                refreshing={t.settings.refreshing}
                onRefresh={refreshHandler}
                onEndReachedThreshold={6}
                ListHeaderComponent={<ListHeader dataType={itemType} />}
                stickyHeaderHiddenOnScroll={true}
                stickyHeaderIndices={indice}
                onEndReached={offsetHandler}
                renderItem={renderItem}
                ListFooterComponent={renderFooter} />
            <UpdatingView updating={t.settings.updating} />
        </>
    )
}
export default ItemList



const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFill,
        opacity: .5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hidden: {
        display: 'none'
    },
    container: {
        flexGrow: 1
    }
})