import React from 'react'
import PL from './Cards/PL'
import AN from './Cards/AN'
import RE from './Cards/RE'
import CN from './Cards/CN'
import SH from './Cards/SH'
import BD from './Cards/BD'
import RS from './Cards/RS'
import IK from './Cards/IK'
import FC from './Cards/FC'
import OT from './Cards/OT'

const CardView = (props) => {
    switch (props.type) {
        case 'PL':
            return <PL  {...props} />
        case 'AN':
            return <AN {...props} />
        case 'RE':
            return <RE {...props} />
        case 'CN':
            return <CN {...props} />
        case 'SH':
            return <SH {...props} />
        case 'BD':
            return <BD {...props} />
        case 'RS':
            return <RS {...props} />
        case 'IK':
            return <IK {...props} />
        case 'FC':
            return <FC {...props} />
        case 'OT':
            return <OT {...props} />
        default:
            return null
    }
}

export default CardView