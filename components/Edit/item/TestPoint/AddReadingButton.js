import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../_Stateless/Icons'
import AddReadingModal from './AddReadingModal'
import { testPointReadingOptions } from '../../../../constants/constants'

const AddReadingButton = (props) => {
    const [selectVisible, setSelectVisible] = useState(false)
    const disabled = !testPointReadingOptions[props.testPointType] || testPointReadingOptions[props.testPointType]?.length === 0
    return (
        <>
            <Button
                onPress={setSelectVisible.bind(this, true)}
                appearance='ghost'
                style={styles.button}
                size='medium'
                disabled={disabled}
                accessoryLeft={addIcon}>
                Add reading
            </Button>
            <AddReadingModal
                testPointType={props.testPointType}
                testPointId={props.testPointId}
                closeModal={setSelectVisible.bind(this, false)}
                navigateToCard={props.navigateToCard}
                visible={selectVisible} />
        </>
    )
}

export default React.memo(AddReadingButton)

const styles = StyleSheet.create({
    button: {
        height: 60,
    }
})