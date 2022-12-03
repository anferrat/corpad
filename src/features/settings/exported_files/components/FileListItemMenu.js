import React, { useState } from 'react'
import { OverflowMenu, MenuItem, Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { basic, basic300 } from '../../../../styles/colors'
import SingleIconButton from '../../../../components/IconButton'


const renderIcon = (iconName) => iconName ? (props) => (
    <Icon {...props} name={iconName} />
) : undefined

const MoreItemsIcon = (props) => (
    <Icon {...props} name='more-vertical' />
)

const FileListItemMenu = (props) => {
    const [visible, setVisible] = useState(false)
    const onPressAction = React.useCallback((onPress) => {
        setVisible(false)
        onPress()
    }, [setVisible])

    const items = React.useMemo(() => props.menuItems.map(item => <MenuItem title={item.title} onPress={onPressAction.bind(this, item.onPress)} key={item.title + 'key'} accessoryLeft={renderIcon(item.icon)} />), [])

    const renderAnchor = React.useCallback(() =>
        <View>
            <SingleIconButton
                color={basic}
                iconName='more-vertical'
                onPress={setVisible.bind(this, true)} />
        </View>, [setVisible])
    return (
        <View>
            <OverflowMenu
                placement={props.placement ?? 'left start'}
                appearance='noDivider'
                visible={visible}
                anchor={renderAnchor}
                onBackdropPress={setVisible.bind(this, false)}>
                {items}
            </OverflowMenu>
        </View>

    )
}

export default FileListItemMenu

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        width: 25
    },
    buttonPressed: {
        borderRadius: 6,
        width: 25,
        backgroundColor: basic300
    }
})