import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    button: {
        marginTop: 12,
        position: 'absolute',
        bottom: 12,
        width: '95%',
        left: '2.5%'
    },
    container: {
        paddingBottom: 75
    },
    mainView: {
        backgroundColor: '#fff',
        padding: 12,
    },
    textIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    selectIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 0
    },
    select: {
        paddingBottom: 12,
    },
    checkBox: {
        paddingVertical: 12
    },
    checkBoxText: {
        marginLeft: 12,
        fontSize: 12
    },
    hidden: {
        display: 'none',
    },
    hintIcon: {
        width: 13,
        height: 13,
        marginRight: 6
    },
    hint: {
        paddingBottom: 12
    },
    title: {
        paddingVertical: 12
    },
    radio: {
        paddingTop: 12,
        paddingBottom: 24
    },
    emptyView: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        alignItems: 'center',
        justifyContent: 'center',
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    exportStatus: {
        marginTop: 12,
        paddingBottom: 100
    }
})
