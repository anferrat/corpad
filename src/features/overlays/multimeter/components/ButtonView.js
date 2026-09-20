import React from 'react'
import { View, StyleSheet } from 'react-native'
import MultimeterButton from './MultimeterButton'
import GraphButton from './GraphButton'
import { translateMultimeterOverlay } from '../../../../localization'


const ButtonView = ({ onHold, toggleOnHold, saveReading, showModal, reading, displayMode }) => {

    const onSave = () => saveReading(reading)
    return (
        <View
            style={styles.container}>
            {displayMode === 0 ? <>
                <MultimeterButton
                    onPress={toggleOnHold}
                    icon={onHold ? 'play-circle' : 'pause-circle'}
                    pack={null}
                    title={onHold ? translateMultimeterOverlay('resume') : translateMultimeterOverlay('hold')} />
                <MultimeterButton
                    onPress={onSave}
                    icon={'save'}
                    pack={null}
                    title={translateMultimeterOverlay('save')} />
                <MultimeterButton
                    onPress={showModal}
                    icon={'book-open'}
                    pack={null}
                    title={translateMultimeterOverlay('history')} />
            </> : <GraphButton
                onPress={toggleOnHold}
                icon={onHold ? 'play-circle' : 'pause-circle'}
                pack={null}
                title={onHold ? translateMultimeterOverlay('resume') : translateMultimeterOverlay('hold')} />

            }
        </View>
    )
}


export default React.memo(ButtonView)

const styles = StyleSheet.create({
    container: {
        flex: -1,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //flexBasis: 120
    },
})
