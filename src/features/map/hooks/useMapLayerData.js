import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState, useMemo } from "react"
import { EventRegister } from "react-native-event-listeners"
import { useDispatch, useSelector } from "react-redux"
import { getMapLayerById, getMapLayerList } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler } from "../../../helpers/error_handler"
import { loadMapLayers, resetMapLayers } from "../../../store/actions/mapLayers"
import { hideLoader, updateLoader } from "../../../store/actions/settings"

const useMapLayerData = () => {
    const loading = useSelector(state => state.mapLayers.loading)
    const [layerData, setLayerData] = useState({})
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const layers = useSelector(state => state.mapLayers.layers)
    const visibleLayers = useMemo(() => layers.filter(({ visible }) => visible), [layers.length])

    useEffect(() => {
        const onVisibilityChange = EventRegister.addEventListener('map_layer_changed_visibility', async ({ isVisible, layerId }) => {
            if (isVisible) {
                dispatch(updateLoader('Applying map layer'))
                const { status, response } = await getMapLayerById({ id: layerId })
                console.log(response)
                if (status === 200)
                    setLayerData(state => {
                        const isExists = state.hasOwnProperty(layerId)
                        if (isExists)
                            return state
                        else return {
                            ...state,
                            [layerId]: response.data
                        }
                    })
                else errorHandler(status)
                dispatch(hideLoader())
            }
            else
                setLayerData(state => {
                    delete state[layerId]
                    return state
                })
        })

        return () => {
            EventRegister.removeEventListener(onVisibilityChange)
        }
    }, [])

    useEffect(() => {
        if (loading && isFocused)
            getMapLayerList(
                (er) => {
                    errorHandler(er)
                    dispatch(loadMapLayers([]))
                },
                (layers) => {
                    setLayerData(Object.fromEntries(layers.filter(({ visible }) => visible).map(({ id, data }) => [id, data])))
                    dispatch(loadMapLayers(layers))
                })
    }, [isFocused, loading])

    useEffect(() => {
        return () => {
            dispatch(resetMapLayers())
        }
    }, [])

    return {
        layerData,
        layers: visibleLayers,
    }
}

export default useMapLayerData