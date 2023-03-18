import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../Input'
import Select from '../Select'
import { pipeMaterials, pipeProducts, pipeDiameterList } from '../../../../../constants/constants'
import PipelineCoating from '../PipelineCoating'
import { globalStyle } from '../../../../../styles/styles'


const PL = ({ update, validate, data }) => {
    const { name, defaultName, valid, licenseNumber, coating, material, nps, product, comment } = data
    return (
        <View style={globalStyle.card}>
            <Input
                validate={validate}
                update={update}
                property='name'
                maxLength={40}
                label='Name'
                placeholder={defaultName}
                value={name}
                valid={valid.name} />
            <Input
                validate={validate}
                update={update}
                property='licenseNumber'
                valid={valid.licenseNumber}
                maxLength={40}
                label='Licence #'
                placeholder='e.g. 52622-12'
                value={licenseNumber} />
            <PipelineCoating
                update={update}
                coating={coating} />
            <Select
                style={styles.select}
                placeholderOption={true}
                update={update}
                label='Material'
                property='material'
                selectedIndex={material}
                itemList={pipeMaterials}
                placeholder='Select material' />
            <Select
                style={styles.select}
                placeholderOption={true}
                update={update}
                label='Pipe size'
                property='nps'
                selectedIndex={nps}
                itemList={pipeDiameterList}
                placeholder='Select pipe diameter' />
            <Select
                style={styles.select} F
                placeholderOption={true}
                update={update}
                label='Product'
                property='product'
                selectedIndex={product}
                itemList={pipeProducts}
                placeholder='Select product' />
            <Input
                validate={validate}
                update={update}
                maxLength={300}
                multiline={true}
                valid={valid.comment}
                textAlignVertical={'top'}
                numberOfLines={3}
                label='Comments'
                value={comment}
                property='comment'
                placeholder='Type your comments here' />
        </View>
    )
}

export default PL

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})