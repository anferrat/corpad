import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux'
import { findItems, findItemsByCoordinate } from "../../../../../app/controllers/survey/other/ExternalLinkController"
import { hideLoader, updateLoader } from "../../../../../store/actions/settings"

const useFindItemInSurvey = ({ uid, name, latitude, longitude, itemType, navigateToItem, goBack }) => {
    const dispatch = useDispatch()
    const [matches, setMatches] = useState({
        uidMatch: null,
        nameMatches: [],
        distanceMatches: [],
        searchedByDistance: false,
        loading: true,
        distanceLoading: false
    })
    const componentMounted = useRef(true)
    const distanceSearchAvailable = latitude !== null && longitude !== null

    useEffect(() => {
        componentMounted.current = true
        const onLoad = async () => {
            const { response, status } = await findItems({ uid, name, itemType })
            if (componentMounted.current) {
                if (status === 200) {
                    setMatches(state => ({
                        ...state,
                        uidMatch: response.uidMatch,
                        nameMatches: response.nameMatches,
                        loading: false
                    }))
                }
                else setMatches(state => ({
                    ...state,
                    loading: false
                }))
            }
        }
        onLoad()
        return () => {
            componentMounted.current = false
        }
    }, [])

    const searchByDistance = useCallback(async () => {
        dispatch(updateLoader('Seraching...'))
        setMatches(state => ({
            ...state,
            distanceLoading: true
        }))
        const { response, status } = await findItemsByCoordinate({ itemType, latitude, longitude })
        if (componentMounted.current) {
            if (status === 200)
                setMatches(state => ({
                    ...state,
                    distanceMatches: response,
                    searchedByDistance: true,
                    distanceLoading: false
                }))
            else
                setMatches(state => ({
                    ...state,
                    searchedByDistance: true,
                    distanceLoading: false
                }))
        }
        dispatch(hideLoader())

    }, [itemType, latitude, longitude])

    const navigateToView = useCallback((id) => {
        navigateToItem(id)
    }, [])


    return {
        ...matches,
        distanceSearchAvailable: distanceSearchAvailable,
        searchByDistance,
        navigateToView
    }
}

export default useFindItemInSurvey