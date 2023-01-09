import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { globalStyle } from '../../../../styles/styles'
import LoadingView from '../../../../components/LoadingView'
import PL from './PL'
import AN from './AN'
import RE from './RE'
import CN from './CN'
import SH from './SH'
import BD from './BD'
import OT from './OT'
import RS from './RS'
import FC from './FC'
import IK from './IK'
import CT from './CT'


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
        case 'CN':
            return <CN />
        case 'SH':
            return <SH />
        case 'BD':
            return <BD />
        case 'OT':
            return <OT />
        case 'RS':
            return <RS />
        case 'FC':
            return <FC />
        case 'IK':
            return <IK />
        case 'CT':
            return <CT />
        default:
            return <LoadingView loading={true} />
    }
}