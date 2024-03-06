import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { globalStyle } from '../../../../styles/styles'
import BottomButton from '../../../../components/BottomButton'
import usePipelineMatching from './hooks/usePipelineMatching'
import { Text } from '@ui-kitten/components'
import MatchItem from './components/MatchItem'
import LoadingView from '../../../../components/LoadingView'
import Header from './components/Header'


const PipelineMatching = ({ goBack, link, navigateToItem, navigateToSurvey }) => {
    const {
        pipelineItemList,
        pipelineItemAccessoryList,
        assignedIndexes,
        sourcePipelines,
        isLoading,
        isCreating,
        onSelect,
        onSubmit
    } = usePipelineMatching({ link, goBack, navigateToItem, navigateToSurvey })
    return (
        <>
            <ScrollView
                style={styles.scrollView}>
                <View
                    style={styles.container}>
                    <LoadingView
                        loading={isLoading}>
                        <Text
                            style={styles.hint}
                            category='s2'
                            appearance='hint'>
                            Match pipelines from the link to pipelines in the current survey.</Text>
                        <Header />
                        {sourcePipelines.map(({ name, uid }, index) =>
                            <MatchItem
                                key={uid}
                                title={name}
                                titleIndex={index}
                                itemList={pipelineItemList}
                                accessoryList={pipelineItemAccessoryList}
                                selectedIndex={assignedIndexes[index]}
                                onSelect={onSelect}
                            />)}
                    </LoadingView>
                </View>
            </ScrollView>
            <BottomButton
                disabled={isCreating}
                title={'Done'}
                icon={'checkmark'}
                onPress={onSubmit}
            />
        </>
    )
}

export default PipelineMatching

const styles = StyleSheet.create({
    container: {
        ...globalStyle.card,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100
    },
    scrollView: {
        paddingBottom: 72
    },
    hint: {
        paddingBottom: 24,
        textAlign: 'center'
    }
})