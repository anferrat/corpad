import { useRef, useState, useMemo, useEffect, useCallback } from "react"
import { addLinkDataToSurvey, getPipelineMatchingList } from "../../../../../app/controllers/survey/other/ExternalLinkController"
import { errorHandler } from "../../../../../helpers/error_handler"
import { getPipelineMap, getTargetIndexes } from "../helpers/functions"
import { EventRegister } from 'react-native-event-listeners'
import { ItemTypes } from "../../../../../constants/global"
import { useDispatch } from 'react-redux'
import { hideLoader, updateLoader } from "../../../../../store/actions/settings"

const newPipeItem = { item: 'Create new', id: -1 }

const unassignedPipeItem = { item: 'Unassigned', id: null }

const usePipelineMatching = ({ link, goBack, navigateToItem, navigateToSurvey }) => {
    const [pipelineItemList, setPipelineItemList] = useState([])
    const [assignedIndexes, setAssignedIndexes] = useState([])
    const [sourcePipelines, setSourcePipelines] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const componentMounted = useRef(true)
    const dispatch = useDispatch()

    const acessoryList = useMemo(() => pipelineItemList.map((_, index) => index === 0 ? { icon: 'plus' } : (index === 1 ? { icon: 'code' } : { icon: 'PL', pack: 'cp' }))
        , [pipelineItemList])

    useEffect(() => {
        componentMounted.current = true
        const onLoad = async () => {
            setIsLoading(true)
            getPipelineMatchingList(
                { link },
                (er) => errorHandler(er, goBack),
                ({ source, target, pipelineMap }) => {
                    if (componentMounted.current) {
                        setPipelineItemList(
                            [newPipeItem, unassignedPipeItem].concat(target.map(({ id, name }) => ({
                                item: name,
                                id: id
                            }))))
                        setAssignedIndexes(getTargetIndexes(source, target, pipelineMap))
                        setSourcePipelines(source)
                        setIsLoading(false)
                    }
                }
            )
        }
        onLoad()

        return () => {
            componentMounted.current = false
        }
    }, [])

    const onSelect = useCallback((sourceIndex, targetIndex) => {
        setAssignedIndexes(state => Object.assign([], state, {
            [sourceIndex]: targetIndex
        }))
    }, [])

    const onSubmit = useCallback(async () => {
        setIsCreating(true)
        const pipelineMapData = getPipelineMap(sourcePipelines, pipelineItemList, assignedIndexes)
        dispatch(updateLoader('Creating...'))
        await addLinkDataToSurvey({ link, pipelineMapData },
            (er) => er === 101 ? navigateToSurvey() : errorHandler(er, goBack),
            ({ isPipelineMapped, createdPipelineIdList, createdItemId, createdItemType }) => {
                if (isPipelineMapped && createdItemId && createdItemType) {
                    EventRegister.emit('GLOBAL_ITEM_UPDATED', { itemId: createdItemId, itemType: createdItemType })
                    navigateToItem(createdItemId, createdItemType)
                    createdPipelineIdList.map(id => setTimeout(() => EventRegister.emit('GLOBAL_ITEM_UPDATED', { itemType: ItemTypes.PIPELINE, itemId: id }), 100))
                }
                else
                    errorHandler(829, goBack)
            })
        dispatch(hideLoader())
        setIsCreating(false)
    }, [sourcePipelines, pipelineItemList, assignedIndexes])



    return {
        pipelineItemList,
        pipelineItemAccessoryList: acessoryList,
        assignedIndexes,
        sourcePipelines,
        isLoading,
        isCreating,
        onSelect,
        onSubmit
    }
}

export default usePipelineMatching