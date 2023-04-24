import React from 'react'
import { OverflowMenu, } from '@ui-kitten/components'
import { View } from 'react-native'
import { basic } from '../../../styles/colors'
import IconButton from '../../../components/IconButton'


const FileListItemMenu = ({ children, showMenu, hideMenu, visible }) => {

    const renderAnchor = React.useCallback(() =>
        <View>
            <IconButton
                color={basic}
                iconName='more-vertical'
                onPress={showMenu} />
        </View>,
        [showMenu])

    return (
        <View>
            <OverflowMenu
                placement={'left start'}
                appearance='noDivider'
                visible={visible}
                anchor={renderAnchor}
                onBackdropPress={hideMenu}>
                {children}
            </OverflowMenu>
        </View>

    )
}

export default FileListItemMenu