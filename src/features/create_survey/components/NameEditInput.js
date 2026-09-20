import React from 'react'
import Input from '../../../components/Input'
import { translateCreateSurvey } from '../../../localization'

const NameInput = ({ name, nameValid, onChangeName, onEndEditingName }) => {

    return (
        <Input
            autoFocus={true}
            maxLength={25}
            value={name}
            property='name'
            valid={nameValid}
            onChangeText={onChangeName}
            label={translateCreateSurvey('surveyName')}
            onEndEditing={onEndEditingName}
            placeholder={translateCreateSurvey('newSurvey')} />
    )
}

export default React.memo(NameInput)
