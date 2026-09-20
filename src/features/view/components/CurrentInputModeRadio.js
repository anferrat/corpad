import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import { translateView } from '../../../localization'


const CurrentInputModeRadio = ({ isVoltageDropSelected, onChange, disabled }) => {
    const onChangeHandler = useCallback((value) => {
        onChange(Boolean(value))
    }, [onChange])
    return (
        <>
            <Text
                category='label'
                appearance='hint'>{translateView('currentMeasurement')}</Text>
            <RadioGroup
                style={styles.container}
                selectedIndex={Number(Boolean(isVoltageDropSelected))}
                onChange={onChangeHandler}>
                <Radio
                    disabled={disabled}>
                    {translateView('direct')}
                </Radio>
                <Radio
                    disabled={disabled}>
                    {translateView('shunt')}
                </Radio>
            </RadioGroup>
        </>
    )
}


export default CurrentInputModeRadio

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 12,
        paddingBottom: 12
    },
})
