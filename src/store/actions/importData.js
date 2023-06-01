export const SET_IMPORT_ITEM_TYPE = 'SET_IMPORT_ITEM_TYPE'
export const SET_IMPORT_DATA = 'SET_IMPORT_DATA'
export const SET_IMPORT_PROPERTY = 'SET_IMPORT_PROPERTY'
export const RESET_IMPORT_ITEM = 'RESET_IMPORT_ITEM'
export const ADD_IMPORT_SUBITEM = 'ADD_IMPORT_SUBITEM'
export const SET_IMPORT_SUBITEM_SETTING = 'SET_IMPORT_SUBITEM_SETTING'
export const SET_IMPORT_ITEM_SETTING = 'SET_IMPORT_ITEM_SETTING'
export const ADD_IMPORT_SUBITEM_POTENTIAL = 'ADD_IMPORT_SUBITEM_POTENTIAL'
export const REMOVE_IMPORT_SUBITEM_POTENTAIL = 'REMOVE_IMPORT_SUBITEM_POTENTAIL'
export const REMOVE_IMPORT_SUBITEM = 'REMOVE_IMPORT_SUBITEM'


export const setImportItemType = (value) =>
    ({ type: SET_IMPORT_ITEM_TYPE, itemType: value })

export const setImportData = (fields, data, fileName, defaultNames, uri, potentialTypes, referenceCells, pipelines, autoCreatePotentials) =>
    ({ type: SET_IMPORT_DATA, fields: fields, data: data, fileName: fileName, defaultNames: defaultNames, uri: uri, potentialTypes, referenceCells, pipelines, autoCreatePotentials })

export const setImportProperty = (property, subitemIndex, potentialIndex, value) =>
    ({ type: SET_IMPORT_PROPERTY, property: property, value: value, subitemIndex: subitemIndex, potentialIndex: potentialIndex })

export const resetImportItem = () =>
    ({ type: RESET_IMPORT_ITEM })

export const addSubitem = (subitemType, autoCreatePotentials, initialPotentials) =>
    ({ type: ADD_IMPORT_SUBITEM, subitemType: subitemType, autoCreatePotentials: autoCreatePotentials, initialPotentials })

export const deleteImportSubitem = (subitemIndex) =>
    ({ type: REMOVE_IMPORT_SUBITEM, subitemIndex: subitemIndex })

export const setImportSubitemSetting = (property, subitemIndex, value) =>
    ({ type: SET_IMPORT_SUBITEM_SETTING, property: property, subitemIndex: subitemIndex, value: value })

export const setImportItemSetting = (property, value) =>
    ({ type: SET_IMPORT_ITEM_SETTING, property: property, value: value })

export const addPotential = (subitemIndex, potentialTypeIndex, referenceCellIndex) =>
    ({ type: ADD_IMPORT_SUBITEM_POTENTIAL, potentialTypeIndex: potentialTypeIndex, subitemIndex: subitemIndex, referenceCellIndex: referenceCellIndex })

export const removePotential = (subitemIndex, potentialIndex) =>
    ({ type: REMOVE_IMPORT_SUBITEM_POTENTAIL, subitemIndex: subitemIndex, potentialIndex: potentialIndex })
