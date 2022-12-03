import React from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import { emptyValueCheck } from '../helpers/functions'

const SelectDisplay = (props) => {
    if (props.importType === 0)
        return (
            <Input
                disabled={true}
                valid={true}
                label={props.label}
                value={emptyValueCheck(props.itemList[props.defaultValue])}
            />
        )
    else return null
}

export default SelectDisplay