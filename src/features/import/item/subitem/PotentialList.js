import React from 'react'
import { Text } from '@ui-kitten/components'
import ParameterPotential from './ParameterPotential'


const PotentialList = ({ potentials, navigateToParameters, subitemIndex, fields, data, deletePotentialHandler }) => {
    return <>
        <Text
            category='label'
            appearance='hint'>Potentials</Text>
        {potentials.map((potential, i) => {
            return (
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
                    unitList={potential.unitList}
                    data={data} />)
        }
        )}
    </>
}


export default React.memo(PotentialList)