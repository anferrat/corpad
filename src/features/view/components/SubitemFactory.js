import React from 'react'
import AN from './subitems/AN'

const SubitemViewFactory = ({
    subitem,
    potentialUnit,
    potentialHint,
    pipelineList,
    updateShorted,
    validateVoltage,
    validatePotential,
    updatePotentialValue,
    updatePropertyValue,
    validateCouponCurrent,
    validateVoltageDrop,
    validateCurrent }) => {


    switch (subitem.type) {
        case 'PL':
            return null
        case 'AN':
            return (
                <AN
                    data={subitem}
                    potentialUnit={potentialUnit}
                    potentialHint={potentialHint}
                    updatePotentialValue={updatePotentialValue}
                    validatePotential={validatePotential} />
            )
        case 'RE':
            return null
        case 'CN':
            return null
        case 'SH':
            return null
        case 'BD':
            return null
        case 'RS':
            return null
        case 'IK':
            return null
        case 'FC':
            return null
        case 'OT':
            return null
        case 'CT':
            return null
        default:
            return null
    }
}

export default SubitemViewFactory