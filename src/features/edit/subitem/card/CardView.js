import React from 'react'
import PL from './cards/PL'
import AN from './cards/AN'
import RE from './cards/RE'
import CN from './cards/CN'
import SH from './cards/SH'
import BD from './cards/BD'
import RS from './cards/RS'
import IK from './cards/IK'
import FC from './cards/FC'
import OT from './cards/OT'

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