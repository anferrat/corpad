import React from 'react'
import Title from './Title'
import { View, StyleSheet, StatusBar } from 'react-native'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { setUpdating } from '../../store/actions/list'
import { updateViewProperty } from '../../store/actions/item'
import { useDispatch } from 'react-redux'
import { confirmDelete } from '../customFunctions'
import { genRequestObject } from '../customFunctions'
import { sendRequest } from '../../database/db'
import { setMarkerUpdate } from '../../store/actions/map'
import { hapticDelete } from '../_nativeFeatures/haptics'
import { androidStyle, basic300 } from '../../styles/GlobalStyle'
import { errorHandler } from '../errorHandler'
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
        <SafeAreaView style={{ ...androidStyle.TopBar, paddingBottom: 6, elevation: 5, borderBottomWidth: 1, borderBottomColor: basic300 }} edges={['top']}>
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
    }
})