import React from 'react'
import Input from '../../../../components/Input'

const NameInput = ({ update, validate, name, defaultName, valid }) => {

    const onChangeText = React.useCallback((value) => update(value, 'name'), [update])
    const onEndEditing = React.useCallback(() => validate('name'), [validate])

    return (
        <Input
            maxLength={40}
            value={name}
            valid={valid}
            property='name'
            label='Name'
            placeholder={defaultName}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing} />
    )
}

export default React.memo(NameInput)