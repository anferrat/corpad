import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExportPotentialPropertiesData } from '../../../../app/controllers/survey/ExportController'
import { errorHandler } from '../../../../helpers/error_handler'
import { setExportPotentialDefaultValues, setExportPotentials, setExportReferenceCellId, toggleExportPipeline, toggleExportPotentialTypeId, toggleExportSubitemType, setExportPipelineGrouping } from '../../../../store/actions/export'

const useExportPotentialProperties = (navigateToExportSubitems) => {
    const referenceCellId = useSelector(state => state.export.referenceCellId)
    const potentialTypeIdList = useSelector(state => state.export.potentialTypeIdList)
    const selectedSubitemTypes = useSelector(state => state.export.selectedSubitemTypes)
    const pipelineIdList = useSelector(state => state.export.pipelineIdList)
    const exportPotentials = useSelector(state => state.export.exportPotentials)
    const pipelineGrouping = useSelector(state => Number(state.export.groupPotentialsByPipeline))
    const pipelineGroupingActive = useSelector(state => state.export.pipelineGroupingActive)
    const [referenceCells, setReferenceCells] = useState([])
    const [pipelines, setPipelines] = useState([])
    const [potentialTypes, setPotentialTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)
    const dispatch = useDispatch()

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            setLoading(true)
            const { status, response } = await getExportPotentialPropertiesData()
            if (status === 200) {
                if (componentMounted.current) {
                    const { pipelines, referenceCells, potentialTypes } = response

                    //Making main reference cell active by default
                    const mainIndex = referenceCells.findIndex(({ isMainIndex }) => isMainIndex)
                    const index = ~mainIndex ? mainIndex : 0

                    //Making active On/Off potentials by default
                    const potentialTypeIdList = potentialTypes.filter(({ type }) => type === 'PERM_ON' || type == "PERM_OFF").map(({ id }) => id)

                    const pipelineIdList = pipelines.map(({ id }) => id).concat(null)

                    //Updating state
                    setPipelines([{ id: null, name: 'Unassigned' }].concat(pipelines))
                    setReferenceCells(referenceCells)
                    setPotentialTypes(potentialTypes)
                    dispatch(setExportPotentialDefaultValues(referenceCells[index]?.id, potentialTypeIdList, ['PL', 'RS'], pipelineIdList))
                }
            }
            else errorHandler(status)
            setLoading(false)
        }
        if (exportPotentials)
            loadData()
        return () => {
            componentMounted.current = false
        }
    }, [exportPotentials])

    const selectReferenceCell = useCallback((id) => {
        if (id !== referenceCellId)
            dispatch(setExportReferenceCellId(id))
    }, [referenceCellId])

    const togglePotentialType = useCallback((id) => dispatch(toggleExportPotentialTypeId(id)), [])

    const toggleSubitemType = useCallback((type) => dispatch(toggleExportSubitemType(type)), [])

    const togglePipeline = useCallback((id) => dispatch(toggleExportPipeline(id)), [])

    const onChangePipelineGrouping = useCallback((index) => dispatch(setExportPipelineGrouping(Boolean(index))), [])

    const toggleExportPotentials = useCallback((checked) => dispatch(setExportPotentials(checked)), [])

    const onNextPress = useCallback(() => navigateToExportSubitems(), [])

    return {
        loading,
        exportPotentials,
        potentialTypes,
        potentialTypeIdList,
        referenceCellId,
        referenceCells,
        selectedSubitemTypes,
        pipelines,
        pipelineIdList,
        pipelineGrouping,
        pipelineGroupingActive,
        selectReferenceCell,
        togglePotentialType,
        toggleSubitemType,
        togglePipeline,
        toggleExportPotentials,
        onNextPress,
        onChangePipelineGrouping
    }
}

export default useExportPotentialProperties