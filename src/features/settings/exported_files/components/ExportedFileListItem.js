import React, { useRef } from "react"
import useModal from "../../../../hooks/useModal"
import { StyleSheet, View, Animated, Platform } from "react-native"
import { Text, Icon } from "@ui-kitten/components"
import { basic } from "../../../../styles/colors"
import { androidRipple, globalStyle } from '../../../../styles/styles'
import FileListItemMenu from "./FileListItemMenu"
import { getFormattedDate } from "../../../../helpers/functions"
import { getFileSize } from "../helpers/functions"
import FileListItemMenuItem from "./FileListItemMenuItem"
import Pressable from "../../../../components/Pressable"

const fileIcons = {
    'text/csv': {
        icon: 'file-text-outline',
        pack: null,
    },
    'application/vnd.google-earth.kml+xml': {
        icon: 'kml-file',
        pack: 'cp'
    }
}

const ExportedFileListItem = ({ deleteFile, removeFileFromList, saveToDownloads, shareFileHandler, openInHandler, path, name, type, size, timeModified, navigateToSpreadsheet }) => {
    const isKml = type !== 'text/csv'
    const isAndroid = Platform.OS === 'android'
    const scale = useRef(new Animated.Value(1))
    const { hideModal, showModal, visible } = useModal()

    const { unit, value } = React.useMemo(() => getFileSize(size), [size])

    const handleDelete = React.useCallback(async () => {
        hideModal()
        const success = await deleteFile(name, path)
        if (success) {
            Animated.timing(scale.current, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start(() => removeFileFromList(path))
        }
    }, [path, name])

    const handleSaveToDownloads = React.useCallback(async () => {
        await saveToDownloads(path)
        hideModal()
    }, [path])

    const handleShareFile = React.useCallback(() => {
        hideModal()
        shareFileHandler(path, type)
    }, [path, type, hideModal, shareFileHandler])

    const handleOpenIn = React.useCallback(async () => {
        await openInHandler(path, type)
        hideModal()
    }, [path, type])

    const handlePreview = React.useCallback(() => {
        if (type === 'text/csv')
            navigateToSpreadsheet(path, name)
        hideModal()
    }, [path, type, name, navigateToSpreadsheet])

    return (
        <Animated.View style={{
            height: scale.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 86],
            }),
            transform: [{ scale: scale.current }]
        }}>
            <Pressable
                style={styles.mainView}
                onPress={isKml ? handleShareFile : handlePreview}
                android_ripple={androidRipple}>
                <View
                    style={styles.topView}>
                    <Icon
                        name={fileIcons[type].icon}
                        pack={fileIcons[type].pack}
                        style={styles.fileIcon}
                        fill={basic} />
                    <View
                        style={styles.titleView}>
                        <Text
                            category="p1"
                            numberOfLines={1}
                            ellipsizeMode={'tail'}>
                            {name}</Text>
                        <Text
                            category="c1"
                            appearance="hint">
                            {value} {unit}, {getFormattedDate(timeModified)}</Text>
                    </View>
                    <FileListItemMenu
                        showMenu={showModal}
                        hideMenu={hideModal}
                        visible={visible}>
                        {!isKml ?
                            <FileListItemMenuItem
                                title={'Preview'}
                                icon={'eye-outline'}
                                onPress={handlePreview} /> : null}
                        <FileListItemMenuItem
                            title={'Share'}
                            icon={isAndroid ? 'share-outline' : 'share-ios'}
                            pack={isAndroid ? null : 'cp'}
                            onPress={handleShareFile} />
                        {isAndroid ? <FileListItemMenuItem
                            title={'Open in...'}
                            icon={'external-link-outline'}
                            onPress={handleOpenIn} /> : null}
                        {isAndroid ? <FileListItemMenuItem
                            title={'Save to Downloads'}
                            icon={'download-outline'}
                            onPress={handleSaveToDownloads} /> : null}
                        <FileListItemMenuItem
                            status='danger'
                            title={'Delete'}
                            icon={'trash-outline'}
                            onPress={handleDelete} />
                    </FileListItemMenu>
                </View>
            </Pressable>
        </Animated.View>
    )
}

export default ExportedFileListItem

const styles = StyleSheet.create({
    mainView: {
        ...globalStyle.card,
        marginVertical: 0
    },
    plusIcon: {
        height: 23,
        width: 23,
        marginRight: 25,
    },
    topView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleView: {
        flex: 1,
    },
    fileIcon: {
        width: 30,
        height: 30,
        marginRight: 12
    }
})