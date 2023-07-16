import React from 'react'
import { View, StyleSheet } from 'react-native'
import useNearbyItems from './hooks/useNearbyItems'
import { ListItem, Modal, Icon, Text } from '@ui-kitten/components'
import LoadingView from '../../../components/LoadingView'
import { ItemTypeLabels, TestPointTypeLabels } from '../../../constants/labels'
import { ItemTypes } from '../../../constants/global'
import { ItemTypeIcons, TestPointTypeIcons } from '../../../constants/icons'


const NearbyItemModal = () => {
    const { visible, loading, list, itemType, hideModal, navigateToItem } = useNearbyItems()
    return (
        <Modal
            visible={false}>
            <LoadingView
                loading={loading}>
                {list.map((({ id, name, distance, markerType, testPointType }) => {
                    const icon = itemType === ItemTypes.TEST_POINT ? TestPointTypeIcons[testPointType] : ItemTypeIcons[itemType]
                    const subtitle = itemType === ItemTypes.TEST_POINT ? TestPointTypeLabels[testPointType] : ItemTypeLabels[itemType]
                    return <ListItem
                        title={name}
                        subtitle={subtitle}
                        accessoryLeft={(props) => <Icon {...props} name={icon} pack='cp' />}
                        accessoryRight={(props) => <Text {...props}>{distance}</Text>}
                    />
                }))}
            </LoadingView>
        </Modal>
    )
}

export default NearbyItemModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})