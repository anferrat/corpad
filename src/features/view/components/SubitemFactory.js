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
  availableMeasurementTypes,
}) => {

  const onEdit = React.useCallback(() => {
    navigateToEditSubitem(subitem.id, false, subitem.type)
  }, [navigateToEditSubitem, subitem.id, subitem.type])

  const onMultimeterPressHandler = React.useCallback((measurementType, potentialId = null) => {
    onMultimeterPress(subitem.id, subitem.type, measurementType, potentialId)
  }, [subitem.id, subitem.type, onMultimeterPress])

  switch (subitem.type) {
    case 'PL':
      return (
        <PL
          data={subitem}
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          validateVoltageDrop={validateVoltageDrop}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'BD':
      return (
        <BD
          data={subitem}
          idMap={idMap}
          availableMeasurementTypes={availableMeasurementTypes}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'RS':
      return (
        <RS
          data={subitem}
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
          idMap={idMap}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          updateShorted={updateShorted}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    case 'FC':
      return (
        <FC
          data={subitem}
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
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
          availableMeasurementTypes={availableMeasurementTypes}
          subitemIndex={subitemIndex}
          onEdit={onEdit}
          updatePropertyValue={updatePropertyValue}
          validateCurrent={validateCurrent}
          validateVoltage={validateVoltage}
          onMultimeterPress={onMultimeterPressHandler}
        />
      )
    default:
      return null;
  }
};

export default React.memo(SubitemViewFactory)
