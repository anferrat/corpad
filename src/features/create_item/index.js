import React from 'react'
import { View } from 'react-native'
import { Divider } from '@ui-kitten/components'
import ListItem from './components/ListItem'
import SheetHeader from './components/SheetHeader'
import useCreateItem from './hooks/useCreateItem'
import { ItemTypes } from '../../constants/global'
import { ItemTypeSingleIconsFilled } from '../../constants/icons'
import { ItemTypeLabels } from '../../constants/labels'

export const CreateItemSheet = React.memo(({ navigateToEdit, closeSheet, navigateToImport }) => {
    const createItemHandler = useCreateItem({ navigateToEdit, hideSheet: closeSheet })
    return (
        <>
            <SheetHeader
                title='Create'
                onCloseHandler={closeSheet} />
            {Object.values(ItemTypes).map((itemType, i) =>
                <View key={`CREATE_NEW_ITEM_${itemType}`}>
                    <ListItem
                        pack='cp'
                        onPress={createItemHandler.bind(this, itemType)}
                        title={ItemTypeLabels[itemType]}
                        icon={ItemTypeSingleIconsFilled[itemType]} />
                </View>)}
            <Divider />
            <ListItem title='Import from spreadsheet' icon='file-add' onPress={navigateToImport} />
        </>
    )
})
