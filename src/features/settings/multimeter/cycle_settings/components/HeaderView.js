import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import { MultimeterSettingContext } from '../context/MultimeterSettings'
import { MultimeterCaptureRate } from '../../../../../constants/global'
import CheckBoxText from './CheckBoxText'

const captureRateOptions = [MultimeterCaptureRate._60Hz, MultimeterCaptureRate._50Hz]

const HeaderView = () => {
    const { onCaptureRateChanged, captureRate, onOffCaptureActive, onCycleCaptureActiveChanged } = useContext(MultimeterSettingContext)
    const onCaptureRateChangedHandler = React.useCallback((index) => { onCaptureRateChanged(captureRateOptions[index]) }, [onCaptureRateChanged])
    const index = captureRateOptions.indexOf(captureRate)
    const captureRateIndex = ~index ? index : 0
    return (
        <View
            style={styles.container}>
            <Text
                category='label'
                appearance='hint'>
                Capture rate
            </Text>
            <RadioGroup
                style={styles.radioView}
                onChange={onCaptureRateChangedHandler}
                selectedIndex={captureRateIndex}>
                <Radio>60 Hz (US, Canada)</Radio>
                <Radio>50 Hz (Other)</Radio>
            </RadioGroup>
            <CheckBoxText
                checked={onOffCaptureActive}
                onPress={onCycleCaptureActiveChanged}>
                <Text
                    category='p2'>
                    Detect ON/OFF cycle
                </Text>
            </CheckBoxText>

        </View>
    )
}


export default HeaderView

const styles = StyleSheet.create({
    container: {

    },
    radioView: {
        paddingTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 12
    },
})