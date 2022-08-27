import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Icon, Text } from '@ui-kitten/components'
import { success } from '../../styles/GlobalStyle'
import { shareWith } from '../_nativeFeatures/Share'
import { openIn } from '../_nativeFeatures/OpenIn'
import { updateSetting } from '../../store/actions/settings'

const ExportModal = () => {
    const dispatch = useDispatch()
    const exportModal = useSelector(state=>state.settings.exportModal)
    const hideModal = React.useCallback(() => dispatch(updateSetting('exportModal', { visible: false })), [dispatch])

    const buttonHandler = React.useCallback((fileUrl, mimeType, action) => {
        hideModal()
        action(fileUrl, mimeType)
    }, [hideModal])
    const fileName = exportModal.fileUrl ? exportModal.fileUrl.substring(exportModal.fileUrl.lastIndexOf('/') + 1, exportModal.fileUrl.length) : ''
    return (
        <Pressable style={exportModal.visible ? styles.mainView : styles.hidden} onPress={hideModal}>
            <View style={styles.infoView}>
                <Icon name='checkmark-circle-outline' style={styles.icon} fill={success} />
                <Text style={styles.bold} category={'h3'}>Success!</Text>
                <Text appearance='hint' category='p2' style={styles.text}>File {fileName} is successfully exported. Choose what you want to do with the file.</Text>
                <Divider />
                <View style={styles.buttons}>
                    <Button style={styles.button} onPress={buttonHandler.bind(this, exportModal.fileUrl ?? '', exportModal.mimeType ?? '', openIn)} appearance='ghost'>Open in ...</Button>
                    <Button style={styles.button} onPress={buttonHandler.bind(this, exportModal.fileUrl ?? '', exportModal.mimeType ?? '', shareWith)} appearance='ghost'>Share</Button>
                </View>
            </View>
        </Pressable>
    )
}

export default ExportModal



const styles = StyleSheet.create({
    button: {
        flex: 1
    },
    icon: {
        width: 55,
        height: 55,
        marginTop: 12
    },
    buttons: {
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center',
        paddingBottom: 12,
        paddingHorizontal: 12,
    },
    mainView: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        borderRadius: 12,

        backgroundColor: '#fff',
        width: '80%',
        maxWidth: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bold: {
        fontWeight: 'bold',
        paddingVertical: 12
    },
    hidden: {
        display: 'none'
    }
})