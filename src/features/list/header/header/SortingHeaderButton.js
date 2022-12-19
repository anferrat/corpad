import React from 'react'
import { useSelector } from 'react-redux'
import SortingButton from '../components/SortingButton'
import { getListStateByType } from '../../../../helpers/functions'

const sortingDisplayIcons = [
    {
        iconText: 'A-Z',
        icon: null,
        direction: 'down'
    },
    {
        iconText: 'Z-A',
        icon: null,
        direction: 'down'
    },
    {
        iconText: null,
        icon: 'clock-outline',
        direction: 'down'
    },
    {
        iconText: null,
        icon: 'clock-outline',
        direction: 'up'
    },
    {
        iconText: null,
        icon: 'navigation-2-outline',
        direction: 'up'
    }
]



const SortingHeaderButton = (props) => {
    const sorting = useSelector(state => getListStateByType(props.dataType, state).settings.sorting ?? 0)
    const displaydIcon = sortingDisplayIcons[sorting]
    if (props.dataType === 'TEST_POINT')
        return <SortingButton
            icon={displaydIcon.icon}
            direction={displaydIcon.direction}
            onPress={props.openSheet}
            iconText={displaydIcon.iconText}
        />
    else
        return null
}


export default SortingHeaderButton
