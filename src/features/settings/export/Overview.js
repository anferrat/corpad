import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import useExportLabels from './hooks/useExportLabels'
import { globalStyle } from '../../../styles/styles'
import { Text } from '@ui-kitten/components'
import Display from './components/overview/Display'
import PropertyElement from './components/overview/PropertyElement'
import ViewContainer from './components/ViewContainer'
import { itemPropertyLabels, subitemPropertyLabels } from './constants/constants'
import LoadingView from '../../../components/LoadingView'
import { labels } from '../../../constants/constants'
import BottomButton from '../../../components/BottomButton'


const Overview = () => {
    const {
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
    } = useExportLabels()
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
                        property={'Exported item type:'}>
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
                            <PropertyElement key={property}>
                                {itemPropertyLabels[property]}
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
                                        icon={type + '-filled'}
                                        pack='cp'>
                                        {labels[type].label}
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
                    <ViewContainer hidden={!showOther}>
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
                                    icon={type + '-filled'}
                                    pack='cp'>
                                    {subitemPropertyLabels[property]}
                                </PropertyElement>
                            ))}
                        </Display>
                    </ViewContainer>
                </View>
            </ScrollView>
            <BottomButton
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