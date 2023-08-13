import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import BottomButton from '../../components/BottomButton'
import CollapsibleView from './components/CollapsibleView'
import OptionCard from './components/OptionCard'
import useCreateSurvey from './hooks/useCreateSurvey'
import NameEditInput from './components/NameEditInput'
import TemplateSelector from './components/TemplateSelector'
import { control } from '../../styles/colors'

export const CreateSurvey = () => {
    const {
        name,
        nameValid,
        isCloud,
        isBlank,
        selectedSurveyIndex,
        surveyList,
        isSigned,
        surveyListLoading,
        visible,
        onChangeName,
        onEndEditingName,
        setDeviceBased,
        setCloudBased,
        toggleTemplateSetting,
        setSelectedSurveyIndex,
        createSurveyHandler,
        toggleView
    } = useCreateSurvey()
    return (
        <View
            style={styles.container}>
            <ScrollView
                bounces={false}
                contentContainerStyle={styles.mainView}>
                <NameEditInput
                    name={name}
                    nameValid={nameValid}
                    onChangeName={onChangeName}
                    onEndEditingName={onEndEditingName} />
                <View style={styles.surveyTypeView}>
                    <OptionCard
                        isCloudValue={false}
                        onPress={setDeviceBased}
                        icon='smartphone'
                        title='Device-based'
                        subtitle={`Survey is stored on your device inside app folder. Doesn't require internet.`}
                        selected={!isCloud} />
                    <OptionCard
                        hint={!isSigned ? '(Sign in required)' : null}
                        onPress={setCloudBased}
                        icon='cloud'
                        pack='cp'
                        title='Cloud-based'
                        subtitle='Survey is stored on your device, but also synced with your cloud storage. Requires internet and Google account.'
                        selected={isCloud} />
                </View>
                <CollapsibleView
                    visible={visible}
                    toggleView={toggleView}>
                    <TemplateSelector
                        surveyListLoading={surveyListLoading}
                        surveyList={surveyList}
                        toggleTemplateSetting={toggleTemplateSetting}
                        isBlank={isBlank}
                        selectedSurveyindex={selectedSurveyIndex}
                        setSelectedSurveyIndex={setSelectedSurveyIndex} />
                </CollapsibleView>
            </ScrollView >
            <BottomButton
                title='Create'
                icon='file-add-outline'
                onPress={createSurveyHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: control,
    },
    mainView: {
        padding: 12,
        paddingBottom: 72
    },
    surveyTypeView: {
        flexDirection: 'row',
        marginTop: 24,
    }
})