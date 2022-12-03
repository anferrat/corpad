import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RadioGroup, Radio, Text } from '@ui-kitten/components'
import SelectField from '../../components/Select'

const TemplateOptions = (props) => {
    const surveyItemList = React.useMemo(() => props.surveyList.map(survey => survey.name), [props.surveyList])
    return (
        <>
            <Text category='h6'>Choose template</Text>
            <RadioGroup
                onChange={props.setNotBlank}
                selectedIndex={props.notBlank}>
                <Radio><View>
                    <Text>Blank</Text>
                    <Text category={'s2'} appearance='hint'>Start empty survey with minimal data</Text>
                </View></Radio>
                <Radio><View>
                    <Text>Based on existing survey</Text>
                    <Text category={'s2'} appearance='hint'>Create duplicate of existing survey without readings</Text>
                </View>
                </Radio>
            </RadioGroup>
            <View style={!props.notBlank ? styles.hidden : {}}>
                <Text appearance={'hint'} category='s2'></Text>
                <SelectField
                    disabled={!props.notBlank}
                    placeholder='Select survey'
                    label='Base survey'
                    selectedItem={props.selectedSurvey}
                    selectAction={props.setSelectedSurvey}
                    itemsList={surveyItemList} />

            </View>
        </>
    )
}

export default React.memo(TemplateOptions)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        marginTop: 24,
    },
    hidden: {
        display: 'none'
    }
})
