import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../../components/Icons'
import { getButtonTitle } from '../helpers/functions'

const AddButton = ({ showModal, itemType, onSelect }) => {
    if (itemType === 'TEST_POINT' || itemType === 'RECTIFIER')
        return (
            <Button
                onPress={itemType === 'TEST_POINT' ? showModal : onSelect.bind(this, 'CT')}
                appearance='ghost'
                style={styles.button}
                size='medium'
                accessoryLeft={addIcon}>
                {getButtonTitle(itemType)}
            </Button>
        )
    else return null
}

export default React.memo(AddButton)

const styles = StyleSheet.create({
    button: {
        height: 60,
    }
})