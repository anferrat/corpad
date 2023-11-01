import React from 'react'
import { CheckBox as DefaultCheckBox } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const CheckBox = ({ pipelineNameAsDefault, pipelineNameSettingActive, onChangePipelineNameSetting }) => {
    if (pipelineNameSettingActive)
        return (
            <DefaultCheckBox
                style={styles.visible}
                checked={pipelineNameAsDefault}
                onChange={onChangePipelineNameSetting}>
                Use pipeline name as default name for pipeline test leads and risers
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