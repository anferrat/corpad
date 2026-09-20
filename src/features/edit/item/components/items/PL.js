import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../Input'
import Select from '../Select'
import PipelineCoating from '../PipelineCoating'
import { globalStyle } from '../../../../../styles/styles'
import { PipelineMaterials, PipelineProducts, PipeDiameters } from '../../../../../constants/global'
import { PipeDiameterLabels, PipelineMaterialLabels, PipelineProductLabels } from '../../../../../constants/labels'

const PL = ({ update, validate, data }) => {
    const { name, defaultName, valid, licenseNumber, coating, material, nps, product, comment } = data
    const pipeMaterials = React.useMemo(() => Object.values(PipelineMaterials).map(material => ({ item: PipelineMaterialLabels[material], index: material })), [])
    const pipeProducts = React.useMemo(() => Object.values(PipelineProducts).map(product => ({ item: PipelineProductLabels[product], index: product })), [])
    const pipeDiameters = React.useMemo(() => Object.values(PipeDiameters).map(diameter => ({ item: PipeDiameterLabels[diameter], index: diameter })), [])
    return (
        <View style={globalStyle.card}>
            <Input
                validate={validate}
                update={update}
                property='name'
                maxLength={40}
                placeholder={defaultName}
                value={name}
                valid={valid.name} />
            <Input
                validate={validate}
                update={update}
                property='licenseNumber'
                valid={valid.licenseNumber}
                maxLength={40}
                value={licenseNumber} />
            <PipelineCoating
                update={update}
                coating={coating} />
            <Select
                style={styles.select}
                placeholderOption={true}
                update={update}
                property='material'
                selectedIndex={material}
                itemList={pipeMaterials}
                />
            <Select
                style={styles.select}
                placeholderOption={true}
                update={update}
                property='nps'
                selectedIndex={nps}
                itemList={pipeDiameters}
                />
            <Select
                style={styles.select}
                placeholderOption={true}
                update={update}
                property='product'
                selectedIndex={product}
                itemList={pipeProducts}
                />
            <Input
                validate={validate}
                update={update}
                maxLength={300}
                multiline={true}
                valid={valid.comment}
                textAlignVertical={'top'}
                numberOfLines={3}
                value={comment}
                property='comment'
                />
        </View>
    )
}

export default PL

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})
