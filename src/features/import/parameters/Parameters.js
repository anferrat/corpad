import React from 'react'
import InputFieldParamaters from './SimpleParameterView'
import SelectFieldParamaters from './MappedParameterView'
import { useSelector } from 'react-redux'
import { Input, Select } from '../models/models'
import { getData } from './helpers/functions'


const ImportParameters = (props) => {
    const initValue = useSelector(state => getData(state, props.property, props.subitemIndex))
    const fields = useSelector(state => state.importData.fields)
    const data = useSelector(state => state.importData.data)
    if (initValue.parameterType === 0)
        return <InputFieldParamaters
            goBack={props.goBack}
            property={props.property}
            value={initValue}
            fields={fields}
        />
    else if (initValue.parameterType === 1)
        return <SelectFieldParamaters
            goBack={props.goBack}
            property={props.property}
            value={initValue}
            fields={fields}
            data={data}
        />
    else return null
}

export default ImportParameters