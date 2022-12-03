export const SET_EXPORT_SETTING = 'SET_EXPORT_SETTING'
export const SET_ITEM_TYPE = 'SET_ITEM_TYPE'
export const SET_POTENTIALS_CHECKED = 'SET_POTENTIALS_CHECKED'
export const SET_READINGS_CHECKED = 'SET_READINGS_CHECKED'
export const SET_CIRCUITS_CHECKED = 'SET_CIRCUITS_CHECKED'
export const RESET_EXPORT = 'RESET_EXPORT'

export const setExportItemType = (value) =>
    ({ type: SET_ITEM_TYPE, value: value })

export const setExportPotentialsChecked = (value) =>
    ({ type: SET_POTENTIALS_CHECKED, value: value })

export const setExportReadingsChecked = (value) =>
    ({ type: SET_READINGS_CHECKED, value: value })

export const setExportCircuitsChecked = (value) =>
    ({ type: SET_CIRCUITS_CHECKED, value: value })

export const setExportSetting = (property, value) =>
    ({ type: SET_EXPORT_SETTING, value: value, property: property })

export const resetExport = () =>
    ({ type: RESET_EXPORT })