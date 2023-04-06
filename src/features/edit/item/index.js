import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { labels } from '../../../constants/constants'
import ItemView from './ItemView'
import SaveButton from './SaveButton'
import useSubitemListData from './hooks/useSubitemListData'
import SubitemListItem from './components/SubitemListItem'
import LoadingView from '../../../components/LoadingView'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'


export const EditItem = ({ itemId, isNew, itemType, navigateToSubitem, submit }) => {
    const { subitems, loading } = useSubitemListData({ itemId, itemType })

    const renderSubitem = React.useCallback(({ item }) => {
        const { uid, type, id, name } = item
        return <SubitemListItem
            uid={uid}
            iconName={type}
            title={name}
            subtitle={labels[type].label}
            onPress={navigateToSubitem.bind(this, id, false, type)} />
    }, [navigateToSubitem])

    return (
        <LoadingView loading={loading}>
            <KeyboardAwareFlatList
                keyboardOpeningTime={100}
                enableResetScrollToCoords={false}
                enableOnAndroid={true}
                extraHeight={250}
                enableAutomaticScroll={true}
                ListHeaderComponent={<ItemView
                    itemId={itemId}
                    isNew={isNew}
                    itemType={itemType}
                    navigateToView={submit}
                    navigateToSubitem={navigateToSubitem} />
                }
                data={subitems}
                renderItem={renderSubitem}
                keyExtractor={item => item.uid}
                contentContainerStyle={styles.scrollView} />
            <SaveButton />
        </LoadingView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72,
    }
})