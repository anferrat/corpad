import React from 'react'
import PL from './subitems/PL'
import AN from './subitems/AN'
import RE from './subitems/RE'
import CN from './subitems/CN'
import SH from './subitems/SH'
import BD from './subitems/BD'
import RS from './subitems/RS'
import IK from './subitems/IK'
import FC from './subitems/FC'
import OT from './subitems/OT'
import CT from './subitems/CT'

const SubitemViewFactory = (props) => {
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
        case 'CT':
            return <CT {...props} />
        default:
            return null
    }
}

export default SubitemViewFactory