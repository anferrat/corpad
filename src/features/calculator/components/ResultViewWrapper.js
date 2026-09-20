import React, { useState } from 'react'
import { Divider, Button, Text } from '@ui-kitten/components'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { globalStyle } from '../../../styles/styles'
import { danger, primary } from '../../../styles/colors'
import { saveIcon, refresh, exportedFilesIcon, checkmark, delIcon } from '../../../components/Icons'
import { warningHandler } from '../../../helpers/error_handler'
import { translate } from '../../../localization'
import { translateCalculator } from '../../../localization'

const renderActionText = text => evaProps => (
    <Text
        {...evaProps}
        style={[evaProps.style, styles.buttonText]}
        numberOfLines={1}
        ellipsizeMode='tail'>
        {text}
    </Text>
)

const ResultViewWrapper = (props) => {
    const [saving, setSaving] = useState(false)
    const [exporting, setExporting] = useState(false)
    const saveHandler = React.useCallback(async () => {
        setSaving(true)
        await props.saveHandler()
        setSaving(false)
    }, [setSaving, props.saveHandler])

    const deleteHandler = React.useCallback(async () => {
        const confirm = await warningHandler(46, translate('actions.delete'), translate('actions.cancel'))
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
    const saveTitle = props.savedInHistory ? translateCalculator('common.saved') : translate('common.save')
    const resetTitle = translateCalculator('common.reset')
    const exportTitle = translate('export.export')
    if (props.display) {
        return <View style={{ ...globalStyle.card, ...styles.mainView }}>
            {props.children}
            <Divider />
            <View style={styles.buttonView}>
                {!props.deleteOption ?
                    <Button appearance='ghost' style={props.savedInHistory ? styles.buttonDisabled : styles.button} accessoryLeft={saving ? activityIndicator : (props.savedInHistory ? checkmark : saveIcon)} onPress={saving ? null : saveHandler} disabled={props.savedInHistory}>
                        {renderActionText(saveTitle)}
                    </Button> :
                    <Button appearance='ghost' style={styles.button} accessoryLeft={saving ? activityIndicator.bind(this, false) : delIcon} status='danger' onPress={deleteHandler}>
                        {renderActionText(translate('common.delete'))}
                    </Button>}
                <Button appearance='ghost' style={styles.button} accessoryLeft={refresh} status='success' onPress={props.resetHandler}>
                    {renderActionText(resetTitle)}
                </Button>
                <Button appearance='ghost' style={styles.button} accessoryLeft={exporting ? activityIndicator : exportedFilesIcon} onPress={exporting ? () => { } : exportHandler}>
                    {renderActionText(exportTitle)}
                </Button>
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
        flexBasis: 0,
        minWidth: 0,
        overflow: 'hidden',
        paddingHorizontal: 4,
        paddingVertical: 18
    },
    buttonDisabled: {
        flex: 1,
        flexBasis: 0,
        minWidth: 0,
        overflow: 'hidden',
        paddingHorizontal: 4,
        paddingVertical: 18,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    buttonText: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
        textAlign: 'center'
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
