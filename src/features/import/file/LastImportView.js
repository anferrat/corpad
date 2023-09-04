import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { globalStyle } from '../../../styles/styles'
import { Button, Text, Icon } from '@ui-kitten/components'
import { getFormattedDate } from '../../../helpers/functions'
import { basic } from '../../../styles/colors'
import { getItemIcon, getItemName } from './helpers/functions'
import { errorHandler, warningHandler } from '../../../helpers/error_handler'
import { diagBack } from '../../../components/Icons'
import { deleteItem } from '../../../app/controllers/survey/items/ItemController'
import { updateSetting } from '../../../store/actions/settings'
import { setRefresh } from '../../../store/actions/list'
import { refreshMarkers } from '../../../store/actions/map'

const LastImportView = ({ navigateToList }) => {
    const { idList, importTime, itemType } = useSelector(state => state.settings.lastImport)
    const dispatch = useDispatch()

    const onCancelImport = React.useCallback(async () => {
        const confirm = await warningHandler(60, 'Undo', 'Cancel')
        if (confirm) {
            dispatch(updateSetting('loader', { title: `Deleting ${getItemName(itemType, idList.length)}...`, visible: true }))
            const result = await Promise.all(idList.map((id) => deleteItem({ itemType, id })))
            const isSuccess = result.every(({ status }) => status === 200)
            if (isSuccess) {
                dispatch(updateSetting('lastImport'))
                dispatch(setRefresh(itemType))
                dispatch(refreshMarkers())
                navigateToList(itemType)
            }
            else {
                const error = result.find(({ status }) => status !== 200)
                errorHandler(error.status)
            }
            dispatch(updateSetting('loader'))
        }
    }, [dispatch, itemType, idList])

    if (itemType === null || idList.length === 0)
        return null
    else {
        return (
            <View style={globalStyle.card}>
                <Text category='label' appearance='hint' style={styles.label}>Last import status</Text>
                <View style={styles.iconRow}>
                    <Icon style={styles.icon} fill={basic} name={'clock-outline'} />
                    <Text category='s2' appearance='hint'>{getFormattedDate(importTime)}</Text>
                </View>
                <View style={styles.iconRow}>
                    <Icon style={styles.icon} fill={basic} name={getItemIcon(itemType)} pack='cp' />
                    <Text category='s2' appearance='hint'>{idList.length} {getItemName(itemType, idList.length)} were imported</Text>

                </View>
                <Button
                    accessoryLeft={diagBack}
                    onPress={onCancelImport}
                    appearance='ghost'
                    status='danger'
                    style={styles.button}>
                    Undo import
                </Button>
            </View>
        )
    }
}

export default LastImportView

const styles = StyleSheet.create({
    icon: {
        width: 18,
        height: 18,
        marginRight: 6
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3
    },
    label: {
        paddingBottom: 3
    },
    button: {
        marginBottom: -12,
        marginHorizontal: -12,
        marginTop: 6
    }
})