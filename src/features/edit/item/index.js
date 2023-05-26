import React from 'react'
import { StyleSheet } from 'react-native'
import ItemView from './ItemView'
import SaveButton from './SaveButton'
import useSubitemListData from './hooks/useSubitemListData'
import SubitemListItem from './components/SubitemListItem'
import LoadingView from '../../../components/LoadingView'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { SubitemTypeLabels } from '../../../constants/labels'
import { SubitemTypeIcons } from '../../../constants/icons'


export const EditItem = ({ itemId, isNew, itemType, navigateToSubitem, submit }) => {
    const { subitems, loading } = useSubitemListData({ itemId, itemType })

    const renderSubitem = React.useCallback(({ item }) => {
        const { uid, type, id, name } = item
        return <SubitemListItem
            uid={uid}
            iconName={SubitemTypeIcons[type]}
            title={name}
            subtitle={SubitemTypeLabels[type]}
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