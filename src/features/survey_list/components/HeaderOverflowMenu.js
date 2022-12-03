import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { OverflowMenu, MenuItem, Icon } from '@ui-kitten/components'
import { basic300, primary } from '../../../styles/colors'
import SingleIconButton from '../../../components/IconButton'


const renderIcon = (iconName) => iconName ? (props) => (
    <Icon {...props} fill={primary} name={iconName} />
) : undefined

const HeaderOverflowMenu = (props) => {
    const [visible, setVisible] = useState(false)
    const onPressAction = React.useCallback((onPress) => {
        setVisible(false)
        onPress()
    }, [setVisible])

    const items = React.useMemo(() => props.menuItems.map(item => <MenuItem title={item.title} onPress={onPressAction.bind(this, item.onPress)} key={item.title + 'key'} accessoryLeft={renderIcon(item.icon)} />), [])

    const renderAnchor = React.useCallback(() =>
        <View>
            <SingleIconButton
                color='#fff'
                iconName='settings'
                onPress={setVisible.bind(this, true)} />
        </View>, [setVisible])

    return (
        <View>
            <OverflowMenu
                placement='bottom end'
                appearance='noDivider'
                visible={visible}
                anchor={renderAnchor}
                onBackdropPress={setVisible.bind(this, false)}>
                {items}
            </OverflowMenu>
        </View>

    )
}

export default HeaderOverflowMenu

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