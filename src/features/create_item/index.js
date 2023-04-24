import React from 'react'
import { View } from 'react-native'
import { Divider } from '@ui-kitten/components'
import ListItem from './components/ListItem'
import SheetHeader from './components/SheetHeader'
import useCreateItem from './hooks/useCreateItem'
import { labels } from '../../constants/constants'

const ITEMS = ['TEST_POINT', 'PIPELINE', 'RECTIFIER']
const ITEM_ICONS = ['TS-filled', 'PL-filled', 'RT-filled']

export const CreateItemSheet = React.memo(({ navigateToEdit, closeSheet, navigateToImport }) => {
    const createItemHandler = useCreateItem({ navigateToEdit, hideSheet: closeSheet })
    return (
        <>
            <SheetHeader
                title='Create'
                onCloseHandler={closeSheet} />
            {ITEMS.map((itemType, i) =>
                <View key={`CREATE_NEW_ITEM_${itemType}`}>
                    <ListItem
                        pack='cp'
                        onPress={createItemHandler.bind(this, itemType)}
                        title={labels[itemType].label}
                        icon={ITEM_ICONS[i]} />
                </View>)}
            <Divider />
            <ListItem title='Import from .csv' icon='file-add' onPress={navigateToImport} />
        </>
    )
})
