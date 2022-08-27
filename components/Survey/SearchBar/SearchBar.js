import React, { useState, useEffect, useRef } from 'react'
import { Pressable, Keyboard, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Icon, Divider, Text } from '@ui-kitten/components'
import SingleIconButton from '../../_Stateless/SingleIconButton'
import { sendRequest } from '../../../database/db'
import ListItemSearch from '../../_Stateless/ListItemSearch'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import { subtitleHandlerItem, iconHandlerItem } from '../../customFunctions'
import debounce from 'lodash.debounce'
import { androidStyle } from '../../../styles/GlobalStyle'
import { basic } from '../../../styles/GlobalStyle'
import { errorHandler } from '../../errorHandler'
import { useIsFocused } from '@react-navigation/native'


// need to split to smaller components for perfomance boost

const initialData = []
const SearchBar = ({ navigation }) => {

    const [text, setText] = useState('')
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [displayEmpty, setDisplayEmpty] = useState(false)
    const componentMounted = useRef(true)
    const stringIsEmpty = text === ''
    const focused = useIsFocused()

    const onChangeTextHandler = React.useCallback((text) => {
        setText(text)
        if (text !== '')
            debouncedUpdate(text)
        else {
            resetSearch()
            debouncedUpdate.cancel()
        }
    }, [])

    const resetSearch = () => {
        setData(initialData)
        setText('')
        setIsLoading(false)
        setDisplayEmpty(false)
    }

    useEffect(() => {
        componentMounted.current = true
        return () => {
            debouncedUpdate.cancel()
            componentMounted.current = false
        }
    }, [])

    useEffect(() => { // updates results when returning from view screen.
        if (focused && text !== '') {
            setData(initialData)
            updateData(text)
        }
    }, [focused])


    const updateData = React.useCallback(async (searchString) => {
        setIsLoading(true)
        const result = await sendRequest('SELECT', 'SEARCH', { searchString: searchString })
        if (result.status === 200) {
            if (componentMounted.current) {
                if (result.result.length === 0)
                    setDisplayEmpty(true)
                else
                    setDisplayEmpty(false)
                setData(result.result)
                setIsLoading(false)
            }
        }
        else {
            errorHandler(618)
            if (componentMounted.current) {
                setIsLoading(false)
            }
        }
    }, [])



    const debouncedUpdate = React.useMemo(
        () => debounce(updateData, 300)
        , [updateData])

    const navigateToItemHandler = React.useCallback((id, dataType) => {
        navigation.navigate('ViewItem', { itemId: id, dataTypeItem: dataType })
    }, [])

    const dismissModal = React.useCallback(() => {
        resetSearch()
        navigation.goBack()
    }, [])

    const renderIcon = React.useCallback((props) =>
        <Pressable
            onPress={stringIsEmpty ? Keyboard.dismiss : resetSearch}>
            <Icon {...props}
                name={stringIsEmpty ? 'search-outline' : 'close-outline'} />
        </Pressable>,
        [stringIsEmpty])

    const renderEmptyComponent = (display) => {
        if (display)
            return (
                <View style={styles.empty}>
                    <Icon name='search' style={styles.icon} fill={basic} />
                    <Text category='p2' appearance='hint'>Nothing was found</Text>
                </View>
            )
        else
            return null
    }

    const renderItem = React.useCallback(({ item }) =>
        <ListItemSearch
            title={item.name}
            subtitle={subtitleHandlerItem(item.dataType, item.type)}
            icon={iconHandlerItem(item.dataType, item.type)}
            onPress={navigateToItemHandler.bind(this, item.id, item.dataType)} />,
        [navigateToItemHandler])

    return (
        <SafeAreaView style={androidStyle.AndroidSafeArea}>
            <View style={styles.searchBar}>
                <SingleIconButton iconName='arrow-back-outline' onPress={dismissModal} />
                <Input
                    autoFocus={true}
                    value={text}
                    selectTextOnFocus={true}
                    returnKeyType='search'
                    onChangeText={onChangeTextHandler}
                    placeholder='Search by name'
                    style={styles.flatList}
                    accessoryRight={renderIcon} />
                <Divider />
            </View>
            {isLoading ? <View style={styles.spinnerView}><ActivityIndicator size='large' /></View> :
                <FlatList
                    keyboardShouldPersistTaps='handled'
                    style={styles.flatList}
                    ListEmptyComponent={renderEmptyComponent.bind(this, displayEmpty)}
                    ItemSeparatorComponent={() => <Divider />}
                    keyExtractor={item => item.uid}
                    data={data}
                    renderItem={renderItem}
                />}
        </SafeAreaView>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
        paddingLeft: 6,
        paddingRight: 12,
        paddingVertical: 6,
        flexDirection: 'row'
    },
    flatList: {
        flex: 1,
    },
    spinnerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        flexDirection: 'row'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    },
    empty: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})