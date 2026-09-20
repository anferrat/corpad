import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import useExportLabels from './hooks/useExportLabels'
import { globalStyle } from '../../../styles/styles'
import { Text } from '@ui-kitten/components'
import Display from './components/overview/Display'
import PropertyElement from './components/overview/PropertyElement'
import ViewContainer from './components/ViewContainer'
import LoadingView from '../../../components/LoadingView'
import BottomButton from '../../../components/BottomButton'
import { ExportFormatTypeLabeles, ExportItemPropertyLabels, ExportSubitemPropertyLabels, SubitemTypeLabels } from '../../../constants/labels'
import { SubitemTypeIconsFilled } from '../../../constants/icons'
import { translateSettings } from '../../../localization'


const Overview = ({ navigateToExportItem }) => {
    const {
        exportToSpreadsheet,
        itemTypeLabel,
        itemTypeIcon,
        sortingLabel,
        loading,
        showPotentials,
        referenceCellLabel,
        potentialTypeLabels,
        pipelineLabels,
        itemProperties,
        subitemProperties,
        potentialsGroupingLabel,
        groupPotentialsByPipeline,
        selectedSubitemTypes,
        showOther,
        includeAssets,
        assetOptionAvailable,
        exportType,
        sortingOptionAvailable,
        includeMapLayers,
        mapLayerOptionAvailable
    } = useExportLabels(navigateToExportItem)
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <Text
                        category='label'
                        style={styles.title}>
                         {translateSettings('itemProperties')}
                    </Text>
                    <Display
                         property={translateSettings('exportedItems') + ':'}>
                        <PropertyElement
                            icon={itemTypeIcon}
                            pack='cp'>
                            {itemTypeLabel}
                        </PropertyElement>
                    </Display>
                    <Display
                         property={translateSettings('format') + ':'}>
                        <PropertyElement>
                            {ExportFormatTypeLabeles[exportType]}
                        </PropertyElement>
                    </Display>

                    {assetOptionAvailable ?
                        <Display
                             property={translateSettings('includeImages') + ':'}>
                            <PropertyElement
                                icon={includeAssets ? 'checkmark' : 'close'}>
                                 {includeAssets ? translateSettings('yes') : translateSettings('no')}
                            </PropertyElement>
                        </Display> : null}
                    {mapLayerOptionAvailable ?
                        <Display
                             property={translateSettings('includeMapLayers') + ':'}>
                            <PropertyElement
                                icon={includeMapLayers ? 'checkmark' : 'close'}>
                                 {includeMapLayers ? translateSettings('yes') : translateSettings('no')}
                            </PropertyElement>
                        </Display> : null}
                    {sortingOptionAvailable ?
                        <Display
                             property={translateSettings('sorting') + ':'}>
                            <PropertyElement>
                                {sortingLabel}
                            </PropertyElement>
                        </Display> : null}
                    <Display
                         property={translateSettings('properties')}>
                        {itemProperties.map(property => (
                            <PropertyElement
                                key={property}>
                                {ExportItemPropertyLabels[property]}
                            </PropertyElement>
                        ))}
                    </Display>
                    <ViewContainer
                        hidden={!showPotentials}>
                        <LoadingView
                            style={styles.loadingContainer}
                            loading={loading}>
                            <Text
                                category='label'
                                style={styles.title}>
                                 {translateSettings('potentialsTitle')}
                            </Text>
                            <Display
                                 property={translateSettings('referenceCell')}>
                                <PropertyElement
                                    icon={'RE-filled'}
                                    pack='cp'>
                                    {referenceCellLabel}
                                </PropertyElement>
                            </Display>
                            <Display
                                 property={translateSettings('potentialTypes')}>
                                {potentialTypeLabels.map((label, index) => (
                                    <PropertyElement
                                        icon={'grid'}
                                        key={index}>
                                        {label}
                                    </PropertyElement>
                                ))}
                            </Display>
                            <Display
                                 property={translateSettings('readingTypes')}>
                                {selectedSubitemTypes.map(type => (
                                    <PropertyElement
                                        key={type}
                                        icon={SubitemTypeIconsFilled[type]}
                                        pack='cp'>
                                        {SubitemTypeLabels[type]}
                                    </PropertyElement>
                                ))}
                            </Display>
                            <Display
                                 property={translateSettings('groupedBy')}>
                                <PropertyElement>
                                    {potentialsGroupingLabel}
                                </PropertyElement>
                            </Display>
                            <ViewContainer
                                hidden={!groupPotentialsByPipeline}>
                                <Display
                                     property={translateSettings('pipelines')}>
                                    {pipelineLabels.map((name, index) => (
                                        <PropertyElement
                                            key={index}
                                            icon='PL-filled'
                                            pack='cp'>
                                            {name}
                                        </PropertyElement>
                                    ))}
                                </Display>
                            </ViewContainer>
                        </LoadingView>
                    </ViewContainer>
                    <ViewContainer
                        hidden={!showOther}>
                        <Text
                            category='label'
                            style={styles.title}>
                             {translateSettings('otherTitle')}
                        </Text>
                        <Display
                            property={translateSettings('exportProperties')}>
                            {subitemProperties.map(([type, property]) => (
                                <PropertyElement
                                    key={type + property}
                                    icon={SubitemTypeIconsFilled[type]}
                                    pack='cp'>
                                    {ExportSubitemPropertyLabels[property]}
                                </PropertyElement>
                            ))}
                        </Display>
                    </ViewContainer>
                </View>
            </ScrollView>
            <BottomButton
                onPress={exportToSpreadsheet}
                 title={translateSettings('export')}
                icon={'download'}
            />
        </>
    )
}

export default Overview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 13,
        marginBottom: 12
    },
    scrollView: {
        paddingBottom: 72
    },
    loadingContainer: {
        height: 100
    }
})
