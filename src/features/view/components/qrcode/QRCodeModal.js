import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Modal, Icon, Button } from '@ui-kitten/components'
import useQrCodeModal from '../../hooks/useQrCodeModal'
import { getModalTop } from '../../../../styles/dimensions'
import { SvgXml } from 'react-native-svg'
import LoadingView from '../../../../components/LoadingView'
import { basic700, control } from '../../../../styles/colors'
import { ItemTypeLabels } from '../../../../constants/labels'
import Avatar from './Avatar'


const QRCodeModal = ({ name }) => {
    const { loading, visible, svg, itemType, onExportPress, onClosePress } = useQrCodeModal()
    return (
        <Modal
            visible={visible}
            onBackdropPress={onClosePress}
            backdropStyle={styles.backdrop}
            style={styles.modal}>
            <View
                style={styles.container}>
                <LoadingView
                    loading={loading}>
                    <View
                        style={styles.avatar}>
                        <Avatar
                            itemType={itemType} />
                    </View>
                    <View
                        style={styles.title}>
                        <Text category='h5'>
                            {name}
                        </Text>
                        <Text>
                            {ItemTypeLabels[itemType]}
                        </Text>
                    </View>
                    {svg !== null ?
                        <SvgXml
                            width='200'
                            height='200'
                            xml={svg}
                            style={styles.code} />
                        : null}
                    <Text
                        style={styles.hint}
                        category='s2'
                        ellipsizeMode={'tail'}
                        numberOfLines={4}
                        appearance='hint'>
                        If you share this with someone, they can scan it with their camera and read encoded data offline.
                    </Text>
                    <Button
                        style={styles.button}
                        appearance='ghost'
                        onPress={onExportPress}>
                        Export QR code
                    </Button>
                </LoadingView>
            </View>
        </Modal>
    )
}


export default QRCodeModal

const styles = StyleSheet.create({
    modal: {
        alignSelf: 'center',
        position: 'absolute',
        top: getModalTop(440),
        width: '80%',
        minWidth: 280,
        height: 440
    },
    code: {
        position: 'absolute',
        top: 100,
    },
    hint: {
        position: 'absolute',
        top: 300,
        textAlign: 'center',
        height: 80,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: control,
        borderRadius: 15,
        elevation: 5,
        padding: 24,
        borderWidth: 1,
        borderColor: basic700,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        position: 'absolute',
        bottom: 12
    },
    avatar: {
        position: 'absolute',
        top: -35
    },
    title: {
        alignItems: 'center',
        position: 'absolute',
        height: 62,
        top: 38
    }
})