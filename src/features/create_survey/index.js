import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import BottomButton from '../../components/BottomButton'
import CollapsibleView from './components/CollapsibleView'
import OptionCard from './components/OptionCard'
import useCreateSurvey from './hooks/useCreateSurvey'
import NameEditInput from './components/NameEditInput'
import TemplateSelector from './components/TemplateSelector'
import { control } from '../../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { translateCreateSurvey } from '../../localization'

export const CreateSurvey = ({ withImport, navigateToImport }) => {
    const {
        name,
        nameValid,
        isCloud,
        isBlank,
        selectedSurveyIndex,
        surveyList,
        creating,
        isSigned,
        surveyListLoading,
        visible,
        includeAssets,
        optionsAvailable,
        assetOptionAvailable,
        setIncludeAssets,
        onChangeName,
        onEndEditingName,
        setDeviceBased,
        setCloudBased,
        toggleTemplateSetting,
        setSelectedSurveyIndex,
        createSurveyHandler,
        toggleView
    } = useCreateSurvey(withImport, navigateToImport)
    const insets = useSafeAreaInsets()
    return (
        <View
            style={styles.container}>
            <ScrollView
                bounces={false}
                contentContainerStyle={[styles.mainView, { paddingBottom: insets.bottom + 84 }]}>
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
                         title={translateCreateSurvey('deviceBased')}
                         subtitle={translateCreateSurvey('deviceBasedDescription')}
                        selected={!isCloud} />
                    <OptionCard
                         hint={!isSigned ? translateCreateSurvey('signInRequired') : null}
                        onPress={setCloudBased}
                        icon='cloud'
                        pack='cp'
                         title={translateCreateSurvey('cloudBased')}
                         subtitle={translateCreateSurvey('cloudBasedDescription')}
                        selected={isCloud} />
                </View>
                {optionsAvailable ?
                    <CollapsibleView
                        visible={visible}
                        toggleView={toggleView}>
                        <TemplateSelector
                            surveyListLoading={surveyListLoading}
                            surveyList={surveyList}
                            includeAssets={includeAssets}
                            assetOptionAvailable={assetOptionAvailable}
                            setIncludeAssets={setIncludeAssets}
                            toggleTemplateSetting={toggleTemplateSetting}
                            isBlank={isBlank}
                            selectedSurveyindex={selectedSurveyIndex}
                            setSelectedSurveyIndex={setSelectedSurveyIndex} />
                    </CollapsibleView> :
                    null}
            </ScrollView >
            <BottomButton
                 title={withImport ? translateCreateSurvey('next') : translateCreateSurvey('create')}
                icon={creating ? 'loading' : (withImport ? 'arrow-circle-right' : 'file-add-outline')}
                iconPosition={withImport ? 'right' : 'left'}
                disabled={creating}
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
    },
    surveyTypeView: {
        flexDirection: 'row',
        marginTop: 24,
    }
})
