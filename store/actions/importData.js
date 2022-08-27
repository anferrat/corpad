export const SET_IMPORT_ITEM_TYPE = 'SET_IMPORT_ITEM_TYPE'
export const SET_IMPORT_DATA = 'SET_IMPORT_DATA'
export const SET_IMPORT_ITEM_PROPERTY = 'SET_IMPORT_ITEM_PROPERTY'
export const RESET_IMPORT_ITEM = 'RESET_IMPORT_ITEM'


export const setImportItemType = (value) =>
    ({ type: SET_IMPORT_ITEM_TYPE, itemType: value })

export const setImportData = (fields, data, fileName) =>
    ({ type: SET_IMPORT_DATA, fields: fields, data: data, fileName: fileName })

export const setImportItemProperty = (property, value, fromFile = false) =>
    ({ type: SET_IMPORT_ITEM_PROPERTY, property: property, value: value, fromFile: fromFile })

export const resetImportItem = () =>
    ({ type: RESET_IMPORT_ITEM })