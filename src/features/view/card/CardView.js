import React from 'react'
import { Layout } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import AN from './cards/AN'
import PL from './cards/PL'
import RE from './cards/RE'
import CN from './cards/CN'
import SH from './cards/SH'
import BD from './cards/BD'
import OT from './cards/OT'
import RS from './cards/RS'
import FC from './cards/FC'
import IK from './cards/IK'

const cardWrap = (card) => <Layout style={globalStyle.card}>{card}</Layout>

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