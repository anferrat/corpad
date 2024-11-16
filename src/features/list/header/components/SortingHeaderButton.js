import React from 'react'
import SortingButton from './SortingButton'
import { useSorting } from '../hooks/useSorting'
import { SortingParameters } from '../../constants/constants'


const SortingHeaderButton = ({ itemType, openSheet }) => {
    const sorting = useSorting({ itemType })
    if (sorting !== null) {
        const { isIcon, value, arrowIcon } = SortingParameters[sorting]

        return <SortingButton
            isIcon={isIcon}
            value={value}
            arrowIcon={arrowIcon}
            onPress={openSheet} />
    }
    else
        return null
}


export default SortingHeaderButton
