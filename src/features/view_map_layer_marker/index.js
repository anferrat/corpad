import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import useMapLayerMarkerView from './hooks/useMapLayerMarkerView'
import { globalStyle } from '../../styles/styles'
import PropertyRow from './components/PropertyRow'
import { basic400 } from '../../styles/colors'
import Labels from './components/Labels'
import Title from './components/Title'
import BottomButton from '../../components/BottomButton'
import EmptyPropertyListComponent from './components/EmptyPropertyListComponent'

const MapLayerMarkerView = ({ layerId, markerIndex, goBack }) => {
    const { name, layerName, properties, layerColor } = useMapLayerMarkerView(layerId, markerIndex)
    const count = Object.keys(properties).length
    
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View
                    style={globalStyle.card}>
                    <Title
                        markerName={name}
                        layerName={layerName}
                        color={layerColor} />
                    <View
                        style={styles.container}>
                        <Labels />
                        {count === 0 ?
                            <EmptyPropertyListComponent /> :
                            Object.keys(properties).map((property, index) =>
                                <PropertyRow
                                    key={index}
                                    isEven={Boolean(index % 2)}
                                    property={property}
                                    value={properties[property]} />
                            )}
                    </View>
                </View>

            </ScrollView>
            <BottomButton
                icon='undo'
                title='Back'
                onPress={goBack}
            />
        </>
    )
}

export default MapLayerMarkerView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: basic400,
        overflow: 'hidden'
    },
    scrollView: {
        paddingBottom: 72
    }
})