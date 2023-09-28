import { CheckBox, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MapLayerFeatureLabels } from '../../../constants/labels'
import ToggleToken from '../../../components/ToggleToken'


const FeatureCheckBox = ({ feature, onChange, checked }) => {
    const onChangeHandler = React.useCallback(() => onChange(feature), [onChange, feature])
    return (
        <ToggleToken
            checked={checked}
            title={MapLayerFeatureLabels[feature]}
            onPress={onChangeHandler} />
    )
}

export default FeatureCheckBox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        paddingVertical: 6
    }
})