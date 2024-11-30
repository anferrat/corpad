export const SET_EXPORT_ITEM_TYPE = 'SET_EXPORT_ITEM_TYPE'
export const SET_EXPORT_SORTING = 'SET_EXPORT_SORTING'
export const SET_EXPORT_ITEM_PROPERTIES = 'SET_EXPORT_ITEM_PROPERTIES'
export const SET_EXPORT_REFERENCE_CELL_ID = 'SET_EXPORT_REFERENCE_CELL_ID'
export const SET_EXPORT_POTENTIAL_TYPE_ID = 'SET_EXPORT_POTENTIAL_TYPE_ID'
export const SET_EXPORT_POTENTIAL_DEFAULT_VALUES = 'SET_EXPORT_POTENTIAL_DEFAULT_VALUES'
export const SET_EXPORT_SUBITEM_TYPE = 'SET_EXPORT_SUBITEM_TYPE'
export const SET_EXPORT_PIPELINE = 'SET_EXPORT_PIPELINE'
export const RESET_EXPORT = 'RESET_EXPORT'
export const SET_EXPORT_POTENTIALS = 'SET_EXPORT_POTENTIALS'
export const SET_EXPORT_POTENTAILS_PIPELINE_GROUPING = 'SET_EXPORT_POTENTAILS_PIPELINE_GROUPING'
export const SET_EXPORT_SUBITEM_PROPERTIES = 'SET_EXPORT_SUBITEM_PROPERTIES'
export const SET_INCLUDE_ASSETS = 'SET_INCLUDE_ASSETS'
export const SET_INCLUDE_MAP_LAYERS = 'SET_INCLUDE_MAP_LAYERS'
export const SET_EXPORT_FORMAT = 'SET_EXPORT_FORMAT'
export const SET_EXPORT_INITIAL_ITEM_PROPERTIES = 'SET_EXPORT_INITIAL_ITEM_PROPERTIES'

export const setExportItemType = (itemType) =>
    ({ type: SET_EXPORT_ITEM_TYPE, itemType })

export const setExportSorting = (sorting) =>
    ({ type: SET_EXPORT_SORTING, sorting })

export const setExportPipelineGrouping = (isGroupedByPipeline) =>
    ({ type: SET_EXPORT_POTENTAILS_PIPELINE_GROUPING, isGroupedByPipeline })

export const setExportPotentials = (exportPotentials) =>
    ({ type: SET_EXPORT_POTENTIALS, exportPotentials })

export const toggleExportItemProperty = (itemProperty) =>
    ({ type: SET_EXPORT_ITEM_PROPERTIES, itemProperty })

export const setExportReferenceCellId = (referenceCellId) => (
    { type: SET_EXPORT_REFERENCE_CELL_ID, referenceCellId })

export const toggleExportPotentialTypeId = (potentialTypeId) => (
    { type: SET_EXPORT_POTENTIAL_TYPE_ID, potentialTypeId }
)

export const setExportPotentialDefaultValues = (referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList) => (
    { type: SET_EXPORT_POTENTIAL_DEFAULT_VALUES, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList }
)

export const toggleExportSubitemType = (subitemType) => (
    { type: SET_EXPORT_SUBITEM_TYPE, subitemType }
)

export const toggleExportSubitemProperty = (subitemType, subitemProperty) => (
    { type: SET_EXPORT_SUBITEM_PROPERTIES, subitemType, subitemProperty }
)

export const toggleExportPipeline = (pipelineId) => (
    { type: SET_EXPORT_PIPELINE, pipelineId }
)

export const toggleIncludeAssets = (isChecked) => (
    { type: SET_INCLUDE_ASSETS, isChecked }
)

export const setExportFormat = (format) => (
    { type: SET_EXPORT_FORMAT, format }
)

export const setIncludeMapLayers = (isChecked) => (
    { type: SET_INCLUDE_MAP_LAYERS, isChecked }
)

export const resetExport = () =>
    ({ type: RESET_EXPORT })

export const setInitialItemProperties = (properties) => (
    { type: SET_EXPORT_INITIAL_ITEM_PROPERTIES, properties }
)