import React from 'react'
import TextLine from '../TextLine'
import Header from '../Header'
import PotentialsView from '../PotentialsView'
import { referenceCellTypes } from '../../../../constants/constants'
import Divider from '../Divider'

const RE = ({
  data,
  potentialUnit,
  potentialHint,
  updatePotentialValue,
  validatePotential,
  subitemIndex,
  onEdit,
}) => {
  const { name, type, wireColor, wireGauge, potentials, rcType } = data
  return (
    <>
      <Header
        wireColor={wireColor}
        wireGauge={wireGauge}
        title={name}
        icon={type}
        onEdit={onEdit} />
      <Divider visible={potentials.length > 0 || rcType !== null} />
      <PotentialsView
        subitemIndex={subitemIndex}
        updatePotentialValue={updatePotentialValue}
        validatePotential={validatePotential}
        unit={potentialUnit}
        potentialHint={potentialHint}
        potentials={potentials}
      />
      <TextLine title="Material" value={referenceCellTypes[rcType] ?? null} />
    </>
  )
}
export default RE
