import React from 'react'
import Parameter from '../Parameter'
import Sides from './Sides'

const BOND_SIDE_TYPES = ['PL', 'AN', 'RS', 'FC']
const BD = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Sides
                sideTypes={BOND_SIDE_TYPES} />
            <Parameter
                property='current' />
        </>
    )
}

export default BD