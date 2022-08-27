import React from 'react'
import { testPointTypes, testPointTypeCodes, labels } from '../../constants/constants'
import { useSelector } from 'react-redux'
import TopBarTitle from '../_Stateless/TopBarTitle'

const subtitleHandler = (dataType, subType = undefined) => { // function duplicate - to be removed
    switch (dataType) {
        case 'TEST_POINT':
            return testPointTypes[subType]
        case 'RECTIFIER':
            return 'Rectifier'
        case 'PIPELINE':
            return 'Pipeline'
        case 'CARD':
            return labels[subType]?.label ?? 'Error'
        case 'CIRCUIT':
            return 'Circuit'
    }
}

const iconHandler = (dataType, subType = undefined) => { // function duplicate - to be removed
    switch (dataType) {
        case 'TEST_POINT':
            return testPointTypeCodes[subType]
        case 'RECTIFIER':
            return 'RT'
        case 'PIPELINE':
            return 'PL'
        case 'CARD':
            return subType
        case 'CIRCUIT':
            return 'CT'
    }
}

const Title = (props) => {
    const title = useSelector(state => {
        const titleState = props.dataType === 'CARD' || props.dataType === 'CIRCUIT' ? state.subitem : state.item.edit
           return (titleState?.name === null || titleState?.name === '') ? titleState?.defaultName : titleState?.name ?? 'Error'
    })
    const subType = useSelector(state => (props.dataType !== 'CARD' ? state.item.edit?.testPointType : state.subitem.type) ?? 'Error')
    return (
        <TopBarTitle
            iconName={iconHandler(props.dataType, subType)}
            cp={true}
            subtitle={subtitleHandler(props.dataType, subType)}
            title={title} />
    )
}
export default Title