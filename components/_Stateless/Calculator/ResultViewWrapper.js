import React, { useState } from 'react'
import { Divider, Button } from '@ui-kitten/components'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { androidStyle, danger, primary } from '../../../styles/GlobalStyle'
import { saveIcon, refresh, exportedFilesIcon, checkmark, delIcon } from '../Icons'
import { warningHandler } from '../../errorHandler'

const ResultViewWrapper = (props) => {
    const [saving, setSaving] = useState(false)
    const [exporting, setExporting] = useState(false)
    const saveHandler = React.useCallback(async () => {
        setSaving(true)
        await props.saveHandler()
        setSaving(false)
    }, [setSaving, props.saveHandler])

    const deleteHandler = React.useCallback(async () => {
        const confirm = await warningHandler(46, 'Delete', 'Cancel')
        if (confirm) {
            setSaving(true)
            const del = await props.onDeleteHandler()
            if (del)
                props.resetHandler()
            setSaving(false)
        }
    }, [setSaving, props.resetHandler, props.onDeleteHandler])

    const exportHandler = async () => {
        setExporting(true)
        await props.exportHandler()
        setExporting(false)
    }
    const activityIndicator = React.useCallback((isPrime = true) => <ActivityIndicator color={!isPrime ? danger : primary} size='small' />, [])
    if (props.display) {
        return <View style={{...androidStyle.ConnectionCard, ...styles.mainView}}>
            {props.children}
            <Divider />
            <View style={styles.buttonView}>
                {!props.deleteOption ?
                    <Button appearance='ghost' style={props.savedInHistory ? styles.buttonDisabled : styles.button} accessoryLeft={saving ? activityIndicator : (props.savedInHistory ? checkmark : saveIcon)} onPress={saving ? null : saveHandler} disabled={props.savedInHistory}>{props.savedInHistory ? 'Saved' : 'Save'}</Button> :
                    <Button appearance='ghost' style={styles.button} accessoryLeft={saving ? activityIndicator.bind(this, false) : delIcon} status='danger' onPress={deleteHandler}>Delete</Button>}
                <Button appearance='ghost' style={styles.button} accessoryLeft={refresh} status='success' onPress={props.resetHandler}>Reset</Button>
                <Button appearance='ghost' style={styles.button} accessoryLeft={exporting ? activityIndicator : exportedFilesIcon} onPress={exporting ? () => { } : exportHandler}>Export</Button>
            </View>
        </View>
    }
    else return null
}

export default React.memo(ResultViewWrapper)

const styles = StyleSheet.create({
    mainView: {
        marginBottom: 12
    },
    button: {
        flex: 1,
        paddingVertical: 18
    },
    buttonDisabled: {
        flex: 1,
        paddingVertical: 18,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    buttonView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: -12,
        marginBottom: -12,

    },
    listItem: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
})