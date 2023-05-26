import React, { useCallback } from 'react'
import ToggleToken from '../../../../../components/ToggleToken'
import { SubitemTypeLabels } from '../../../../../constants/labels'
import { SubitemTypeIconsFilled } from '../../../../../constants/icons'


const SubitemTypeSelectToken = ({ selected, type, toggleSubitemType }) => {
    const onPress = useCallback(() => toggleSubitemType(type), [toggleSubitemType, type])
    const title = SubitemTypeLabels[type]
    const icon = SubitemTypeIconsFilled[type]
    return (
        <ToggleToken
            pack='cp'
            icon={icon}
            title={title}
            onPress={onPress}
            checked={selected}
        />
    )
}

export default SubitemTypeSelectToken