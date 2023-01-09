import React from 'react'
import Hint from '../../../../components/Hint'
import Parameter from '../Parameter'
import Sides from './Sides'

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
                Shorting current value for an isolation reading will not be imported, if imported shorted property for this reading equals "No".
            </Hint>
        </>
    )
}

export default IK