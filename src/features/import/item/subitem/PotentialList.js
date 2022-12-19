import React from 'react'
import { Text } from '@ui-kitten/components'
import ParameterPotential from './ParameterPotential'
import { items, potentialUnits } from '../../../../constants/constants'


const PotentialList = ({ potentials, navigateToParameters, subitemIndex, fields, data, deletePotentialHandler }) => {
    return <>
        <Text category='label' appearance='hint'>Potentials</Text>
        {potentials.map((potential, i) => (
            <ParameterPotential
                key={`pt-${potential.potentialTypeIndex}_rc-${potential.referenceCellIndex}`}
                deletePotentialHandler={deletePotentialHandler}
                potentialTypeIndex={potential.potentialTypeIndex}
                referenceCellIndex={potential.referenceCellIndex}
                navigateToParameters={navigateToParameters}
                subitemIndex={subitemIndex}
                potentialIndex={i}
                parameterType={potential.parameterType}
                importType={potential.importType}
                fields={fields}
                defaultValue={potential.defaultValue}
                fieldIndex={potential.fieldIndex}
                unit={potential.unit}
                defaultUnitIndex={potential.defaultUnitIndex}
                unitList={potentialUnits}
                data={data} />)
        )}
    </>
}


export default React.memo(PotentialList)