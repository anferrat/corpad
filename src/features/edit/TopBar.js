import React from 'react'
import { useDispatch } from 'react-redux'
import Title from './Title'
import { View, StyleSheet, StatusBar } from 'react-native'
import SingleIconButton from '../../components/IconButton'
import { setUpdating } from '../../store/actions/list'
import { updateViewProperty } from '../../store/actions/item'
import { confirmDelete } from '../../helpers/functions'
import { genRequestObject } from '../../helpers/functions'
import { sendRequest } from '../../api/database/index'
import { setMarkerUpdate } from '../../store/actions/map'
import { hapticDelete } from '../../native_libs/haptics'
import { basic300 } from '../../styles/colors'
import { errorHandler } from '../../helpers/error_handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const TopBar = (props) => {
    const dispatch = useDispatch()
    const removeConfirm = (deleteAction) => {
        hapticDelete()
        confirmDelete(deleteAction, props.dataType)
    }
    const deleteAction = async () => {
        const deleteRequest = await sendRequest('DELETE', props.dataType, genRequestObject(props.dataType, props.subitemId ?? props.itemId))
        if (deleteRequest.status === 200) {
            props.navigateAfterDelete()
            if (!props.subitemId) {
                dispatch(setUpdating(props.dataType, props.itemId, 'DELETE'))
                dispatch(setMarkerUpdate('DELETE', props.dataType, props.itemId))
            }
            else {
                const newTime = Date.now()
                await sendRequest('UPDATE', props.dataTypeItem + '_PROPERTY', { ...genRequestObject(props.dataTypeItem, props.itemId), property: 'timeModified', value: newTime })
                dispatch(updateViewProperty(newTime, 'timeModified'))
            }
        }
        else
            errorHandler(601)
    }

    return (
        <SafeAreaView style={styles.topBar} edges={['top']}>
            <View style={styles.leftView}>
                <SingleIconButton
                    style={styles.icon}
                    onPress={props.goBack}
                    iconName='arrow-back-outline' />
                <Title
                    dataType={props.dataType} />
            </View>
            <SingleIconButton
                onPress={removeConfirm.bind(this, deleteAction)}
                iconName='trash' />
        </SafeAreaView>
    )
}

export default TopBar

const styles = StyleSheet.create({
    icon: {
        paddingRight: 12,
    },
    leftView:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    topBar: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        paddingBottom: 6,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: basic300
    }
})