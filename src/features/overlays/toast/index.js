import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { MeasurementPropertyTypeLabels, MultimeterSyncModeLabels, MultimeterTypeLabels } from '../../../constants/labels'
import { MultimeterSyncModes } from '../../../constants/global'
import CycleView from '../../../components/CycleView'
import { control, primary } from '../../../styles/colors'
import WaveActivityIndicator from '../../../components/WaveActivityIndicator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


export const toastConfig = {
    multimeterCaptureToast: (props) => {
        const { onTime, offTime, multimeterType, mType, firstCycleOn, syncMode, isSingleRead, noFix } = props.props
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.indicator}>
                            <WaveActivityIndicator size={20} color={control} />
                        </View>
                        <View style={styles.title}>
                            <Text
                                status='control'
                                category='h6'>Capturing</Text>
                            <Text
                                status='control'
                                category='s2' appearance='hint'>{MultimeterTypeLabels[multimeterType]} | {MeasurementPropertyTypeLabels[mType]}</Text>
                        </View>
                    </View>
                    {!isSingleRead ? <>
                        <Text
                            status='control'
                            style={styles.modeText}>
                            <Text
                                status='control'
                                category='s2'
                                appearance='hint'>
                                Cycle detection mode:
                            </Text> {isSingleRead ?
                                MultimeterSyncModeLabels[MultimeterSyncModes.REAL_TIME] :
                                MultimeterSyncModeLabels[syncMode]}{noFix ? ' (No time fix)' : null}
                        </Text>
                        <CycleView
                            onTime={onTime}
                            offTime={offTime}
                            firstCycleOn={firstCycleOn}
                        />
                    </> : null}
                </View>
            </View>
        )
    }
}

export const ToastComponent = () => {
    const insets = useSafeAreaInsets()
    return <Toast
        position='top'
        topOffset={insets.top}
        autoHide={false}
        config={toastConfig}
    />
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },

    container: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: primary,
        marginHorizontal: 12,
        elevation: 5,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        height: 48
    },
    title: {

    },
    indicator: {
        flex: -1
    },
    modeText: {
        marginBottom: 6
    }
})