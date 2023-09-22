import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { RadioGroup, Radio, Text, CheckBox } from '@ui-kitten/components'
import Select from '../../../components/Select'
import { primary } from '../../../styles/colors'


const accessory = {
    icon: 'file-outline'
}

const TemplateSelector = ({ surveyList, toggleTemplateSetting, isBlank, selectedSurveyindex, setSelectedSurveyIndex, surveyListLoading, includeAssets, setIncludeAssets }) => {
    const placeholder = surveyList.length > 0 ? 'Select survey' : 'No local surveys found'
    return (
        <>
            <Text
                category='h6'>
                Choose template
            </Text>
            <RadioGroup
                onChange={toggleTemplateSetting}
                selectedIndex={Number(!isBlank)}>
                <Radio>
                    <View>
                        <Text>Blank</Text>
                        <Text
                            category={'s2'}
                            appearance='hint'>
                            Create an empty survey with default items
                        </Text>
                    </View>
                </Radio>
                <Radio>
                    <View>
                        <Text>Based on existing survey</Text>
                        <Text
                            category={'s2'}
                            appearance='hint'>
                            Create a copy of existing survey without readings
                        </Text>
                    </View>
                </Radio>
            </RadioGroup>
            {!isBlank ?
                <View style={styles.selectView}>
                    {surveyListLoading ?
                        <View style={styles.selectLoadingView}>
                            <ActivityIndicator size='small' color={primary} />
                            <Text style={styles.loadingText} appearance='hint'>Loading survey list... </Text>
                        </View>
                        :
                        <Select
                            placeholder={placeholder}
                            accessory={accessory}
                            label='Base survey'
                            selectedIndex={selectedSurveyindex}
                            onSelect={setSelectedSurveyIndex}
                            itemList={surveyList} />
                    }
                    <CheckBox
                        checked={includeAssets}
                        onChange={setIncludeAssets}
                        style={styles.checkbox}>
                        Include images from existing survey
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
