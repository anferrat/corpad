import React from 'react'
import { View, StyleSheet } from 'react-native'
import TextLine from './TextLine'
import OnOffCaptureToggle from './OnOffCaptureToggle'
import { control, primary } from '../../../../styles/colors'
import { MultimeterSyncModeLabels } from '../../../../constants/labels'
import CycleTextLine from './CycleTextLine'


const MultimeterParameters = ({ onOffCaptureAvailable, onOffCaptureActive, onOffCaptureToggleHandler, onTime, offTime, syncMode, noGps }) => {
    if (onOffCaptureAvailable)
        return (
            <View style={styles.container}>
                <OnOffCaptureToggle
                    onOffCaptureAvailable={onOffCaptureAvailable}
                    onOffCaptureActive={onOffCaptureActive}
                    onOffCaptureToggleHandler={onOffCaptureToggleHandler} />
                {onOffCaptureActive ?
                    <View style={styles.onOffView}>
                        <TextLine
                            title={'Sync mode'}
                            value={MultimeterSyncModeLabels[syncMode] + `${noGps ? ' (No GPS)' : ''}` ?? ''} />
                        <CycleTextLine
                            onTime={onTime}
                            offTime={offTime}
                            title={'Cycle'} />
                    </View> : null}
            </View>
        )
    else return null
}

export default React.memo(MultimeterParameters)

const styles = StyleSheet.create({
    container: {
        backgroundColor: control,
        margin: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: primary,
    },
    onOffView: {
        paddingBottom: 18
    }
})