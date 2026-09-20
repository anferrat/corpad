import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { RadioGroup, Radio, Text, CheckBox } from '@ui-kitten/components'
import Select from '../../../components/Select'
import { primary } from '../../../styles/colors'
import { translateCreateSurvey } from '../../../localization'


const accessory = {
    icon: 'file-outline'
}

const TemplateSelector = ({ surveyList, toggleTemplateSetting, isBlank, selectedSurveyindex, setSelectedSurveyIndex, surveyListLoading, includeAssets, setIncludeAssets, assetOptionAvailable }) => {
    const placeholder = surveyList.length > 0 ? translateCreateSurvey('selectSurvey') : translateCreateSurvey('noLocalSurveys')
    return (
        <>
            <Text
                category='h6'>
                {translateCreateSurvey('chooseTemplate')}
            </Text>
            <RadioGroup
                onChange={toggleTemplateSetting}
                selectedIndex={Number(!isBlank)}>
                <Radio>
                    <View>
                        <Text>{translateCreateSurvey('blank')}</Text>
                        <Text
                            category={'s2'}
                            appearance='hint'>
                            {translateCreateSurvey('blankDescription')}
                        </Text>
                    </View>
                </Radio>
                <Radio>
                    <View>
                        <Text>{translateCreateSurvey('existingSurvey')}</Text>
                        <Text
                            category={'s2'}
                            appearance='hint'>
                            {translateCreateSurvey('existingSurveyDescription')}
                        </Text>
                    </View>
                </Radio>
            </RadioGroup>
            {!isBlank ?
                <View style={styles.selectView}>
                    {surveyListLoading ?
                        <View style={styles.selectLoadingView}>
                            <ActivityIndicator size='small' color={primary} />
                            <Text style={styles.loadingText} appearance='hint'>{translateCreateSurvey('loadingSurveyList')} </Text>
                        </View>
                        :
                        <Select
                            placeholder={placeholder}
                            accessory={accessory}
                             label={translateCreateSurvey('baseSurvey')}
                            selectedIndex={selectedSurveyindex}
                            onSelect={setSelectedSurveyIndex}
                            itemList={surveyList} />
                    }
                    <CheckBox
                        disabled={!assetOptionAvailable}
                        checked={includeAssets}
                        onChange={setIncludeAssets}
                        style={styles.checkbox}>
                        {translateCreateSurvey('includeImages')}
                    </CheckBox>
                </View> :
                null}
        </>
    )
}

export default React.memo(TemplateSelector)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        marginTop: 24,
    },
    selectLoadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        marginTop: 12
    },
    selectView: {

    },
    loadingText: {
        marginLeft: 12
    },
    checkbox: {
        marginTop: 12
    }
})
