import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import TextLine from '../../../../components/TextLine'
import Header from '../../components/Header'
import Divider from '../Divider'
import SelectTab from '../SelectTab'
import ResistivityLayerView from '../LayerResistivityLayerView'

const tabs = ['Average', 'Layers']

const SR = ({ data, onEdit }) => {
    const [displayedTab, setDisplayedTab] = useState(0)
    const { name, type, spacingUnit, resistivityUnit, layers, comment } = data
    const dividerVisible = layers.length > 0 || comment !== null
    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={dividerVisible} />
            <SelectTab
                visible={layers.length > 1}
                labels={tabs}
                selectedTabIndex={displayedTab}
                onPress={setDisplayedTab} />
            <View
                style={styles.layers}>
                {layers.length === 0 ?
                    null :
                    layers.map(({ spacing, resistanceToZero, resistivityToZero }, index) => {
                        return displayedTab === 0 ?
                            <ResistivityLayerView
                                key={'' + index + displayedTab}
                                startSpacing={0}
                                endSpacing={spacing}
                                spacingUnit={spacingUnit}
                                resistance={resistanceToZero}
                                resistivity={resistivityToZero}
                                resistivityUnit={resistivityUnit} /> :
                            <ResistivityLayerView
                                key={'' + index + displayedTab}
                                startSpacing={index === 0 ? 0 : layers[index - 1].spacing}
                                endSpacing={spacing}
                                spacingUnit={spacingUnit}
                                resistance={index === 0 ? resistanceToZero : layers[index - 1].resistanceToNext}
                                resistivity={index === 0 ? resistivityToZero : layers[index - 1].resistivityToNext}
                                resistivityUnit={resistivityUnit} />
                    })}
            </View>
            <TextLine title='Comment' value={comment} />
        </>
    )
}
export default SR


const styles = StyleSheet.create({
    errorView: {
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center'
    },
    layers: {
        marginTop: 12
    }
})