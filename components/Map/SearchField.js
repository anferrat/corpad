import React, { useState, useRef, useEffect, useContext } from 'react'
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components'
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native'
import { BS } from '../../App'
import { search } from '../_Stateless/Icons'
import { sendRequest } from '../../database/db'
import { useDispatch } from 'react-redux'
import { setActiveMarker } from '../../store/actions/map'
import { iconHandlerItem, getStatusProps } from '../customFunctions'
import { basic, primary } from '../../styles/GlobalStyle'
import { errorHandler } from '../errorHandler'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { updateSetting } from '../../store/actions/settings'

const getMapIconSVG = (icon, status) => <Icon name={'map-' + icon} pack='cp' style={styles.icon} fill={getStatusProps(status).color} />

const searchMarkerRequest = async (string) => {
    if (string !== '')
        return await sendRequest('SELECT', 'SEARCH_MARKER', { searchString: string })
    else return { status: 200, result: [] }
}

const SearchField = (props) => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()

    const openMenuHandler = () => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(2)
        else errorHandler(503)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'menu' }))
    }
    const [searchString, setSearchString] = useState('')
    const [searching, setSearching] = useState(false)
    const [foundMarkers, setFoundMarkers] = useState([])
    const componentMounted = useRef(true)
    const errorDisplayed = useRef(false)
    const searchInput = useRef()

    const resetSearch = React.useCallback(() => {
        setSearchString('')
        searchInput.current.blur()
        dispatch(setActiveMarker(null))
    }, [setSearchString, searchInput, dispatch])


    const resetIcon = React.useCallback((props) =>
        <Pressable onPress={resetSearch}>
            <Icon {...props} fill={primary} name='close-outline' />
        </Pressable>
        , [resetSearch])

    const accessoryIcon = React.useCallback((props) => (
        <View style={styles.accessory}>
            {searchString === '' ? search(props) : resetIcon(props)}
            <SingleIconButton
                style={styles.menuIcon}
                iconName='more-vertical'
                onPress={openMenuHandler}
                size='small'
            />
        </View>
    ), [searchString === ''])


    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        searchName(searchString)
    }, [searchString])



    const searchName = React.useCallback(async (searchString) => {
        setSearching(true)
        const searchResult = await searchMarkerRequest(searchString)
        if (searchResult.status === 200) {
            if (componentMounted.current) {
                setSearching(false)
                setFoundMarkers(searchResult.result)
            }
        }
        else {
            const resetSearch = () => {
                if (componentMounted.current) {
                    setSearching(false)
                    setFoundMarkers([])
                    setSearchString('')
                    searchInput.current.blur()
                    searchInput.current.hide()
                    searchInput.current.clear()
                    errorDisplayed.current = false
                }
            }
            setTimeout(() => {
                if (!errorDisplayed.current) {
                    errorHandler(618, resetSearch)
                    errorDisplayed.current = true
                }
            }, 3000)
        }
    }, [setSearching, setFoundMarkers, componentMounted])

    const onBlurHandler = React.useCallback(() => {
        if (searchString !== '' && (foundMarkers.length === 0 || searching)) {
            setSearchString('')
        }
    }, [searchString, foundMarkers.length, searching])

    const searchActionHandler = React.useCallback((index) => {
        const marker = foundMarkers[index]
        setSearchString(marker.name)
        props.zoomToTestPoint(marker.latitude, marker.longitude)
        dispatch(setActiveMarker(marker))
        searchInput.current.blur()
    }, [searchInput, dispatch, props.zoomToTestPoint, setSearchString, foundMarkers])

    const renderOptions = React.useMemo(() => {
        if (searching)
            return <AutocompleteItem disabled={true} title='Searching' accessoryLeft={<ActivityIndicator color={primary} />} />
        else
            if (searchString !== '')
                if (foundMarkers.length !== 0)
                    return foundMarkers.map(marker => { // nope, can't move it to a separate component, thx ui-kitten autocomplete
                        const disabled = marker.latitude === null || marker.longitude === null || marker.latitude === undefined || marker.longitude === undefined
                        return (
                            <AutocompleteItem
                                key={'foundMarker-' + marker.uid}
                                disabled={disabled}
                                title={marker.name}
                                accessoryLeft={() => disabled ? <Icon name='question-mark-circle-outline' fill={basic} style={styles.icon} /> : getMapIconSVG(iconHandlerItem(marker.dataType, marker.testPointType), marker.status)} />
                        )
                    })
                else return <AutocompleteItem disabled={true} title='Nothing was found' accessoryLeft={search} />
            else return <Pressable style={StyleSheet.absoluteFill} />
    }, [foundMarkers, searching])

    return (
        <View style={{ ...styles.searchView, top: props.insets.top + 5 }}>
            <Autocomplete
                selectTextOnFocus={true}
                ref={searchInput}
                value={searchString}
                onBlur={onBlurHandler}
                onChangeText={setSearchString}
                onSelect={searchActionHandler}
                placeholder='Search by name'
                accessoryLeft={logoIcon}
                style={styles.autocompleteField}
                accessoryRight={accessoryIcon}
                size='large'>
                {renderOptions}
            </Autocomplete>
        </View>
    )
}

export default React.memo(SearchField)

const styles = StyleSheet.create({
    searchView: {
        paddingHorizontal: 12,
        position: 'absolute',
        width: '100%',
    },
    autocompleteField: {
        elevation: 5,
        borderRadius: 15
    },
    icon: {
        width: 25,
        height: 25
    },
    menuIcon: {
        marginVertical: -10
    },
    accessory: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

const logoIcon = <Icon pack='cp' name='corpad-logo' fill={primary} style={styles.icon} />