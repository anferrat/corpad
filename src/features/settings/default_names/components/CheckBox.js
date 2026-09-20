import React from 'react'
import { CheckBox as DefaultCheckBox } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { translateSettings } from '../../../../localization'

const CheckBox = ({ pipelineNameAsDefault, pipelineNameSettingActive, onChangePipelineNameSetting }) => {
    if (pipelineNameSettingActive)
        return (
            <DefaultCheckBox
                style={styles.visible}
                checked={pipelineNameAsDefault}
                onChange={onChangePipelineNameSetting}>
                {translateSettings('usePipelineName')}
            </DefaultCheckBox>
        )
    else return null

}

export default CheckBox

const styles = StyleSheet.create({
    visible: {
        paddingBottom: 12,
    }
})
