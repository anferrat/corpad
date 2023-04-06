import { useCallback, useState, useContext, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSetting } from '../../../store/actions/settings'
import { BS } from '../../../../App'
import { searchMarker } from '../helpers/functions'
import debounce from 'lodash.debounce'

const useMarkerSearch = ({ setMarkerActive, resetActiveMarker }) => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()
    const markers = useSelector(state => state.map.markers)

    const [search, setSearch] = useState({
        keyword: null,
        modalEnabled: false,
        markersFound: [],
        searching: true
    })

    const { keyword, modalEnabled } = search

    const showModal = useCallback(() => setSearch(state => ({ ...state, modalEnabled: true })), [])

    const hideModal = useCallback(() => setSearch(state => ({ ...state, modalEnabled: false })), [])

    const openMenu = useCallback(() => {
        bottomSheet.current?.snapToIndex(2)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'menu' }))
    }, [])

    const debounceSearch = useCallback(debounce((keyword) => {
        _searchMarkers(keyword, markers)
    }, 400), [_searchMarkers, markers])

    const onChangeKeyword = (text) => {
        setSearch(state => ({ ...state, keyword: text, searching: true }))
        debounceSearch(text)
    }

    const _searchMarkers = useCallback(async (keyword, markers) => {
        const found = searchMarker(markers, keyword)
        setSearch(state => ({ ...state, markersFound: found, searching: false }))
    }, [setSearch])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (modalEnabled)
                _searchMarkers(keyword, markers)
        }, 100)
        return () => {
            clearTimeout(timer)
            if (modalEnabled)
                setSearch(state => ({ ...state, markersFound: [], searching: true }))
        }
    }, [modalEnabled])

    const showOnMap = useCallback((itemId, itemType) => {
        setMarkerActive(itemId, itemType)
        hideModal()
    }, [setMarkerActive, hideModal])

    const resetKeyword = useCallback(() => {
        setSearch(state => ({ ...state, keyword: null, searching: true }))
        setTimeout(() => { setSearch(state => ({ ...state, markersFound: markers, searching: false })) }, 50)
        resetActiveMarker()
    }, [markers, resetActiveMarker, setSearch])

    return {
        search,
        showModal,
        hideModal,
        openMenu,
        onChangeKeyword,
        showOnMap,
        resetKeyword
    }
}

export default useMarkerSearch