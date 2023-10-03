import React from 'react'
import { StyleSheet } from 'react-native'
import useMapLayerData from '../hooks/useMapLayerData'
import { Geojson } from 'react-native-maps'
import { MapLayerStrokeColors } from '../../../styles/colors'
import { StrokeWidthValues } from '../../../styles/styles'
import { getActiveMapIcon, getMapIcon } from './native_icons/mapIcons'


const GeoJsonLayers = () => {
    const { layers } = useMapLayerData()

    return (
        <>
            {layers.filter(({ visible }) => Boolean(visible)).map(({ width, color, id, data }) =>
                <Geojson
                    onPress={() => console.log('ksksk')}
                    key={id}
                    image={getMapIcon()}
                    strokeColor={MapLayerStrokeColors[color]}
                    geojson={data}
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