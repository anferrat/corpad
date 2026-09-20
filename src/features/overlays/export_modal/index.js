import React from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import { Button, Divider, Icon, Text } from '@ui-kitten/components'
import { success } from '../../../styles/colors'
import { file, openInIcon, shareIcon } from '../../../components/Icons'
import useExportModal from './hooks/useExportModal'
import { translateOverlay } from '../../../localization'

export const ExportModal = ({ navigationRef }) => {
    const { hideModal, navigateToExportedFiles, openInHandler, shareHandler, fileName, visible, loading } = useExportModal({ navigationRef })
    const isAndroid = Platform.OS === 'android'
    if (visible)
        return (
            <Pressable
                style={styles.mainView}
                onPress={hideModal}>
                <View style={styles.infoView}>
                    <Icon
                        name='checkmark-circle-outline'
                        style={styles.icon}
                        fill={success} />
                    <Text
                        style={styles.bold}
                        category={'h3'}>{translateOverlay('exportModal.success')}</Text>
                    <Text
                        appearance='hint'
                        category='p2'
                        style={styles.text}>
                        {translateOverlay('exportModal.fileCreated', { fileName })}
                    </Text>
                    <Divider />
                    {isAndroid ? <>
                        <View
                            style={styles.buttons}>
                            <Button
                                style={styles.button}
                                onPress={navigateToExportedFiles}
                                appearance='ghost'>
                                {translateOverlay('exportModal.viewExportedFiles')}
                            </Button>

                        </View>
                        <Text>{translateOverlay('exportModal.or')}</Text>
                    </> : null}
                    <View
                        style={styles.buttons}>
                        <Button
                            style={styles.button}
                            onPress={isAndroid ? openInHandler : navigateToExportedFiles}
                            accessoryLeft={isAndroid ? openInIcon : file}
                            appearance='ghost'>
                            {isAndroid ? translateOverlay('exportModal.openIn') : translateOverlay('exportModal.viewFile')}
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={shareHandler}
                            accessoryLeft={shareIcon}
                            appearance='ghost'>
                            {translateOverlay('exportModal.share')}
                        </Button>
                    </View>
                </View>
            </Pressable>
        )
    else return null
}


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
    }
})
