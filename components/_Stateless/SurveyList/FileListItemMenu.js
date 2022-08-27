import React, { useState } from 'react'
import { OverflowMenu, MenuItem, Icon, Button } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { basic300 } from '../../../styles/GlobalStyle'


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

    const renderAnchor = React.useCallback(() => <Button
        appearance='ghost'
        style={visible ? styles.buttonPressed : styles.button}
        onPress={setVisible.bind(this, true)} accessoryLeft={MoreItemsIcon}></Button>, [setVisible, visible])

    return (
        <View>
            <OverflowMenu
                placement='left start'
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