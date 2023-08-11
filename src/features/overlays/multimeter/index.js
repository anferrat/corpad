import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import ModalHeader from './components/ModalHeader'
import DisplayView from './components/DisplayView'
import CaptureButtonBar from './components/CaptureButtonBar'
import MultimeterParameters from './components/MultimeterParameters'
import useMultimeterListener from './hooks/useMultimeterListener'
import { MultimeterCycles } from '../../../constants/global'
import ConnectingView from './components/ConnectingView'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const edges = ['top', 'bottom', 'left', 'right']

export const MultimeterModal = () => {
    const {
        onTime,
        offTime,
        visible,
        onOffCaptureActive,
        onOffCaptureAvailable,
        values,
        syncMode,
        measurementType,
        onHold,
        setupCompleted,
        noGps,
        onModalClose,
        onOffCaptureToggleHandler,
        onPauseHandler,
        onResumeHandler,
        onCapture,
    } = useMultimeterListener()
    return (
        <Modal
            onRequestClose={onModalClose}
            visible={visible}>
            <SafeAreaProvider>
                <SafeAreaView
                    edges={edges}
                    style={styles.container}>
                    <ModalHeader
                        measurementType={measurementType}
                        onModalClose={onModalClose} />
                    <DisplayView
                        onOffCaptureActive={onOffCaptureActive}
                        onOffCaptureAvailable={onOffCaptureAvailable}
                        onHold={onHold}
                        values={values}
                        onPlayHandler={onResumeHandler}
                        onHoldHandler={onPauseHandler} />
                    <ConnectingView
                        connecting={!setupCompleted} />
                    <MultimeterParameters
                        noGps={noGps}
                        onTime={onTime}
                        offTime={offTime}
                        syncMode={syncMode}
                        onValue={values[MultimeterCycles.ON]}
                        offValue={values[MultimeterCycles.OFF]}
                        onOffCaptureAvailable={onOffCaptureAvailable}
                        onOffCaptureActive={onOffCaptureActive}
                        onOffCaptureToggleHandler={onOffCaptureToggleHandler} />
                </SafeAreaView>
                <CaptureButtonBar
                    onCapture={onCapture}
                    onCancel={onModalClose} />
            </SafeAreaProvider>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})