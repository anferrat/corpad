import { ExportFormatTypes, ItemTypes, SubitemTypes } from '../../constants/global'
import { SET_EXPORT_ITEM_PROPERTIES, SET_EXPORT_ITEM_TYPE, SET_EXPORT_SORTING, RESET_EXPORT, SET_EXPORT_REFERENCE_CELL_ID, SET_EXPORT_POTENTIAL_TYPE_ID, SET_EXPORT_POTENTIAL_DEFAULT_VALUES, SET_EXPORT_SUBITEM_TYPE, SET_EXPORT_PIPELINE, SET_EXPORT_POTENTIALS, SET_EXPORT_POTENTAILS_PIPELINE_GROUPING, SET_EXPORT_SUBITEM_PROPERTIES, SET_INCLUDE_ASSETS, SET_INCLUDE_MAP_LAYERS, SET_EXPORT_FORMAT } from '../actions/export'

const initialState = {
    itemType: ItemTypes.TEST_POINT,
    sorting: 0,
    includeAssets: true,
    exportType: ExportFormatTypes.CSV,
    includeMapLayers: false,
    exportPotentials: true,
    exportSubitems: false,
    itemProperties: ['name'],
    referenceCellId: null,
    potentialTypeIdList: [],
    selectedSubitemTypes: [],
    pipelineIdList: [],
    groupPotentialsByPipeline: false,
    pipelineGroupingActive: true,
    subitemProperties: []
}

const exportSurvey = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXPORT_ITEM_PROPERTIES: {
            const propertyExists = ~state.itemProperties.indexOf(action.itemProperty)
            return {
                ...state,
                itemProperties: propertyExists ?
                    state.itemProperties.filter(property => property !== action.itemProperty) :
                    state.itemProperties.concat(action.itemProperty)
            }
        }
        case SET_EXPORT_POTENTIAL_TYPE_ID: {
            const idExists = ~state.potentialTypeIdList.indexOf(action.potentialTypeId)
            return {
                ...state,
                potentialTypeIdList: idExists ?
                    state.potentialTypeIdList.filter(id => id !== action.potentialTypeId) :
                    state.potentialTypeIdList.concat(action.potentialTypeId)
            }
        }

        case SET_EXPORT_POTENTIAL_DEFAULT_VALUES:
            return {
                ...state,
                potentialTypeIdList: action.potentialTypeIdList,
                referenceCellId: action.referenceCellId,
                selectedSubitemTypes: action.selectedSubitemTypes,
                pipelineIdList: action.pipelineIdList
            }
        case SET_EXPORT_POTENTAILS_PIPELINE_GROUPING:
            return {
                ...state,
                groupPotentialsByPipeline: action.isGroupedByPipeline
            }
        case SET_EXPORT_ITEM_TYPE:
            return {
                ...initialState,
                itemType: action.itemType,
                sorting: state.sorting
            }
        case SET_EXPORT_SORTING:
            return {
                ...state,
                sorting: action.sorting
            }
        case SET_INCLUDE_ASSETS:
            return {
                ...state,
                includeAssets: action.isChecked
            }
        case SET_EXPORT_POTENTIALS:
            return {
                ...state,
                exportPotentials: action.exportPotentials
            }
        case SET_EXPORT_FORMAT:
            return {
                ...state,
                exportType: action.format
            }
        case SET_INCLUDE_MAP_LAYERS:
            return {
                ...state,
                includeMapLayers: action.isChecked
            }
        case SET_EXPORT_REFERENCE_CELL_ID:
            return {
                ...state,
                referenceCellId: action.referenceCellId
            }
        case SET_EXPORT_SUBITEM_TYPE: {
            const typeExists = ~state.selectedSubitemTypes.indexOf(action.subitemType)
            const newSelectedSubitemTypes = typeExists ? state.selectedSubitemTypes.filter((type) => type !== action.subitemType) : state.selectedSubitemTypes.concat(action.subitemType)
            const pipelineGroupingActive = newSelectedSubitemTypes.some(type => type === SubitemTypes.PIPELINE || type === SubitemTypes.RISER)
            return {
                ...state,
                selectedSubitemTypes: newSelectedSubitemTypes,
                groupPotentialsByPipeline: pipelineGroupingActive ? state.groupPotentialsByPipeline : false,
                pipelineGroupingActive: pipelineGroupingActive
            }
        }
        case SET_EXPORT_PIPELINE: {
            const idExists = ~state.pipelineIdList.indexOf(action.pipelineId)
            return {
                ...state,
                pipelineIdList: idExists ?
                    state.pipelineIdList.filter(id => id !== action.pipelineId) :
                    state.pipelineIdList.concat(action.pipelineId)
            }
        }
        case SET_EXPORT_SUBITEM_PROPERTIES: {
            const propertyExists = ~state.subitemProperties.findIndex(([type, property]) => action.subitemProperty === property && action.subitemType === type)
            return {
                ...state,
                subitemProperties:
                    propertyExists ?
                        state.subitemProperties.filter(([type, property]) => !(property === action.subitemProperty && type === action.subitemType)) :
                        state.subitemProperties.concat([[action.subitemType, action.subitemProperty]])
            }
        }
        case RESET_EXPORT:
            return {
                ...initialState,
                itemType: state.itemType,
                sorting: state.sorting,
                includeAssets: state.includeAssets,
            }
        default:
            return state
    }
}

export default exportSurvey