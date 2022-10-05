import React from "react"
import { StyleSheet, Pressable, View } from "react-native"
import { Text, Icon } from "@ui-kitten/components"
import { basic200, basic } from "../../../styles/GlobalStyle"
import FileListItemMenu from "../SurveyList/FileListItemMenu"
import { androidStyle } from "../../../styles/GlobalStyle"

const ExportedFileListItem = (props) => {
    return (
        <Pressable style={{...androidStyle.ConnectionCard, marginVertical: 0 }} onPress={() => { }} android_ripple={{ color: basic200 }}>
            <View style={styles.topView}>
                <Icon pack={'cp'} name='csv-file' style={styles.fileIcon} fill={basic} />
                <View style={styles.titleView}>
                    <Text category="h6">{props.fileName}</Text>
                    <Text category="s2" appearance="hint">{props.fileSize} KB</Text>
                </View>
                <FileListItemMenu menuItems={[{ title: 'Delete', onPress: () => { } }]} />
            </View>
        </Pressable>

    )
}

export default ExportedFileListItem

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
        width: 40,
        height: 40,
        marginRight: 12
    }
})