import React from 'react'
import { sendRequest } from '../../../database/db'
import { View } from 'react-native'
import IdGen from '../../IdGen'
import ListItem from '../../_Stateless/ListItem'
import { iconHandlerItem, titleHandlerItem, getName } from '../../customFunctions'
import SheetHeader from '../../_Stateless/List/SheetHeader'
import { errorHandler } from '../../errorHandler'
import { Divider } from '@ui-kitten/components'

const DATA_TYPES = ['TEST_POINT', 'PIPELINE', 'RECTIFIER']
const CreateItemSheet = (props) => {
    const createNewItem = async (dataType) => {
        const itemId = await sendRequest('INSERT', dataType, { uid: IdGen(), timeCreated: Date.now(), timeModified: Date.now() })
        props.closeSheet()
        if (itemId.status === 200)
            props.navigateToEdit(itemId.result, dataType)
        else errorHandler(619)
    }
    return (
        <>
            <SheetHeader
                title='Create'
                onCloseHandler={props.closeSheet} />

            {DATA_TYPES.map(DATA_TYPE =>
                <View key={'CREATE_NEW_ITEM_' + DATA_TYPE}>

                    <ListItem onPress={createNewItem.bind(this, DATA_TYPE)}
                        title={titleHandlerItem(DATA_TYPE)}
                        iconName={iconHandlerItem(DATA_TYPE, 0) + '-filled'}
                        pack='cp' />
                </View>)}
            <Divider />
            <ListItem title='Import CSV' iconName='file-add' onPress={props.navigateToImport} />
        </>
    )
}

export default React.memo(CreateItemSheet)
