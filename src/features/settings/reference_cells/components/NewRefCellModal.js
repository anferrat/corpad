import React, { useEffect, useRef } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Modal, Button } from "@ui-kitten/components"
import Select from '../../../../components/Select'
import Input from "../../../../components/Input"
import { plusCircle } from "../../../../components/Icons"
import { ReferenceCellTypes } from "../../../../constants/global"
import { ReferenceCellTypeLabels } from "../../../../constants/labels"

const accessory = {
    icon: 'RE',
    pack: 'cp'
}

const referenceCellTypes = Object.values(ReferenceCellTypes).map(type => ({ item: ReferenceCellTypeLabels[type], index: type }))

const NewRefCellModal = ({ onChangeName, onChangeType, rcType, name, visible, dismissModal, nameValid, rcTypeValid, addReferenceCell }) => {
    const inputRef = useRef()

    useEffect(() => {
        const watch = setTimeout(() => {
            if (visible)
                inputRef.current?.focus()
        }, 120)
        return () => clearTimeout(watch)
    }, [visible])

    return (
        <Modal
            style={styles.modal}
            onBackdropPress={dismissModal}
            backdropStyle={styles.backDrop}
            visible={visible}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps='handled'
                style={styles.mainView}>
                <Input
                    ref={inputRef}
                    label='Name'
                    valid={nameValid}
                    value={name}
                    property='name_not_empty'
                    onChangeText={onChangeName} />
                <Select
                    property='rcType'
                    accessory={accessory}
                    onSelect={onChangeType}
                    itemList={referenceCellTypes}
                    selectedIndex={rcType}
                    placeholder="Select type"
                    valid={rcTypeValid}
                    label='Reference cell type' />
                <Button
                    onPress={addReferenceCell}
                    title='Add'
                    accessoryLeft={plusCircle}
                    style={styles.button}>
                    Create
                </Button>
            </ScrollView>
        </Modal>
    )
}

export default NewRefCellModal

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        width: '90%',
        top: '25%',
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    mainView: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    input: {
        flex: 1,
        marginVertical: 12
    },
    button: {
        marginTop: 18,
    },
    plusIcon: {
        height: 23,
        width: 23,
        marginRight: 25,
    },
    pressable: {
        height: 50,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 12
    }
})