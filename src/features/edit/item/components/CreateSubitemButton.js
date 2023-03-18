import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AddReadingModal } from "../../../../components/AddReadingModal"
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../../components/Icons'


const CreateSubitemButton = ({ itemType, onSelect, title }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    const onPress = React.useCallback(() => {
        switch (itemType) {
            case 'TEST_POINT':
                return showModal()
            case 'RECTIFIER':
                return onSelect('CT')
            default: return () => { }
        }
    }, [onSelect, showModal, itemType])

    return (
        <>
            <Button
                appearance='ghost'
                style={styles.button}
                size='medium'
                accessoryLeft={addIcon}
                onPress={onPress}>
                {title}
            </Button>
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={onSelect}
            />
        </>
    )
}

export default React.memo(CreateSubitemButton)

const styles = StyleSheet.create({
    button: {
        height: 60
    }
})