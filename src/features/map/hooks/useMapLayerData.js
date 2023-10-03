import { useIsFocused } from "@react-navigation/native"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMapLayerList } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler } from "../../../helpers/error_handler"
import { loadMapLayers, resetMapLayers } from "../../../store/actions/mapLayers"


const useMapLayerData = () => {
    const loading = useSelector(state => state.mapLayers.loading)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const layers = useSelector(state => state.mapLayers.layers)


    useEffect(() => {
        if (loading && isFocused)
            getMapLayerList(
                (er) => {
                    errorHandler(er)
                    dispatch(loadMapLayers([]))
                },
                (layers) => dispatch(loadMapLayers(layers)))
    }, [isFocused, loading])

    useEffect(() => {
        return () => {
            dispatch(resetMapLayers())
        }
    }, [])

    return {
        layers
    }
}

export default useMapLayerData