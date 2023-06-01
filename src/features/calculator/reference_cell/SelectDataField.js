import React from 'react'
import SelectField from '../../../components/Select'

const SelectDataField = (props) => {
    const onSelect = React.useCallback((value) => props.onSelect(props.property, value), [props.selectAction, props.property])
    return <SelectField
        {...props}
        onSelect={onSelect} />
}

export default React.memo(SelectDataField)