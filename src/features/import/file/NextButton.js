import React from 'react'
import { useSelector } from 'react-redux'
import ActionButton from '../../../components/ActionButton'


const NextButton = (props) => {
    const itemType = useSelector(state => state.importData.itemType)
    return <ActionButton
        disabled={false}
        title='Next'
        valid={true}
        onPress={props.onPress.bind(this, itemType)} />
}

export default NextButton