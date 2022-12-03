import React from 'react'
import SelectField from '../../../components/Select'

const SelectDataField = (props) => {
    const onSelect = React.useCallback((value) => props.selectAction(props.property, value), [props.selectAction, props.property])
    return <SelectField
        {...props}
        selectAction={onSelect}
    />
}

export default React.memo(SelectDataField)