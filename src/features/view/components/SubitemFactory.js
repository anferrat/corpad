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
import { SubitemTypes } from '../../../constants/global'
import SR from './subitems/SR'
import AB from './subitems/AB'

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
    case SubitemTypes.PIPELINE:
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
    case SubitemTypes.ANODE:
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
    case SubitemTypes.REFERENCE_CELL:
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
    case SubitemTypes.COUPON:
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
    case SubitemTypes.SHUNT:
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
    case SubitemTypes.BOND:
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
    case SubitemTypes.RISER:
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
    case SubitemTypes.ISOLATION:
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
    case SubitemTypes.STRUCTURE:
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
    case SubitemTypes.TEST_LEAD:
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
    case SubitemTypes.CIRCUIT:
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
    case SubitemTypes.SOIL_RESISTIVITY:
      return <SR
        data={subitem}
        onEdit={onEdit}
        subitemIndex={subitemIndex} />
    case SubitemTypes.ANODE_BED:
      return <AB
        data={subitem}
        onEdit={onEdit}
        subitemIndex={subitemIndex} />
    default:
      return null;
  }
};

export default React.memo(SubitemViewFactory)
