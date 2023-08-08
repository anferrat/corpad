import React from 'react'
import { ScrollView } from 'react-native'
import Header from '../../Header'
import ListItem from './ListItem'
import { SubitemTypes } from '../../../constants/global'
import { SubitemTypeLabels } from '../../../constants/labels'
import { SubitemTypeIconsFilled } from '../../../constants/icons'

const SubitemTypeOptions = [
    SubitemTypes.PIPELINE,
    SubitemTypes.RISER,
    SubitemTypes.STRUCTURE,
    SubitemTypes.TEST_LEAD,
    SubitemTypes.ANODE,
    SubitemTypes.COUPON,
    SubitemTypes.REFERENCE_CELL,
    SubitemTypes.BOND,
    SubitemTypes.SHUNT,
    SubitemTypes.ISOLATION,
]

const ModalContent = ({ onSelect, hideModal }) => {

    const onSelectHandler = (cardType) => {
        onSelect(cardType)
        hideModal()
    }

    const renderItem = React.useCallback((subitemTypes) => subitemTypes.map(subitemType => (
        <ListItem
            key={subitemType}
            title={SubitemTypeLabels[subitemType]}
            pack='cp'
            onPress={onSelectHandler.bind(this, subitemType)}
            iconName={SubitemTypeIconsFilled[subitemType]} />
    )), [onSelectHandler])

    return (
        <>
            <Header
                title='Select reading'
                onBackPress={hideModal} />
            <ScrollView>
                {renderItem(SubitemTypeOptions)}
            </ScrollView>
        </>
    )
}

export default ModalContent
