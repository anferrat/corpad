import React, { useContext, useState } from 'react'
import BottomButton from '../../../components/BottomButton'
import ImportModal from './ImportModal'
import { ImportData } from './ImportDataProvider'

const ImportButton = () => {
    const { subitemIndex, goBack } = useContext(ImportData)
    const [visible, setVisible] = useState(false)
    const isItem = subitemIndex === null

    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])
    if (isItem)
        return (
            <>
                <BottomButton
                    icon='download-outline'
                    title={'Import'}
                    onPress={showModal} />
                <ImportModal
                    visible={visible}
                    hideModal={hideModal} />
            </>
        )
    else return (
        <BottomButton
            icon='undo'
            title={'Back'}
            onPress={goBack} />
    )
}

export default ImportButton