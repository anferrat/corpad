import React, { memo, useCallback, useMemo } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { FlashList } from '@shopify/flash-list'
import { useHistoryModal } from '../hooks/useHistoryModal'
import HistoryReadingListItem from './HistoryReadingListItem'
import LoadingView from '../../../../components/LoadingView'
import Header from '../../../../components/Header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { basic200, control, primary } from '../../../../styles/colors'
import { shareIcon, trashIcon } from '../../../../components/Icons'
import EmptyHistoryReadingListComponent from './EmptyHistoryReadingListComponent'


const HistoryModalContent = ({ hideModal }) => {
    const {
        readings,
        loading,
        onDeletePress,
        onExportPress,
        onDeleteAllPress
    } = useHistoryModal({ hideModal })

    const renderItem = useCallback(({ item }) => <HistoryReadingListItem
        reading={item}
        onDeletePress={onDeletePress}
    />, [onDeletePress])

    const ListHeader = useMemo(() => (
        <View
            style={styles.buttons}>
            <Button
                accessoryLeft={shareIcon}
                appearance='ghost'
                style={styles.button}
                onPress={onExportPress}>
                Export
            </Button>
            <Button
                accessoryLeft={trashIcon}
                status='danger'
                appearance='ghost'
                style={styles.button}
                onPress={onDeleteAllPress}>
                Delete all
            </Button>
        </View>
    ), [onDeleteAllPress, onExportPress])

    return (
        <SafeAreaProvider>
            <Header
                title={'History'}
                onBackPress={hideModal} />
            <LoadingView
                loading={loading}>
                <View
                    style={styles.container}>
                    <FlashList
                        ListEmptyComponent={<EmptyHistoryReadingListComponent />}
                        ListHeaderComponent={readings.length === 0 ? null : ListHeader}
                        data={readings}
                        renderItem={renderItem}
                        estimatedItemSize={70}
                    />
                </View>
            </LoadingView>
        </SafeAreaProvider>
    )
}


export default React.memo(HistoryModalContent)

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //paddingVertical: 12,
    },
    button: {
        height: 60,
        marginVertical: 12,
        width: '40%'
    },
    container: {
        flex: 1,
        backgroundColor: control
    }
})