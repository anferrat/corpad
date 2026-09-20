import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Header from '../../Header'
import ListItem from './ListItem'
import { SubitemTypes } from '../../../constants/global'
import { SubitemTypeLabels } from '../../../constants/labels'
import { SubitemTypeIconsFilled } from '../../../constants/icons'
import { translateAddReading } from '../../../localization'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
    SubitemTypes.ANODE_BED,
    SubitemTypes.CIRCUIT,
    SubitemTypes.SOIL_RESISTIVITY,
]

const ModalContent = ({ onSelect, hideModal, subitemTypes }) => {
    const { bottom } = useSafeAreaInsets()

    const onSelectHandler = React.useCallback((cardType) => {
        onSelect(cardType)
        hideModal()
    }, [hideModal, onSelect])

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
                title={translateAddReading('selectReading')}
                onBackPress={hideModal} />
            <ScrollView
                contentContainerStyle={[styles.scrollView, { paddingBottom: bottom + 12 }]}
            >
                {renderItem(subitemTypes)}
            </ScrollView>
        </>
    )
}

export default ModalContent

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 12
    }
})
