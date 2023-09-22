import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { CheckBox, RadioGroup, Text } from '@ui-kitten/components'
import Radio from './components/Radio'
import { globalStyle } from '../../../styles/styles'
import Title from './components/Title'
import BottomButton from '../../../components/BottomButton'
import useExportPotentialProperties from './hooks/useExportPotentialProperties'
import ReferenceCellSelector from './components/potentials/ReferenceCellSelector'
import PotentialTypeSelector from './components/potentials/PotentialTypeSelector'
import SubitemTypeSelector from './components/potentials/SubitemTypeSelector'
import LoadingView from '../../../components/LoadingView'
import ViewContainer from './components/ViewContainer'
import PipelineSelector from './components/potentials/PipelineSelector'
import CheckBoxText from './components/potentials/CheckBoxText'


const subitemTypes = ['PL', 'RS', 'AN', 'CN', 'OT', 'FC', 'RE']

const PotentialProperties = ({ navigateToExportSubitems }) => {
    const {
        loading,
        exportPotentials,
        toggleExportPotentials,
        referenceCells,
        referenceCellId,
        selectReferenceCell,
        potentialTypes,
        togglePotentialType,
        potentialTypeIdList,
        selectedSubitemTypes,
        toggleSubitemType,
        pipelineIdList,
        togglePipeline,
        onChangePipelineGrouping,
        pipelineGrouping,
        pipelines,
        pipelineGroupingActive,
        onNextPress
    } = useExportPotentialProperties(navigateToExportSubitems)
    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <CheckBox
                        checked={exportPotentials}
                        onChange={toggleExportPotentials}>
                        <CheckBoxText>Export potentials</CheckBoxText>
                    </CheckBox>
                    <ViewContainer hidden={!exportPotentials}>
                        <View style={styles.content}>
                            <LoadingView loading={loading}>
                                <ViewContainer
                                    hidden={referenceCells.length === 1}>
                                    <Title
                                        name={'REFERENCE CELL'} />
                                    <ReferenceCellSelector
                                        referenceCellId={referenceCellId}
                                        referenceCells={referenceCells}
                                        selectReferenceCell={selectReferenceCell} />
                                </ViewContainer>
                                <Title
                                    name={'POTENTIAL TYPES'} />
                                <PotentialTypeSelector
                                    potentialTypes={potentialTypes}
                                    potentialTypeIdList={potentialTypeIdList}
                                    togglePotentialType={togglePotentialType} />

                                <Title
                                    name={'READING TYPES'} />
                                <SubitemTypeSelector
                                    subitemTypes={subitemTypes}
                                    selectedSubitemTypes={selectedSubitemTypes}
                                    toggleSubitemType={toggleSubitemType} />
                                <Title
                                    name={'POTENTIALS GROUPING'} />
                                <RadioGroup
                                    style={styles.groupingContainer}
                                    onChange={onChangePipelineGrouping}
                                    selectedIndex={pipelineGrouping}>
                                    <Radio>Group by reading type</Radio>
                                    <Radio
                                        disabled={!pipelineGroupingActive}
                                    >Group by pipeline</Radio>
                                </RadioGroup>
                                <ViewContainer
                                    hidden={!pipelineGrouping}>
                                    <Title
                                        name={'PIPELINES'} />
                                    <PipelineSelector
                                        pipelines={pipelines}
                                        pipelineIdList={pipelineIdList}
                                        togglePipeline={togglePipeline} />
                                </ViewContainer>
                            </LoadingView>
                        </View>
                    </ViewContainer>
                </View>
            </ScrollView>
            <BottomButton
                iconPosition={'right'}
                icon={'arrow-circle-right'}
                onPress={onNextPress}
                title={'Next'} />
        </>
    )
}

export default PotentialProperties

const styles = StyleSheet.create({
    itemSelector: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 12
    },
    tokens: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    radioGroup: {
        marginBottom: 12
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 12
    },
    pipelinePotentialContainer: {
        marginLeft: 12
    },
    container: StyleSheet.compose(globalStyle.card, {
        minHeight: 80,
        justifyContent: 'center'
    }),
    content: {
        marginTop: 24
    },
    scrollView: {
        paddingBottom: 72
    },
    groupingContainer: {
        marginBottom: 12
    }
})