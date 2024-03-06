import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useExternalLink } from './hooks/useExternalLink'
import { ItemView } from '../../../../components/ItemView'
import { globalStyle } from '../../../../styles/styles'
import BottomButton from '../../../../components/BottomButton'
import LoadingView from '../../../../components/LoadingView'
import ControlButtons from './components/ControlButtons'
import Header from './components/Header'

export const ExternalLinkView = ({ link, navigateToFindItem, navigateToPipelineMatching, goBack, navigateToItem, navigateToSurvey }) => {
    const { item, pipelines, potentialUnit, linkType, isSurveyLoaded, loading, isCreating, goToFindInSurvey, addToSurvey } = useExternalLink({ link, navigateToFindItem, navigateToPipelineMatching, goBack, navigateToItem, navigateToSurvey })

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.container}>
                <View
                    style={styles.header}>
                    <Header
                        linkType={linkType} />
                    <ControlButtons
                        isCreating={isCreating}
                        isSurveyLoaded={isSurveyLoaded}
                        loading={loading}
                        goToFindInSurvey={goToFindInSurvey}
                        addToSurvey={addToSurvey} />
                </View>
                <Text
                    appearance='hint'
                    category='h6'
                    style={styles.label}>
                    {loading ? 'Loading...' : 'Data'}
                </Text>
                <View
                    style={styles.itemView}>
                    <LoadingView
                        loading={loading}>
                        <ItemView
                            item={item}
                            pipelines={pipelines}
                            potentialUnit={potentialUnit} />
                    </LoadingView>
                </View>
            </ScrollView>
            <BottomButton
                disabled={isCreating}
                onPress={goBack}
                title='Back'
                icon='undo'
            />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        ...globalStyle.card,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        flex: 0,
        paddingBottom: 72
    },

    itemView: {
        ...globalStyle.card_noPadding,
        minHeight: 200
    },
    label: {
        paddingHorizontal: 12,
        paddingTop: 12,
    }
})