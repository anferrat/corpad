import React from 'react'
import Parameter from '../Parameter'

const CT = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Parameter
                property='current' />
            <Parameter
                property='voltage' />
            <Parameter
                property='targetMin' />
            <Parameter
                property='targetMax' />
        </>
    )
}

export default CT