import { Layout } from '@ui-kitten/components'
import React from 'react'
import { androidStyle } from '../../../styles/GlobalStyle'
import AN from './Cards/AN'
import PL from './Cards/PL'
import RE from './Cards/RE'
import CN from './Cards/CN'
import SH from './Cards/SH'
import BD from './Cards/BD'
import OT from './Cards/OT'
import RS from './Cards/RS'
import FC from './Cards/FC'
import IK from './Cards/IK'

const cardWrap = (card) => <Layout style={androidStyle.ConnectionCard}>{card}</Layout>

export default CardView = (props) => {
    switch (props.cardData.type) {
        case 'AN':
            return cardWrap(<AN  {...props} />)
        case 'PL':
            return cardWrap(<PL  {...props} />)
        case 'RE':
            return cardWrap(<RE  {...props} />)
        case 'CN':
            return cardWrap(<CN  {...props} />)
        case 'SH':
            return cardWrap(<SH  {...props} />)
        case 'BD':
            return cardWrap(<BD  {...props} />)
        case 'OT':
            return cardWrap(<OT  {...props} />)
        case 'RS':
            return cardWrap(<RS  {...props} />)
        case 'FC':
            return cardWrap(<FC {...props} />)
        case 'IK':
            return cardWrap(<IK  {...props} />)
        default:
            return null
    }
}




/*








    */