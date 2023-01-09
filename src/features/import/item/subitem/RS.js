import React from 'react'
import Parameter from '../Parameter'
import PipelineSelect from './PipelineSelect'
import Potentials from './Potentials'

const RS = () => {
    return (
        <>
            <Parameter
                property='name' />
            <PipelineSelect />
            <Potentials />
            <Parameter
                property='nps' />
        </>
    )
}

export default RS
