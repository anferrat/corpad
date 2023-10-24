import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../../components/Icons'
import { ItemTypes } from '../../../../constants/global'

const AddButton = ({ showModal, itemType }) => {
    if (itemType === ItemTypes.TEST_POINT || itemType === ItemTypes.RECTIFIER)
        return (
            <Button
                onPress={showModal}
                appearance='ghost'
                style={styles.button}
                size='medium'
                accessoryLeft={addIcon}>
                Add reading
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