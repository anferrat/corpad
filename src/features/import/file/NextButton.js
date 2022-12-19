import React from 'react'
import { useSelector } from 'react-redux'
import ActionButton from '../../../components/ActionButton'


const NextButton = ({ onPress }) => {
    const disabled = useSelector(state => state.importData.uri !== null)
    const itemType = useSelector(state => state.importData.itemType)
    return <ActionButton
        disabled={!disabled}
        title='Next'
        valid={true}
        onPress={onPress.bind(this, itemType)} />
}

export default NextButton