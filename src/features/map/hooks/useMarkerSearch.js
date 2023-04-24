import { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { searchMarker } from '../helpers/functions'
import debounce from 'lodash.debounce'
import { useBottomSheetNavigation } from '../../../hooks/bottom_sheet/useBottomSheetNavigation'

const useMarkerSearch = ({ setMarkerActive, resetActiveMarker }) => {
    const { openMenu } = useBottomSheetNavigation()
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