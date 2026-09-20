import React from 'react'
import { useSelector } from 'react-redux'
import BottomButton from '../../../components/BottomButton'
import { translateImport } from '../../../localization'


const NextButton = ({ onPress }) => {
    const disabled = useSelector(state => state.importData.path !== null)
    const itemType = useSelector(state => state.importData.itemType)
    return <BottomButton
        disabled={!disabled}
        title={translateImport('file.next')}
        icon='arrow-circle-right'
        iconPosition='right'
        onPress={onPress.bind(this, itemType)} />
}

export default NextButton
