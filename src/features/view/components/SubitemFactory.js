import React from 'react'
import AN from './subitems/AN'
import BD from './subitems/BD'
import CN from './subitems/CN'
import CT from './subitems/CT'
import FC from './subitems/FC'
import IK from './subitems/IK'
import OT from './subitems/OT'
import PL from './subitems/PL'
import RE from './subitems/RE'
import RS from './subitems/RS'
import SH from './subitems/SH'

const SubitemViewFactory = ({
  subitem,
  subitemIndex,
  idMap,
  navigateToEditSubitem,
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
  validateCurrent,
}) => {
  const onEdit = React.useCallback(() => {
    navigateToEditSubitem(subitem.id, false, subitem.type)
  }, [navigateToEditSubitem, subitem.id, subitem.type])

  switch (subitem.type) {
    case 'PL':
      return (
        <PL
          data={subitem}
          subitemIndex={subitemIndex}
          pipelineList={pipelineList}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
        />
      )
    case 'AN':
      return (
        <AN
          data={subitem}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
        />
      )
    case 'RE':
      return (
        <RE
          data={subitem}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
        />
      )
    case 'CN':
      return (
        <CN
          data={subitem}
          idMap={idMap}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCouponCurrent={validateCouponCurrent}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
        />
      )
    case 'SH':
      return (
        <SH
          data={subitem}
          idMap={idMap}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          validateVoltageDrop={validateVoltageDrop} />
      )
    case 'BD':
      return (
        <BD
          data={subitem}
          idMap={idMap}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
        />
      )
    case 'RS':
      return (
        <RS
          data={subitem}
          subitemIndex={subitemIndex}
          pipelineList={pipelineList}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential} />
      )
    case 'IK':
      return (
        <IK
          data={subitem}
          idMap={idMap}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          updateShorted={updateShorted}
        />
      )
    case 'FC':
      return (
        <FC
          data={subitem}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
        />
      )
    case 'OT':
      return (
        <OT
          data={subitem}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
        />
      )
    case 'CT':
      return (
        <CT
          data={subitem}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          validateVoltage={validateVoltage}
        />
      )
    default:
      return null;
  }
};

export default React.memo(SubitemViewFactory)
