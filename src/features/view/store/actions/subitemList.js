export const updatePotentialAction = (subitemIndex, potentialIndex, value, valid = undefined) => {
    return { type: 'UPDATE_POTENTIAL', subitemIndex, potentialIndex, value, valid }
}

export const loadSubitemListDataAction = (subitems, pipelineList, potentialUnit, referenceCells) => {
    return { type: 'LOAD_DATA', subitems, pipelineList, potentialUnit, referenceCells }
}

export const updatePropertyAction = (subitemIndex, property, value, valid = undefined) => {
    return { type: 'UPDATE_SUBITEM_PROPERTY', subitemIndex, property, value, valid }
}

export const validateCouponCurrentAction = (subitemIndex) => {
    return { type: 'VALIDATE_COUPON_CURRENT', subitemIndex }
}

export const validateCurrentAction = (subitemIndex) => {
    return { type: 'VALIDATE_CURRENT', subitemIndex }
}

export const validateVoltageAction = (subitemIndex) => {
    return { type: 'VALIDATE_VOLTAGE', subitemIndex }
}

export const validateVoltageDropAction = (subitemIndex) => {
    return { type: 'VALIDATE_VOLTAGE_DROP', subitemIndex }
}

export const toggleShortedAction = (subitemIndex, shorted) => {
    return { type: 'TOGGLE_SHORTED', subitemIndex, shorted }
}

