import React, { useCallback } from 'react'
import { MenuItem, Icon } from '@ui-kitten/components'
import { basic, danger, success, warning, primary } from '../../../../styles/colors'

const statusColors = {
    basic: basic,
    success: success,
    danger: danger,
    warning: warning
}

const FileListItemMenuItem = ({ disabled, title, icon, pack, onPress, status }) => {

    const renderIcon = useCallback((props) => <Icon {...props} name={icon} pack={pack} fill={status ? statusColors[status] : primary} />, [pack, icon])

    return (
        <MenuItem
            disabled={disabled}
            title={title}
            onPress={onPress}
            accessoryLeft={renderIcon} />
    )
}

export default FileListItemMenuItem