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
        const { onTime, offTime, multimeterType, mType, firstCycleOn, syncMode, isSingleRead } = props.props
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.indicator}>
                            <WaveActivityIndicator size={20} color={primary} />
                        </View>
                        <View style={styles.title}>
                            <Text
                                category='h6'>Capturing</Text>
                            <Text
                                category='s2' appearance='hint'>{MultimeterTypeLabels[multimeterType]} | {MeasurementPropertyTypeLabels[mType]}</Text>
                        </View>
                    </View>
                    {!isSingleRead ? <>
                        <Text style={styles.modeText}>
                            <Text
                                category='s2'
                                appearance='hint'>
                                Cycle capture mode:
                            </Text> {isSingleRead ?
                                MultimeterSyncModeLabels[MultimeterSyncModes.REAL_TIME] :
                                MultimeterSyncModeLabels[syncMode]}
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
        backgroundColor: control,
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