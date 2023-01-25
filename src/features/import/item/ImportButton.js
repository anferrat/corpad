import React, { useContext, useState } from 'react'
import ActionButton from '../../../components/ActionButton'
import { diagBack, importIcon } from '../../../components/Icons'
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
                <ActionButton
                    icon={importIcon}
                    title={'Import'}
                    onPress={showModal}
                    valid={true} />
                <ImportModal
                    visible={visible}
                    hideModal={hideModal} />
            </>
        )
    else return (
        <ActionButton
            icon={diagBack}
            title={'Back'}
            onPress={goBack}
            valid={true} />
    )
}

export default ImportButton