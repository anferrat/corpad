import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import MapLayerListItem from './components/MapLayerListItem'
import { globalStyle } from '../../styles/styles'
import { Text } from '@ui-kitten/components'
import AddLayerButton from './components/AddLayerButton'
import BottomButton from '../../components/BottomButton'
import useMapLayers from './hooks/useMapLayers'
import EmptyMapLayerListComponent from './components/EmptyMapLayerListComponent'
import LoadingView from '../../components/LoadingView'
import ExportHint from './components/ExportHint'


export const ViewMapLayer = ({ navigateToEditMapLayer, goBack }) => {
    const {
        layers,
        visible,
        onEdit,
        onDelete,
        onToggle,
        onAddLayer } = useMapLayers({ navigateToEditMapLayer })
    return (
        <>
            <ScrollView>
                <View style={styles.card}>
                    <LoadingView loading={!visible}>
                        <View style={styles.headerRow}>
                            <Text
                                appearance='hint'
                                category='label'>Displayed map layers</Text>
                        </View>
                        {layers.length === 0 ?
                            <EmptyMapLayerListComponent /> :
                            layers.map(({ id, name, comment, color, width, visible, featureCount }, index) => <MapLayerListItem
                                key={id}
                                layerId={id}
                                width={width}
                                name={name}
                                index={index}
                                selected={visible}
                                color={color}
                                comment={comment}
                                featureCount={featureCount}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onSelect={onToggle}
                            />)}

                        <AddLayerButton
                            onPress={onAddLayer}
                        />

                    </LoadingView>
                </View>
                <ExportHint />
            </ScrollView>
            <BottomButton
                onPress={goBack}
                title={'Back'}
                icon={'undo'}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    card: {
        ...globalStyle.card,
        padding: 0,
        minHeight: 100
    },
    headerRow: {
        paddingTop: 12,
        flexDirection: 'row',
        paddingLeft: 12,
        paddingBottom: 12
    },
    showHeader: {
        flexBasis: 50
    }
})