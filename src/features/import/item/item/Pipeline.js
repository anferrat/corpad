import React from 'react'
import Parameter from '../Parameter'

const PipelineView = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Parameter
                property='nps' />
            <Parameter
                property='licenseNumber' />
            <Parameter
                property='material' />
            <Parameter
                property='coating' />
            <Parameter
                property='product' />
            <Parameter
                property='comment' />
        </>
    )
}

export default PipelineView
