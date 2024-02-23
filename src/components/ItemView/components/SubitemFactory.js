import React from 'react'
import { SubitemTypes } from '../../../constants/global'
import AN from '../subitems/AN'
import AB from '../subitems/AB'
import BD from '../subitems/BD'
import CT from '../subitems/CT'
import CN from '../subitems/CN'
import IK from '../subitems/IK'
import PL from '../subitems/PL'
import RE from '../subitems/RE'
import RS from '../subitems/RS'
import SH from '../subitems/SH'
import SR from '../subitems/SR'
import FC from '../subitems/FC'
import OT from '../subitems/OT'


const SubitemFactory = (props) => {
    const { type } = props
    switch (type) {
        case SubitemTypes.ANODE:
            return <AN {...props} />
        case SubitemTypes.ANODE_BED:
            return <AB {...props} />
        case SubitemTypes.BOND:
            return <BD {...props} />
        case SubitemTypes.CIRCUIT:
            return <CT {...props} />
        case SubitemTypes.COUPON:
            return <CN {...props} />
        case SubitemTypes.ISOLATION:
            return <IK {...props} />
        case SubitemTypes.PIPELINE:
            return <PL {...props} />
        case SubitemTypes.REFERENCE_CELL:
            return <RE {...props} />
        case SubitemTypes.RISER:
            return <RS {...props} />
        case SubitemTypes.SHUNT:
            return <SH {...props} />
        case SubitemTypes.SOIL_RESISTIVITY:
            return <SR {...props} />
        case SubitemTypes.STRUCTURE:
            return <FC {...props} />
        case SubitemTypes.TEST_LEAD:
            return <OT {...props} />
        default:
            return null
    }

}

export default SubitemFactory