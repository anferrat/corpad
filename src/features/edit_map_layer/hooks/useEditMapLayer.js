import { useCallback, useEffect, useState } from "react"
import { StrokeColors, StrokeWidths } from "../../../constants/global"
import { createMapLayer, getMapLayerById, readGeoFile, updateMapLayer as updateMapLayerRequest } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler } from "../../../helpers/error_handler"
import { useNavigation } from "@react-navigation/native"
import fieldValidation from '../../../helpers/validation'
import { StrokeColorLabels, StrokeWidthLabels } from "../../../constants/labels"
import { EventRegister } from "react-native-event-listeners"
import { useDispatch } from "react-redux"
import { addMapLayer, updateMapLayer } from "../../../store/actions/mapLayers"

const colorList = Object.values(StrokeColors).map((color, index) => ({ index, item: StrokeColorLabels[color], value: color }))

const widthList = Object.values(StrokeWidths).map((width, index) => ({ index, item: StrokeWidthLabels[width], value: width }))

const useEditMapLayer = ({ isNew, layerId }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: null,
        defaultName: 'New layer',
        comment: null,
        colorIndex: 0,
        widthIndex: 0,
        visible: true
    })

    const [valid, setValid] = useState({
        name: true,
        comment: true
    })

    const [geoFile, setGeoFile] = useState({
        filename: null,
        size: 0,
        data: {}
    })

    const [loading, setLoading] = useState(true)

    const onChangeName = useCallback((value) => setData(state => ({ ...state, name: value })), [])

    const onChangeComment = useCallback((value) => setData(state => ({ ...state, comment: value })), [])

    const onEndEditingName = useCallback(() => {
        const { value, valid } = fieldValidation(data.name, 'name')
        setData(state => ({
            ...state,
            name: value
        }))
        setValid(state => ({
            ...state,
            name: valid
        }))
    }, [data.name])

    const onEndEditingComment = useCallback(() => {
        const { value, valid } = fieldValidation(data.comment, 'comment')
        setData(state => ({
            ...state,
            comment: value
        }))
        setValid(state => ({
            ...state,
            comment: valid
        }))
    }, [data.comment])

    const onSelectColor = useCallback((index) =>
        setData(state => ({
            ...state,
            colorIndex: index
        })), [])

    const onSelectWidth = useCallback((index) =>
        setData(state => ({
            ...state,
            widthIndex: index
        })), [])

    const onSave = async () => {
        const isValid = valid.name && valid.comment
        if (isValid) {
            const { name, defaultName, comment, colorIndex, widthIndex, visible } = data
            if (isNew) {
                if (geoFile.filename)
                    await createMapLayer({ name, defaultName, comment, width: widthList[widthIndex].value, color: colorList[colorIndex].value, data: geoFile.data },
                        er => errorHandler(er),
                        (response) => {
                            dispatch(addMapLayer(response.id, response.name, response.comment, response.strokeColor, response.strokeWidth, response.data, response.featureCount))
                            navigation.goBack()
                        })
                else errorHandler(513)
            }
            else
                await updateMapLayerRequest({ id: layerId, name, defaultName, width: widthList[widthIndex].value, color: colorList[colorIndex].value, comment, visible },
                    er => errorHandler(er),
                    (response) => {
                        dispatch(updateMapLayer(layerId, response.name, response.comment, response.strokeColor, response.strokeWidth))
                        navigation.goBack()
                    })
        }
        else errorHandler(505)
    }

    const onSelectFile = useCallback(async () => {
        setLoading(true)
        await readGeoFile(
            er => er !== 101 ? errorHandler(er) : null,
            ({ filename, data, size }) => setGeoFile({
                filename, data, size
            }))
        setLoading(false)
    }, [])

    useEffect(() => {
        const loadData = async () => {
            if (isNew)
                onSelectFile()
            else {
                await getMapLayerById({ id: layerId }, er => errorHandler(er, navigation.goBack),
                    ({ name, comment, strokeColor, strokeWidth, visible }) =>
                        setData({
                            name,
                            comment,
                            colorIndex: colorList.findIndex(({ value }) => value === strokeColor),
                            widthIndex: widthList.findIndex(({ value }) => value === strokeWidth),
                            visible
                        }))
                setLoading(false)
            }
        }
        loadData()
    }, [])

    return {
        data,
        valid,
        geoFile,
        loading,
        colorList,
        widthList,
        onChangeName,
        onChangeComment,
        onEndEditingName,
        onEndEditingComment,
        onSelectColor,
        onSelectWidth,
        onSave,
        onSelectFile
    }
}

export default useEditMapLayer