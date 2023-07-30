import { Platform, StyleSheet } from "react-native"
import { basic, basic300, success, warning, danger } from "../../../../../../styles/colors"

export const displayCard = StyleSheet.create({
    pressable: StyleSheet.compose({
        borderRadius: 6,
        margin: 6,
        overflow: 'hidden',
        backgroundColor: '#fff'
    }, Platform.select({
        android: {
            elevation: 5,
        },
        default: {
            borderWidth: 1,
            borderColor: basic300
        }
    })),
    icon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    hidden: {
        display: 'none'
    },
    iconRow: {
        width: 17,
        height: 17,
        marginRight: 10
    },
    iconText: {
        width: 20,
        height: 20,
        color: basic,
        marginLeft: 5,
    },
    iconTextSelected: {
        width: 20,
        height: 20,
        color: basic,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        height: 22,
    },
    DataRow: {
        paddingVertical: 3,
        flexDirection: 'row',
        height: 22,
    },
    Card: {
        padding: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: basic300,
        borderBottomWidth: 1
    },
    TitleView: {
        paddingBottom: 6,
    },
    statusBasic: {
        borderRadius: 5,
        marginRight: 12,
        flexDirection: 'row',
        width: 12,
        backgroundColor: basic,
    },
    statusGood: {
        borderRadius: 5,
        marginRight: 12,
        flexDirection: 'row',
        width: 12,
        backgroundColor: success,
    },
    statusWarning: {
        borderRadius: 5,
        marginRight: 12,
        flexDirection: 'row',
        width: 12,
        backgroundColor: warning,
    },
    statusDanger: {
        borderRadius: 5,
        marginRight: 12,
        flexDirection: 'row',
        width: 12,
        backgroundColor: danger,
    },
    subtitle: {
        marginTop: 3,
        textAlignVertical: 'bottom',
        height: 22,
        lineHeight: 18,
        paddingBottom: 6
    },

    dataText: {
        fontSize: 13,
        textAlignVertical: 'bottom',
        height: 22,
        lineHeight: 20,
        paddingVertical: 3,
    },
    readingBar: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectedBarIcon: {
        height: 24,
        width: 24,
        marginLeft: 5,
    },
    readingBarIcons: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    TitleDisplay: {
        paddingRight: 20,
        flex: 1,
    },
    StatusAndTitleView: {
        flex: 1,
        flexDirection: 'row',
    },
    ReadingDisplay: {

        justifyContent: 'center',
        alignItems: 'center'
    },
    ReadingDisplayPressable: {
        padding: 12
    },
    ReadingDisplayRoundBorder: {
        borderRadius: 6,
        overflow: 'hidden',
    }
})