import React from 'react'
import { CheckBox as DefaultCheckBox } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const CheckBox = ({ pipelineNameAsDefault, pipelineNameSettingActive, onChangePipelineNameSetting }) => {
    return (
        <DefaultCheckBox
            style={pipelineNameSettingActive ? styles.visible : styles.hidden}
            checked={pipelineNameAsDefault}
            onChange={onChangePipelineNameSetting}>
            Use pipeline name as default name for pipeline test leads and risers
        </DefaultCheckBox>
    )

}

export default CheckBox

const styles = StyleSheet.create({
    visible: {
        paddingBottom: 12,
    },
    hidden: {
        display: 'none'
    }
})