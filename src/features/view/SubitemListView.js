import React from 'react'
import useSubitemListData from './hooks/useSubitemListData'
import SubitemViewFactory from './components/SubitemFactory'


const SubitemListView = ({ itemId, itemType }) => {
    const { potentialUnit, potentialHint, subitems, pipelineList, loading, validatePotential, updatePotentialValue, updatePropertyValue, validateCouponCurrent, validateVoltageDrop, validateCurrent, updateShorted, validateVoltage } = useSubitemListData({ itemId, itemType })
    return (
        <>
            {subitems.map(subitem => (
                <SubitemViewFactory
                    key={subitem.uid}
                    subitem={subitem}
                    potentialUnit={potentialUnit}
                    potentialHint={potentialHint}
                    pipelineList={pipelineList}
                    updateShorted={updateShorted}
                    validateVoltage={validateVoltage}
                    validatePotential={validatePotential}
                    updatePotentialValue={updatePotentialValue}
                    updatePropertyValue={updatePropertyValue}
                    validateCouponCurrent={validateCouponCurrent}
                    validateVoltageDrop={validateVoltageDrop}
                    validateCurrent={validateCurrent} />
            )
            )}
        </>
    )
}
export default SubitemListView
