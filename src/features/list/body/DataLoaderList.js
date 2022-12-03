import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { loadListState, setOffset, setRefresh, deleteItemFromList, addItemToList, updateList, resetListState } from '../../../store/actions/list'
import { getListStateByType } from '../../../helpers/functions'
import DisplayCard from './components/display_card/DisplayCard'
import FooterLoader from './components/FooterLoader'
import EmptyListComponent from './components/EmptyListComponent'
import { getLocationAsync, fetchData, fetchIdList } from '../helpers/functions'
import FlatList from './components/FlatList'
import { primary } from '../../../styles/colors'


const ItemList = (props) => {
    const dispatch = useDispatch()
    const t = useSelector(state => getListStateByType(props.dataType, state))
    // updating object has two fields: id - <id of item that action needs to be applied to; and action - <DELETE, UPDATE, INSERT>. Default value is null, if changed, triggers effect with action and id. // My own mini redux :)
    useEffect(() => {
        const updateHandler = async () => {
            if (t.settings.updating?.action === 'DELETE') {
                dispatch(deleteItemFromList(props.dataType, t.settings.updating?.id))
            }
            else if (t.settings.updating?.action === 'INSERT') {
                const newData = await fetchData(
                    props.dataType,
                    [t.settings.updating?.id],
                    t.settings.appliedFilters,
                    t.settings.displayedReading
                )
                if (newData[0] !== undefined)
                    dispatch(addItemToList(props.dataType, t.settings.updating?.id, newData[0]))
            }
            else if (t.settings.updating?.action === 'UPDATE') {
                const newData = await fetchData(
                    props.dataType,
                    [t.settings.updating?.id],
                    t.settings.appliedFilters,
                    t.settings.displayedReading
                )
                if (newData[0] !== undefined)
                    dispatch(updateList(props.dataType, t.settings.updating?.id, newData[0]))
            }
        }
        if (t.settings.updating !== null && t.settings.updating) {
            updateHandler()
        }
    }, [t.settings.updating])

    useEffect(() => { //loading data from database to state
        const loadMoreDataFromDB = async () => {
            if (!t.settings.idListLoaded) { //checks if idList fetched. (if we update filters, sorting or refresh, idList resets)
                const coord = t.settings.sorting === 4 ? await getLocationAsync() : { latitude: 0, longitude: 0 }
                const idList = await fetchIdList( //first fetching list of ids of all the elements
                    props.dataType,
                    t.settings.appliedFilters,
                    t.settings.sorting,
                    coord.latitude,
                    coord.longitude)
                const data = await fetchData( //fetching data using fetched list of ids with pagination
                    props.dataType,
                    idList.slice(t.settings.offset * t.settings.limit, t.settings.limit),
                    t.settings.appliedFilters,
                    t.settings.displayedReading
                )
                dispatch(loadListState(props.dataType, data, idList))
            }
            else {
                const data = await fetchData(
                    props.dataType,
                    t.idList.slice(t.settings.offset * t.settings.limit, (t.settings.offset + 1) * t.settings.limit),
                    t.settings.appliedFilters,
                    t.settings.displayedReading
                )
                dispatch(loadListState(props.dataType, data, []))
            }
        }

        if (t.settings.refreshing && !t.settings.endReached) {
            loadMoreDataFromDB()
        }
    }, [t.settings.refreshing])

    useEffect(() => {
        return () => {
            dispatch(resetListState(props.dataType))
        }
    }, [])

    const refreshHandler = React.useCallback(() => { //refresh
        dispatch(setRefresh(props.dataType))
    }, [dispatch])

    const offsetHandler = React.useCallback(() => { // sets offset + 1, triggers loading more data from database (pagination)
        if (!t.settings.refreshing && !t.settings.endReached)
            dispatch(setOffset(props.dataType))
    }, [t.settings.refreshing, !t.settings.endReached, dispatch])

    const renderItem = React.useCallback(({ item }) => <DisplayCard
        timeModified={item.timeModified} // timeModified is used in React.memo to initiate rerender. if doesn't change DisplayCard won't rerender
        status={item.status}
        onPress={props.navigateToView.bind(this, item.id)}
        name={item.name}
        firstReadingIndex={item.firstReadingIndex}
        dataType={props.dataType}
        displayedReading={t.settings.displayedReading}
        subtitle={item.subtitle}
        mainIcon={item.mainIcon}
        dataList={item.dataList}
        readingList={item.readingList} />
        , [t.settings.displayedReading, props.navigateToView])

    const renderFooter = React.useCallback(() => { //spinner when next page is loading and counter
        return <FooterLoader loadingMore={!t.settings.endReached && t.idList.length !== 0}
            count={t.itemList.length}
            refreshing={t.settings.refreshing} />
    }, [t.settings.endReached, t.idList.length, t.settings.refreshing, t.itemList.length])

    const renderEmptyListComponent = React.useCallback(() =>
        <EmptyListComponent
            filtered={t.settings.filterCounter !== 0 && t.settings.filterCounter !== undefined}
            visible={!t.settings.refreshing} />, [t.settings.refreshing, t.settings.filterCounter])

    const UpdatingView = React.memo((props) => <View style={props.updating ? styles.backdrop : styles.hidden}><ActivityIndicator color={primary} size='large' /></View>)

    const keyExtractor = React.useCallback((item) => props.dataType + item.uid, [props.dataType])

    return (
        <>
            <FlatList
                contentContainerStyle={styles.container}
                keyExtractor={keyExtractor}
                ListEmptyComponent={renderEmptyListComponent}
                data={t.itemList}
                refreshing={t.settings.refreshing}
                onRefresh={refreshHandler}
                onEndReachedThreshold={1}
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