import React from 'react'
import { Modal, StyleSheet } from 'react-native'
import ModeView from './components/ModeView'
import MultimeterDisplay from './components/MultimeterDisplay'
import RangeView from './components/RangeView'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomButton from '../../../components/BottomButton'
import useMultimeterModal from './hooks/useMultimeterModal'
import ButtonView from './components/ButtonView'
import HistoryModalContent from './components/HistoryModalContent'
import MultimeterLoadingView from './components/MultimeterLoadingView'
import { control } from '../../../styles/colors'
import MultimeterLimitWarning from './components/MultimeterLimitWarning'
import DisplayModeButtons from './components/DisplayModeButtons'
import MultimeterGraph from './components/MultimeterGraph'

const MultimeterModal = ({ goBack }) => {
    const {
        reading,
        onHold,
        connecting,
        paired,
        connected,
        executing,
        historyReadings,
        saveReading,
        onSetRange,
        onSetMode,
        toggleOnHold,
        showModal,
        hideModal,
        onDigitPress,
        onGraphPress,
        onEndEditingYMax,
        onEndEditingXMax,
        displayMode,
        modalVisible,
        updatingRange,
        updatingMode,
        modes,
        ranges,
        isAvailable,
        loading,
        selectedMode,
        selectedRange,
        limit,
        xMax,
        yMax,
        xMaxValid,
        yMaxValid,
        graphYUnit,
    } = useMultimeterModal({ goBack })

    const updating = updatingMode !== null || updatingRange !== null
    return (
        <>
            <SafeAreaView
                style={styles.area}>
                <MultimeterLoadingView
                    showModal={showModal}
                    executing={executing}
                    connected={connected}
                    connecting={connecting}
                    loading={loading}
                    isAvailable={isAvailable}
                    paired={paired}>
                    {selectedMode !== null ? <MultimeterLimitWarning
                        value={limit} /> : null}
                    <ModeView
                        modes={modes}
                        onSelect={onSetMode}
                        updatingMode={updatingMode}
                        updating={updating}
                        selectedMode={selectedMode} />
                    <DisplayModeButtons
                        onDigitPress={onDigitPress}
                        onGraphPress={onGraphPress}
                        selectedMode={displayMode}
                    />
                    {displayMode === 0 ?
                        <MultimeterDisplay
                            reading={reading} /> :
                        <MultimeterGraph
                            graphYUnit={graphYUnit}
                            xMax={xMax}
                            yMax={yMax}
                            xMaxValid={xMaxValid}
                            yMaxValid={yMaxValid}
                            onEndEditingYMax={onEndEditingYMax}
                            onEndEditingXMax={onEndEditingXMax}
                            history={historyReadings}
                        />}
                    <ButtonView
                        displayMode={displayMode}
                        reading={reading}
                        onHold={onHold}
                        saveReading={saveReading}
                        showModal={showModal}
                        toggleOnHold={toggleOnHold} />
                    <RangeView
                        ranges={ranges}
                        onSelect={onSetRange}
                        updatingRange={updatingRange}
                        updating={updating}
                        selectedRange={selectedRange} />
                </MultimeterLoadingView>
                <BottomButton
                    onPress={goBack}
                    title='Back'
                    icon='undo' />
                <Modal
                    onRequestClose={hideModal}
                    statusBarTranslucent={true}
                    animationType='fade'
                    visible={modalVisible}>
                    <HistoryModalContent
                        hideModal={hideModal} />
                </Modal>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    area: {
        flex: 1,
        paddingBottom: 72,
        backgroundColor: control,
        justifyContent: 'center'
    }
})

export default MultimeterModal