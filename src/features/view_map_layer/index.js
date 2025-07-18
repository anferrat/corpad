import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import MapLayerListItem from './components/MapLayerListItem'
import { globalStyle } from '../../styles/styles'
import { CheckBox, Text } from '@ui-kitten/components'
import AddLayerButton from './components/AddLayerButton'
import BottomButton from '../../components/BottomButton'
import useMapLayers from './hooks/useMapLayers'
import EmptyMapLayerListComponent from './components/EmptyMapLayerListComponent'
import LoadingView from '../../components/LoadingView'
import useCalculatorOptions from './hooks/useCalculatorOptions'


export const ViewMapLayer = ({ navigateToEditMapLayer, goBack }) => {
    const {
        layers,
        visible,
        maxLayerNumberLimitReached,
        isPro,
        onEdit,
        onDelete,
        onToggle,
        onAddLayer,
        onGoTo
    } = useMapLayers({ navigateToEditMapLayer, goBack })
    const { isChecked, toggleCalculator } = useCalculatorOptions()
    return (
        <>
            <ScrollView>
                <View style={styles.card}>
                    <View style={styles.headerRow}>
                        <Text
                            appearance='hint'
                            category='label'>Calculator options</Text>
                    </View>
                    <CheckBox
                        onChange={toggleCalculator}
                        style={styles.checkbox}
                        checked={isChecked}
                    >Display calculator markers</CheckBox>
                </View>
                <View style={styles.card}>
                    <LoadingView loading={!visible}>
                        <View style={styles.headerRow}>
                            <Text
                                appearance='hint'
                                category='label'>Displayed map layers</Text>
                        </View>
                        {layers.length === 0 ?
                            <EmptyMapLayerListComponent /> :
                            layers.map(({ id, name, comment, color, width, visible, featureCount, mapRegion }, index) => <MapLayerListItem
                                disabled={!isPro}
                                key={id}
                                layerId={id}
                                width={width}
                                name={name}
                                index={index}
                                selected={visible}
                                color={color}
                                comment={comment}
                                featureCount={featureCount}
                                mapRegion={mapRegion}
                                onGoTo={onGoTo}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onSelect={onToggle}
                            />)}
                        <AddLayerButton
                            isPro={isPro}
                            inactive={maxLayerNumberLimitReached}
                            onPress={onAddLayer}
                        />

                    </LoadingView>
                </View>
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
    },
    checkbox: {
        flex: 1,
        marginBottom: 12,
        marginHorizontal: 12
    }
})