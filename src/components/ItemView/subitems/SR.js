import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import SelectTab from '../components/SelectTab'
import SoilResistivityLayerView from '../components/SoilResistivityLayerView'
import TextLine from '../../TextLine'

const tabs = ['Average', 'Layers']

const SR = ({ name, type, spacingUnit, resistivityUnit, layers, comment }) => {
    const [displayedTab, setDisplayedTab] = useState(0)
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <SelectTab
                visible={layers.length > 1}
                labels={tabs}
                selectedTabIndex={displayedTab}
                onPress={setDisplayedTab} />
            {layers.length === 0 ?
                null :
                <View
                    style={styles.layers}>
                    {layers.map(({ spacing, resistanceToZero, resistivityToZero }, index) => {
                        return displayedTab === 0 ?
                            <SoilResistivityLayerView
                                key={'' + index + displayedTab}
                                startSpacing={0}
                                endSpacing={spacing}
                                spacingUnit={spacingUnit}
                                resistance={resistanceToZero}
                                resistivity={resistivityToZero}
                                resistivityUnit={resistivityUnit} /> :
                            <SoilResistivityLayerView
                                key={'' + index + displayedTab}
                                startSpacing={index === 0 ? 0 : layers[index - 1].spacing}
                                endSpacing={spacing}
                                spacingUnit={spacingUnit}
                                resistance={index === 0 ? resistanceToZero : layers[index - 1].resistanceToNext}
                                resistivity={index === 0 ? resistivityToZero : layers[index - 1].resistivityToNext}
                                resistivityUnit={resistivityUnit} />
                    })}
                </View>}

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
        marginTop: 12,
        paddingHorizontal: 12
    }
})