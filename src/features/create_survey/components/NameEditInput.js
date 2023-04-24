import React from 'react'
import Input from '../../../components/Input'

const NameInput = ({ name, nameValid, onChangeName, onEndEditingName }) => {

    return (
        <Input
            autoFocus={true}
            maxLength={25}
            value={name}
            property='name'
            valid={nameValid}
            onChangeText={onChangeName}
            label='Survey name'
            onEndEditing={onEndEditingName}
            placeholder='New survey' />
    )
}

export default React.memo(NameInput)