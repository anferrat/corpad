import React from 'react'
import Parameter from '../Parameter'
import Sides from './Sides'
import Hint from '../../../../components/Hint'

const SHUNT_SIDE_TYPES = ['PL', 'AN', 'OT']
const SH = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Sides
                sideTypes={SHUNT_SIDE_TYPES} />
            <Parameter
                property='factor' />
            <Parameter
                property='voltageDrop' />
            <Hint>
                Shunt current will be calculated after importing
            </Hint>
        </>
    )
}

export default SH