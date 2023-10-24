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
import { SubitemTypes } from '../../../../constants/global'
import SR from './subitems/SR'
import AB from './subitems/AB'

const SubitemViewFactory = (props) => {
    switch (props.type) {
        case SubitemTypes.PIPELINE:
            return <PL  {...props} />
        case SubitemTypes.ANODE:
            return <AN {...props} />
        case SubitemTypes.REFERENCE_CELL:
            return <RE {...props} />
        case SubitemTypes.COUPON:
            return <CN {...props} />
        case SubitemTypes.SHUNT:
            return <SH {...props} />
        case SubitemTypes.BOND:
            return <BD {...props} />
        case SubitemTypes.RISER:
            return <RS {...props} />
        case SubitemTypes.ISOLATION:
            return <IK {...props} />
        case SubitemTypes.STRUCTURE:
            return <FC {...props} />
        case SubitemTypes.TEST_LEAD:
            return <OT {...props} />
        case SubitemTypes.CIRCUIT:
            return <CT {...props} />
        case SubitemTypes.SOIL_RESISTIVITY:
            return <SR {...props} />
        case SubitemTypes.ANODE_BED:
            return <AB {...props} />
        default:
            return null
    }
}

export default SubitemViewFactory