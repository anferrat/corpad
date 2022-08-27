import React from 'react'
import InputField from '../../_Stateless/InputField'

const NameInput = (props) => {
    return (
        <InputField
            maxLength={25}
            autoFocus={true}
            value={props.surveyName}
            property='name'
            valid={props.surveyNameValid}
            onChangeText={props.setSurveyName}
            label='Survey name'
            onEndEditing={props.validateName.bind(this, props.surveyName)}
            placeholder='New survey' />
    )
}

export default React.memo(NameInput)