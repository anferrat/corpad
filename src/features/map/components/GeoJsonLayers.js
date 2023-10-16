import React from 'react'
import { StyleSheet } from 'react-native'
import useMapLayerData from '../hooks/useMapLayerData'
import { Geojson } from 'react-native-maps'
import { MapLayerStrokeColors, MapLayerFillColors } from '../../../styles/colors'
import { StrokeWidthValues } from '../../../styles/styles'
import { getPointIcon } from './native_icons/mapIcons'
import MapLayerPointMarker from './markers/MapLayerPointMarker'
import ActiveMapLayerPointMarker from './markers/ActiveMapLayerPointMarker'


const GeoJsonLayers = () => {
    const { layers,
        activeMarkerLayerId,
        activeMarkerIndex,
        activeMarkerColor,
        activeMarkerLatitude,
        activeMarkerLongitude,
        onMapLayerMarkerPress } = useMapLayerData()
    return (
        <>
            <ActiveMapLayerPointMarker
                layerId={activeMarkerLayerId}
                color={activeMarkerColor}
                latitude={activeMarkerLatitude}
                longitude={activeMarkerLongitude}
            />
            {layers.filter(({ visible }) => Boolean(visible)).map(({ width, color, id, data, points, name }) => {
                return <React.Fragment
                    key={id}>
                    {points.map((point, index) => {
                        return <MapLayerPointMarker
                            key={`Layer_${id}_index${index}`}
                            active={activeMarkerLayerId === id && index === activeMarkerIndex}
                            latitude={point.latitude}
                            longitude={point.longitude}
                            color={color}
                            onPress={onMapLayerMarkerPress}
                            layerId={id}
                            layerName={name}
                            index={index}
                            name={point.name}
                        />
                    }
                    )}
                    <Geojson
                        image={getPointIcon(false, color)}
                        strokeColor={MapLayerStrokeColors[color]}
                        geojson={data}
                        fillColor={MapLayerFillColors[color]}
                        strokeWidth={StrokeWidthValues[width]} />
                </React.Fragment>
            }
            )}
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