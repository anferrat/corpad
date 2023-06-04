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
import { ExportItemPropertyLabels, ExportSubitemPropertyLabels, SubitemTypeLabels } from '../../../constants/labels'
import { SubitemTypeIconsFilled } from '../../../constants/icons'


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
    } = useExportLabels(navigateToExportItem)
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <Text
                        category='label'
                        style={styles.title}>
                        ITEM PROPERTIES
                    </Text>
                    <Display
                        property={'Exported items:'}>
                        <PropertyElement
                            icon={itemTypeIcon}
                            pack='cp'>
                            {itemTypeLabel}
                        </PropertyElement>
                    </Display>
                    <Display
                        property={'Sorting:'}>
                        <PropertyElement>
                            {sortingLabel}
                        </PropertyElement>
                    </Display>
                    <Display
                        property={'Properties:'}>
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
                                POTENTIALS
                            </Text>
                            <Display
                                property={'Reference cell:'}>
                                <PropertyElement
                                    icon={'RE-filled'}
                                    pack='cp'>
                                    {referenceCellLabel}
                                </PropertyElement>
                            </Display>
                            <Display
                                property={'Potential types:'}>
                                {potentialTypeLabels.map((label, index) => (
                                    <PropertyElement
                                        icon={'grid'}
                                        key={index}>
                                        {label}
                                    </PropertyElement>
                                ))}
                            </Display>
                            <Display
                                property={'Reading types:'}>
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
                                property={'Grouped by:'}>
                                <PropertyElement>
                                    {potentialsGroupingLabel}
                                </PropertyElement>
                            </Display>
                            <ViewContainer
                                hidden={!groupPotentialsByPipeline}>
                                <Display
                                    property={'Pipelines:'}>
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
                            OTHER
                        </Text>
                        <Display
                            property={'Properties: '}>
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
                title={'Export'}
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