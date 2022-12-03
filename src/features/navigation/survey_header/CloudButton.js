import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleIconButton from '../../../components/IconButton'
import { loadSession } from '../../../store/actions/settings'

const CloudButton = () => {
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const isCloudSurvey = useSelector(state => state.settings.currentSurvey.isCloudSurvey)
    const dispatch = useDispatch()
    const sessionModalVisible = () => dispatch(loadSession({ sessionModalVisible: true }))
    //add cloud outline icon
    return isCloudSurvey ? (
        <SingleIconButton
            iconName={isSigned ? 'cloud' : 'cloud-outline'}
            size='large'
            pack='cp'
            onPress={sessionModalVisible} />
    ) : null
}

export default CloudButton