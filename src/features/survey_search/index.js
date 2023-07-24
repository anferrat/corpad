import React from 'react'
import { Pressable, StyleSheet, ActivityIndicator, View, StatusBar } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Icon, Divider, } from '@ui-kitten/components'
import Input from '../../components/Input'
import SingleIconButton from '../../components/IconButton'
import ListItemSearch from './components/ListItemSearch'
import { control, primary } from '../../styles/colors'
import useSurveySearch from './hooks/useSurveySearch'
import EmptyResult from './components/EmptyResult'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


export const SearchBar = ({ navigateToView }) => {
    const { keyword, loading, found, inputRef, dismiss, onChangeKeyword, resetSearch } = useSurveySearch()
    const { top } = useSafeAreaInsets()
    const isKeywordEmpty = keyword === null

    const renderIcon = React.useCallback((props) => {
        if (loading)
            return <ActivityIndicator {...props} color={primary} size='small' />
        else
            return (
                <Pressable
                    onPress={isKeywordEmpty ? null : resetSearch}>
                    <Icon {...props}
                        name={isKeywordEmpty ? 'search-outline' : 'close-outline'} />
                </Pressable>)
    },
        [isKeywordEmpty, loading])


    const renderItem = React.useCallback(({ item }) => {
        const { name, status, markerType, itemType, id } = item
        return <ListItemSearch
            id={id}
            name={name}
            status={status}
            markerType={markerType}
            itemType={itemType}
            navigateToView={navigateToView} />
    },
        [navigateToView])

    return (
        <>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'dark-content'} />
            <SafeAreaView
                style={styles.mainView}>
                <View style={{ ...styles.searchBar, minHeight: 80 - top }}>
                    <SingleIconButton
                        style={styles.backIcon}
                        iconName='arrow-back-outline'
                        onPress={dismiss} />
                    <Input
                        ref={inputRef}
                        style={styles.input}
                        value={keyword}
                        returnKeyType='search'
                        onChangeText={onChangeKeyword}
                        placeholder='Search by name'
                        valid={true}
                        accessoryRight={renderIcon} />
                </View>
                <FlashList
                    estimatedItemSize={50}
                    keyboardShouldPersistTaps='handled'
                    keyboardDismissMode='on-drag'
                    contentContainerStyle={styles.container}
                    ListEmptyComponent={<EmptyResult loading={loading} isKeywordEmpty={isKeywordEmpty} />}
                    ItemSeparatorComponent={Divider}
                    ListFooterComponent={loading || isKeywordEmpty ? null : Divider}
                    keyExtractor={item => item.uid}
                    data={found}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: control
    },
    input: {
        flex: 1,
        marginBottom: -12
    },
    searchBar: {
        paddingLeft: 6,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    },
    backIcon: {
        paddingRight: 12
    },
    container: {
        paddingBottom: 12
    }
})