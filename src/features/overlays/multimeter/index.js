import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import SevenSegmentView from '../../../components/SevenSegmentDisplay'
import ModalHeader from './components/ModalHeader'
import { basic200, control } from '../../../styles/colors'
import DisplayView from './components/DisplayView'
import OnOffCaptureToggle from './components/OnOffCaptureToggle'
import CaptureButtonBar from './components/CaptureButtonBar'
import MultimeterParameters from './components/MultimeterParameters'
import useMultimeterListener from './hooks/useMultimeterListener'
import { MultimeterCycles } from '../../../constants/global'
import ConnectingView from './components/ConnectingView'



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
            visible={visible}>
            <View style={styles.container}>
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

            </View>
            <CaptureButtonBar
                onCapture={onCapture}
                onCancel={onModalClose} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})