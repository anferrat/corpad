import React, { useState } from 'react'
import { Button, Icon, Text } from '@ui-kitten/components'
import { Modal } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { getItemName } from '../helpers/functions'
import { info, listIcon } from '../../../../components/Icons'
import { success, basic300 } from '../../../../styles/colors'
import ModalStatusRow from './ModalStatusRow'
import ModalDetails from './ModalDetails'

const ModalCompleted = ({ successCount, warningCount, failedCount, navigateToList, itemType }) => {
    const [visible, setVisible] = useState(false)
    const showModal = () => setVisible(true)
    hideModal = () => setVisible(false)
    return (
        <>
            <View style={styles.header}>
                <Icon name='checkmark-circle-outline' style={styles.checkIcon} fill={success} />
                <Text category={'h6'}>Import completed</Text>
            </View>
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