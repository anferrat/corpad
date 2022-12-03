import React from 'react'
import SelectFieldDefault from '../SelectFieldDefault'
import SelectField from '../SelectField'
import { Layout } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import { pipeMaterials, pipeProducts, pipeDiameterList } from '../../../constants/constants'

const PipelineView = () => {
    return (
        <Layout style={globalStyle.card}>
            <SelectField
                property='name'
                label='Name' />
            <SelectField
                property='licenseNumber'
                label='Licence number'
                placeholder='Licence number' />
            <SelectFieldDefault
                label='Material'
                property='material'
                itemsList={pipeMaterials}
                placeholder='Select material' />
            <SelectFieldDefault
                label='Pipe size'
                property='nps'
                itemsList={pipeDiameterList}
                placeholder='Select pipe diameter' />
            <SelectFieldDefault
                label='Product'
                property='product'
                itemsList={pipeProducts}
                placeholder='Select product' />
            <SelectField
                label='Comments'
                property='comment'
                placeholder='Comments' />
        </Layout>
    )
}

export default PipelineView