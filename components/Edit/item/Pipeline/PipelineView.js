import React from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'
import { Layout } from '@ui-kitten/components'
import { androidStyle } from '../../../../styles/GlobalStyle'
import { pipeMaterials, pipeProducts, pipeCoating, pipeDiameterList } from '../../../../constants/constants'
import RadioCoatingField from './RadioCoatingField'

const PipelineView = (props) => {
    return (
        <Layout style={androidStyle.ConnectionCard}>
            <InputField
                property='name'
                maxLength={40}
                label='Name'
                placeholder={props.pipelineData.defaultName}
                value={props.pipelineData.name}
                valid={props.pipelineData.valid.name} />
            <InputField
                property='licenseNumber'
                valid={props.pipelineData.valid.licenseNumber}
                maxLength={40}
                label='Licence #'
                placeholder='e.g. 52622-12'
                value={props.pipelineData.licenseNumber} />
            <RadioCoatingField
                coated={props.pipelineData.coating}
                itemsList={pipeCoating} />
            <SelectField
                label='Material'
                property='material'
                selectedItem={props.pipelineData.material}
                itemsList={pipeMaterials}
                placeholder='Select material' />
            <SelectField
                label='Pipe size'
                property='nps'
                selectedItem={props.pipelineData.nps}
                itemsList={pipeDiameterList}
                placeholder='Select pipe diameter' />
            <SelectField
                label='Product'
                property='product'
                selectedItem={props.pipelineData.product}
                itemsList={pipeProducts}
                placeholder='Select product' />
            <InputField
                maxLength={300}
                multiline={true}
                valid={props.pipelineData.valid.comment}
                textAlignVertical={'top'}
                numberOfLines={3}
                label='Comments'
                value={props.pipelineData.comment}
                property='comment'
                placeholder='Type your comments here' />
        </Layout>
    )
}

export default PipelineView