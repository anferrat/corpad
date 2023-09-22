import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { exportSurveyToSpreadsheet, getExportPotentialPropertiesData } from "../../../../app/controllers/survey/ExportController"
import { errorHandler } from "../../../../helpers/error_handler"
import { ItemTypeIconsFilled } from "../../../../constants/icons"
import { ItemTypeLabelsPlural, SortingOptionLabels } from "../../../../constants/labels"
import { FileMimeTypes, ItemTypes } from "../../../../constants/global"
import { hideLoader, setExportModal, updateLoader } from "../../../../store/actions/settings"
import { resetExport } from "../../../../store/actions/export"

const useExportLabels = (navigateToExportItem) => {
    const [potentialData, setPotentialData] = useState({
        loading: true,
        referenceCellLabel: null,
        potentialTypeLabels: [],
        pipelineLabels: []
    })

    const { loading, referenceCellLabel, potentialTypeLabels, pipelineLabels } = potentialData

    const componentMounted = useRef(true)

    const dispatch = useDispatch()

    const {
        itemType,
        sorting,
        exportPotentials,
        itemProperties,
        referenceCellId,
        potentialTypeIdList,
        selectedSubitemTypes,
        pipelineIdList,
        groupPotentialsByPipeline,
        subitemProperties,
        includeAssets,
    } = useSelector(state => state.export)

    const showPotentials = exportPotentials && itemType === ItemTypes.TEST_POINT
    const itemTypeLabel = ItemTypeLabelsPlural[itemType]
    const itemTypeIcon = ItemTypeIconsFilled[itemType]
    const sortingLabel = SortingOptionLabels[sorting]
    const potentialsGroupingLabel = groupPotentialsByPipeline ? 'Pipeline' : 'Reading type'
    const showOther = subitemProperties.length > 0
    const assetOptionAvailable = itemType === ItemTypes.TEST_POINT || itemType === ItemTypes.RECTIFIER

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getExportPotentialPropertiesData()
            if (status === 200) {
                const { referenceCells, pipelines, potentialTypes } = response
                if (componentMounted.current)
                    setPotentialData({
                        loading: false,
                        referenceCellLabel: referenceCells.find(({ id }) => id === referenceCellId).name,
                        potentialTypeLabels: potentialTypes.filter(({ id }) => ~potentialTypeIdList.indexOf(id)).map(({ name }) => name),
                        pipelineLabels: pipelines.concat({ id: null, name: 'Unassigned' }).filter(({ id }) => ~pipelineIdList.indexOf(id)).map(({ name }) => name)
                    })
            }
            else {
                errorHandler(status)
                if (componentMounted.current)
                    setPotentialData(state => ({ ...state, loading: false }))
            }
        }

        if (showPotentials)
            loadData()

        return () => {
            componentMounted.current = false
        }
    }, [])

    const exportToSpreadsheet = useCallback(async () => {
        dispatch(updateLoader('Exporting', 'Creating new .csv file'))
        const { response, status, errorMessage } = await exportSurveyToSpreadsheet({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties, includeAssets: includeAssets && assetOptionAvailable })
        if (status === 200) {
            navigateToExportItem()
            dispatch(resetExport())
            dispatch(hideLoader())
            dispatch(setExportModal(true, response, FileMimeTypes.CSV))
        }
        else {
            errorHandler(status)
            dispatch(hideLoader())
        }
    }, [dispatch, navigateToExportItem, itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties])

    return {
        exportToSpreadsheet,
        itemTypeLabel,
        itemTypeIcon,
        sortingLabel,
        loading,
        showPotentials,
        referenceCellLabel,
        potentialTypeLabels,
        pipelineLabels,
        itemProperties,
        subitemProperties,
        potentialsGroupingLabel,
        groupPotentialsByPipeline,
        selectedSubitemTypes,
        showOther,
        assetOptionAvailable,
        includeAssets
    }

}

export default useExportLabels