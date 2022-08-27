import React, { useState } from 'react'
import SingleIconButton from '../../_Stateless/SingleIconButton'
import SurveyNameModal from './SurveyNameModal'

const EditNameButton = (props) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <SingleIconButton
                iconName='edit'
                onPress={setVisible.bind(this, true)}
            />
            <SurveyNameModal
                isVisible={visible}
                dismiss={setVisible.bind(this, false)}
                surveyName={props.surveyName}
            />
        </>
    )
}

export default EditNameButton