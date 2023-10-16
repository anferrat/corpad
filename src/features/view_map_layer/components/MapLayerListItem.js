import React from 'react'
import { View, StyleSheet } from 'react-native'
import Pressable from '../../../components/Pressable'
import { CheckBox, Icon, MenuItem, OverflowMenu, Text } from '@ui-kitten/components'
import { edit, trashIcon } from '../../../components/Icons'
import { androidRipple } from '../../../styles/styles'
import useModal from '../../../hooks/useModal'
import IconButton from '../../../components/IconButton'
import { MapLayerStrokeColors, primary } from '../../../styles/colors'


const MapLayerListItem = ({ layerId, name, index, selected, color, comment, featureCount, onEdit, onDelete, onSelect, width }) => {
    const { visible, hideModal, showModal } = useModal(false)

    const onEditHandler = React.useCallback(() => {
        onEdit(layerId)
        hideModal()
    }, [layerId, onEdit, hideModal])

    const onDeleteHandler = React.useCallback(() => {
        onDelete(index, layerId)
        hideModal()
    }, [onDelete, layerId, index, hideModal])

    const onSelectHandler = () => onSelect(layerId, name, color, comment, width, index, !selected)

    const renderAnchor = React.useCallback(() =>
        <View>
            <IconButton
                iconName={'more-vertical-outline'}
                onPress={showModal}
            />
        </View>, [])
    return (
        <Pressable
            android_ripple={androidRipple}
            onPress={onSelectHandler}
            style={styles.container}>
            <View style={styles.leftSide}>
                <CheckBox
                    style={styles.checkBox}
                    onChange={onSelectHandler}
                    checked={selected} />
                <View style={styles.content}>
                    <View style={styles.titleView}>
                        <Icon
                            name={'layers'}
                            fill={primary}
                            style={styles.circle} />
                        <Text category='h6'>{name}</Text>
                    </View>
                    <View
                        style={styles.subtitleView}>
                        <Icon
                            name={'color-circle'}
                            pack='cp'
                            style={styles.smallIcon}
                            fill={MapLayerStrokeColors[color] ?? '#000000'} />
                        <Text
                            category={'s2'}
                            appearance='hint'
                            style={styles.comment}>{featureCount} feature{featureCount !== 1 ? 's' : ''}</Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.rightSide}>
                <OverflowMenu
                    anchor={renderAnchor}
                    visible={visible}
                    onBackdropPress={hideModal}>
                    <MenuItem
                        onPress={onEditHandler}
                        accessoryLeft={edit}
                        title='Edit' />
                    <MenuItem
                        onPress={onDeleteHandler}
                        accessoryLeft={trashIcon}
                        title='Delete' />
                </OverflowMenu>
            </View>

        </Pressable>
    )
}

export default React.memo(MapLayerListItem)

const styles = StyleSheet.create({
    container: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    rightSide: {
        flexDirection: 'row',
    },
    subtitleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        marginRight: 6
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    },
    comment: {
        flex: 1
    },
    content: {
        flex: 1
    },
    checkBox: {
        marginRight: 26,
        marginLeft: 6
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallIcon: {
        width: 15,
        height: 15,
        marginRight: 4
    }
})