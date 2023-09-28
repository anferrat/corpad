import React from 'react'
import { StyleSheet } from 'react-native'
import useMapLayerData from '../hooks/useMapLayerData'
import { Geojson } from 'react-native-maps'
import { MapLayerStrokeColors } from '../../../styles/colors'
import { StrokeWidthValues } from '../../../styles/styles'


const GeoJsonLayers = () => {
    const { layers, layerData } = useMapLayerData()
    const getData = (data) => {
        console.log(data)
        try {
            if (data)
                return JSON.parse(data)
            else return {
                type: 'FeatureCollection',
                features: []
            }
        }
        catch (er) {
            console.log('Error', er)
            return {
                type: 'FeatureCollection',
                features: []
            }
        }
    }
    return (
        <>
            {layers.map(({ width, color, id }) =>
                <Geojson
                    key={id}
                    strokeColor={MapLayerStrokeColors[color]}
                    geojson={getData(layerData[id])}
                    fillColor={MapLayerStrokeColors[color]}
                    strokeWidth={StrokeWidthValues[width]}
                />)}
        </>

    )
}

export default GeoJsonLayers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})