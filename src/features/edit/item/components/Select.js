import React from 'react'
import SelectField from '../../../../components/Select'

const Select = (props) => {
    const { property, update } = props

    const onSelect = React.useCallback((index) => {
        update(index, property)
    }, [update, property])

    return (
        <SelectField
            {...props}
            onSelect={onSelect} />
    )
}

export default React.memo(Select)