import { Button, CheckBox, Modal, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import WireView from './WireView'
import { control } from '../../../../styles/colors'


const AnodeBedWireModal = ({ visible, hideModal, update, wireColor, wireGauge, index, updateAnodeWireProperties }) => {
    const [color, setColor] = useState(wireColor)
    const [gauge, setGauge] = useState(wireGauge)
    const [applyToAll, setApplyToAll] = useState(false)

    const updatePoperty = React.useCallback((value, property) => {
        property === 'wireColor' ? setColor(value) : setGauge(value)
    }, [])

    const onApply = React.useCallback(() => {
        if (applyToAll)
            updateAnodeWireProperties(color, gauge)
        else {
            update(color, 'wireColor', index)
            update(gauge, 'wireGauge', index)
        }
        hideModal()
    }, [color, gauge, applyToAll])

    return (
        <Modal
            style={styles.modal}
            onBackdropPress={hideModal}
            backdropStyle={styles.backdrop}
            visible={visible}>
            <View
                style={styles.container}>
                <Text
                    style={styles.text}
                    category={'h6'}>
                    Anode #{index + 1}</Text>
                <WireView
                    update={updatePoperty}
                    wireColor={color}
                    wireGauge={gauge} />
                <View
                    style={styles.checkbox}>
                    <CheckBox
                        checked={applyToAll}
                        onChange={setApplyToAll}>
                        Apply to all
                    </CheckBox>
                </View>
                <View style={styles.buttons}>
                    <Button
                        appearance={'outline'}
                        style={styles.button}
                        onPress={onApply}>
                        Apply
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

export default AnodeBedWireModal

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 500,
        width: '90%',
        backgroundColor: control,
        borderRadius: 15,
        padding: 12,
    },
    buttons: {
        flexDirection: 'row',
    },
    modal: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        flex: 1,
    },
    text: {
        width: '100%',
        marginBottom: 12,
        textAlign: 'left',
    },
    checkbox: {
        width: '100%',
        marginVertical: 12,
        marginBottom: 24,
        justifyContent: 'flex-start',
        textAlign: 'left',
    }
})