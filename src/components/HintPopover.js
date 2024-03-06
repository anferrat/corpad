import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Popover, Text } from '@ui-kitten/components'
import useModal from '../hooks/useModal'
import IconButton from './IconButton'
import { primary } from '../styles/colors'

//Needs more work, not used anywhere
const HintPopover = ({ text }) => {
    const { visible, hideModal, showModal } = useModal(false)

    const renderButton = React.useCallback(() =>
        <View>
            <IconButton
                onPress={showModal}
                iconName='question-mark-circle'
                size='small' />
        </View>, [])

    return (
        <Popover
            placement='bottom'
            hardwareAccelerated={true}
            visible={visible}
            anchor={renderButton}
            onBackdropPress={hideModal}>
            <View
                style={styles.content}>
                <Icon
                    name='question-mark'
                    style={styles.icon}
                    fill={primary} />
                <Text category='s2'>
                    {text}
                </Text>
            </View>
        </Popover>
    )
}

export default HintPopover

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 8,
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 12
    }
})