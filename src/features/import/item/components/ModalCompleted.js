import React, { useState } from 'react'
import { Button } from '@ui-kitten/components'
import { Modal } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { getItemName } from '../helpers/functions'
import { info, listIcon } from '../../../../components/Icons'
import { success, basic300, danger } from '../../../../styles/colors'
import ModalStatusRow from './ModalStatusRow'
import ModalDetails from './ModalDetails'
import ModalTitle from './ModalTitle'

const ModalCompleted = ({ successCount, warningCount, failedCount, navigateToList, itemType, status, warnings }) => {
    const [visible, setVisible] = useState(false)
    const showModal = () => setVisible(true)
    hideModal = () => setVisible(false)
    return (
        <>
            <ModalTitle
                title={status === 200 ? 'Import completed' : 'Import failed'}
                icon={status === 200 ? 'checkmark-circle-outline' : 'alert-circle-outline'}
                iconFill={status === 200 ? success : danger} />
            <View style={styles.info}>
                <ModalStatusRow icon={'checkmark'}>{successCount} {getItemName(itemType, successCount)} {successCount === 1 ? 'was' : 'were'} created</ModalStatusRow>
                <ModalStatusRow icon={'info-outline'}>{warningCount} warnings</ModalStatusRow>
                <ModalStatusRow icon={'alert-triangle-outline'}>{failedCount} errors</ModalStatusRow>
            </View>
            <View style={styles.buttons}>
                <Button
                    accessoryLeft={listIcon}
                    style={styles.button}
                    appearance='ghost'
                    onPress={navigateToList.bind(this, itemType)}>
                    Go to list
                </Button>
                <Button
                    accessoryLeft={info}
                    style={styles.button}
                    appearance='ghost'
                    onPress={showModal}>
                    Details
                </Button>
            </View>
            <Modal
                statusBarTranslucent={true}
                animationType='slide'
                onRequestClose={hideModal}
                visible={visible}>
                <ModalDetails
                    warnings={warnings}
                    hideModal={hideModal} />
            </Modal>
        </>
    )

}

export default ModalCompleted


const styles = StyleSheet.create({
    checkIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    borderView: {
        flex: 1,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: basic300,
        borderStyle: "dashed",
        alignItems: 'center'
    },
    header: {
        paddingTop: 12,
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        marginHorizontal: -12,
        marginBottom: -12
    },
    button: {
        flex: 1
    }
})