import React from 'react'
import Hint from '../../../../components/Hint'
import Parameter from '../Parameter'
import Sides from './Sides'
import { translateImport } from '../../../../localization'

const ISOLATION_SIDE_TYPES = ['RS', 'FC']
const IK = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Sides
                sideTypes={ISOLATION_SIDE_TYPES} />
            <Parameter
                property='isolationType' />
            <Parameter
                property='shorted' />
            <Parameter
                property='current' />
            <Hint>
                {translateImport('item.isolationCurrentHint')}
            </Hint>
        </>
    )
}

export default IK
