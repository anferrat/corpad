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
  onMultimeterPress,
  multimeterPaired,
}) => {

  const onEdit = React.useCallback(() => {
    navigateToEditSubitem(subitem.id, false, subitem.type)
  }, [navigateToEditSubitem, subitem.id, subitem.type])

  const onMultimeterPressHandler = React.useCallback((potentialId) => {
    onMultimeterPress(subitem.id, potentialId)
  }, [subitem.id, onMultimeterPress])

  switch (subitem.type) {
    case 'PL':
      return (
        <PL
          data={subitem}
          multimeterPaired={multimeterPaired}
          subitemIndex={subitemIndex}
          pipelineList={pipelineList}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'AN':
      return (
        <AN
          data={subitem}
          multimeterPaired={multimeterPaired}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'RE':
      return (
        <RE
          data={subitem}
          multimeterPaired={multimeterPaired}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'CN':
      return (
        <CN
          data={subitem}
          multimeterPaired={multimeterPaired}
          idMap={idMap}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCouponCurrent={validateCouponCurrent}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler}
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
          multimeterPaired={multimeterPaired}
          subitemIndex={subitemIndex}
          pipelineList={pipelineList}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler} />
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
          multimeterPaired={multimeterPaired}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'OT':
      return (
        <OT
          data={subitem}
          multimeterPaired={multimeterPaired}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          potentialUnit={potentialUnit}
          potentialHint={potentialHint}
          updatePotentialValue={updatePotentialValue}
          validatePotential={validatePotential}
          onMultimeterPress={onMultimeterPressHandler}
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
