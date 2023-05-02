import React, { useCallback } from 'react'
import { labels } from '../../../../../constants/constants'
import ToggleToken from '../../../../../components/ToggleToken'


const SubitemTypeSelectToken = ({ selected, type, toggleSubitemType }) => {
    const onPress = useCallback(() => toggleSubitemType(type), [toggleSubitemType, type])
    const title = labels[type].label
    const icon = `${type}-filled`
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