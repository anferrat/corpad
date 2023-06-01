import React from 'react'
import InputFieldParamaters from './SimpleParameterView'
import SelectFieldParamaters from './MappedParameterView'
import { useSelector } from 'react-redux'
import { getData } from './helpers/functions'
import { getDefaultUnit } from '../item/helpers/functions'


export const ImportParameters = (props) => {
    const initValue = useSelector(state => getData(state, props.property, props.subitemIndex, props.potentialIndex))
    const extraData = useSelector(state => state.importData.extraData)
    const fields = useSelector(state => state.importData.fields)
    const data = useSelector(state => state.importData.data)
    const defaultUnit = getDefaultUnit(initValue.unitList, initValue.defaultUnitIndex, extraData, initValue.referenceCellIndex)
    if (initValue?.parameterType === 0)
        return <InputFieldParamaters
            goBack={props.goBack}
            property={props.property}
            subitemIndex={props.subitemIndex}
            potentialIndex={props.potentialIndex}
            value={initValue}
            defaultUnit={defaultUnit}
            fields={fields} />
    else if (initValue?.parameterType === 1)
        return <SelectFieldParamaters
            goBack={props.goBack}
            property={props.property}
            potentialIndex={props.potentialIndex}
            subitemIndex={props.subitemIndex}
            value={initValue}
            fields={fields}
            data={data} />
    else return null
}