import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { globalStyle } from '../../../../styles/styles'
import LoadingView from '../../../../components/LoadingView'
import PL from './PL'
import AN from './AN'
import RE from './RE'


const SubitemView = ({ subitemIndex }) => {
    const subitemType = useSelector(state => state.importData.subitems[subitemIndex]?.type)
    return (
        <View style={globalStyle.card}>
            <SubitemSelector
                subitemType={subitemType} />
        </View>
    )
}

export default SubitemView

const SubitemSelector = ({ subitemType }) => {
    switch (subitemType) {
        case 'PL':
            return <PL />
        case 'AN':
            return <AN />
        case 'RE':
            return <RE />
        default:
            return <LoadingView loading={true} />
    }
}