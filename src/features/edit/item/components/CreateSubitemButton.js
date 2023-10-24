import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AddReadingModal } from "../../../../components/AddReadingModal"
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../../components/Icons'
import { SubitemTypes, ItemTypes } from '../../../../constants/global'


const CreateSubitemButton = ({ itemType, onSelect, title }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    const subitemTypes = React.useMemo(() => {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return [SubitemTypes.PIPELINE, SubitemTypes.RISER, SubitemTypes.STRUCTURE, SubitemTypes.TEST_LEAD, SubitemTypes.ANODE, SubitemTypes.COUPON, SubitemTypes.REFERENCE_CELL, SubitemTypes.BOND, SubitemTypes.SHUNT, SubitemTypes.ISOLATION, SubitemTypes.SOIL_RESISTIVITY]
            case ItemTypes.RECTIFIER:
                return [SubitemTypes.ANODE_BED, SubitemTypes.CIRCUIT]
            default:
                return []
        }
    }, [itemType])


    return (
        <>
            <Button
                appearance='ghost'
                style={styles.button}
                size='medium'
                accessoryLeft={addIcon}
                onPress={showModal}>
                {title}
            </Button>
            <AddReadingModal
                subitemTypes={subitemTypes}
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