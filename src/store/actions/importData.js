export const SET_IMPORT_ITEM_TYPE = 'SET_IMPORT_ITEM_TYPE'
export const SET_IMPORT_DATA = 'SET_IMPORT_DATA'
export const SET_IMPORT_ITEM_PROPERTY = 'SET_IMPORT_ITEM_PROPERTY'
export const SET_IMPORT_ITEM_PROPERTY_FIELD_INDEX = 'SET_IMPORT_ITEM_PROPERTY_FIELD_INDEX'
export const RESET_IMPORT_ITEM = 'RESET_IMPORT_ITEM'


export const setImportItemType = (value) =>
    ({ type: SET_IMPORT_ITEM_TYPE, itemType: value })

export const setImportData = (fields, data, fileName, defaultNames) =>
    ({ type: SET_IMPORT_DATA, fields: fields, data: data, fileName: fileName, defaultNames: defaultNames })

export const setImportItemProperty = (property, value) =>
    ({ type: SET_IMPORT_ITEM_PROPERTY, property: property, value: value })

    export const setImportItemPropertyFieldIndex = (property, index) =>
    ({ type: SET_IMPORT_ITEM_PROPERTY_FIELD_INDEX, property: property, index: index })

export const resetImportItem = () =>
    ({ type: RESET_IMPORT_ITEM })