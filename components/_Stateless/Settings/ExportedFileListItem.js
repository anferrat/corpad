import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Pressable, View, Animated } from "react-native"
import { Text, Icon } from "@ui-kitten/components"
import { basic, androidRipple } from "../../../styles/GlobalStyle"
import FileListItemMenu from "../SurveyList/FileListItemMenu"
import { androidStyle } from "../../../styles/GlobalStyle"
import { warningHandler } from "../../errorHandler"
import { getFileSize, getFormattedDate } from "../../customFunctions"

const ExportedFileListItem = (props) => {
    const scale = useRef(new Animated.Value(1))
    const [deleting, setDeleting] = useState(false)

    const fileSize = React.useMemo(() => getFileSize(props.fileSize), [props.fileSize])

    const onDeleteHandler = React.useCallback(async () => {
        const confirmDelete = await warningHandler(44, 'Delete')
        if (confirmDelete) {
            setDeleting(true)
        }
    }, [setDeleting])

    useEffect(() => {
        const deleteResult = async () => {
            const delRes = await props.onDeleteHandler()
            if (delRes.status !== 200) {
                setDeleting(false)
                scale.current.setValue(1)
            }
        }
        if (deleting)
            Animated.timing(scale.current, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start(deleteResult)
    }, [deleting])
    return (
        <Animated.View style={{
            height: scale.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 86],
            }),
            transform: [{ scale: scale.current }]
        }}>
            <Pressable
                style={{ ...androidStyle.ConnectionCard, marginVertical: 0 }}
                onPress={props.menuItems[0].onPress}
                android_ripple={androidRipple}>
                <View style={styles.topView}>
                    <Icon name={props.type === 'kml' ? 'kml-file' : 'file-text-outline'}
                        pack={props.type === 'kml' ? 'cp' : undefined}
                        style={styles.fileIcon}
                        fill={basic} />
                    <View
                        style={styles.titleView}>
                        <Text category="p1" numberOfLines={1} ellipsizeMode={'tail'}>{props.fileName}</Text>
                        <Text
                            category="c1" appearance="hint">{fileSize.value} {fileSize.unit}, {getFormattedDate(props.mtime.getTime())}</Text>
                    </View>
                    <FileListItemMenu
                        menuItems={[...props.menuItems, { title: 'Delete', onPress: onDeleteHandler, icon: 'trash-outline' }]} />
                </View>
            </Pressable>
        </Animated.View>
    )
}

export default React.memo(ExportedFileListItem, (prev, next) => prev.path === next.path)

const styles = StyleSheet.create({
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