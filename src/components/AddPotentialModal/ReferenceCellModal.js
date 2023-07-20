import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Header from '../Header'
import PoitentialListItem from './components/PoitentialListItem'
import { ReferenceCellTypeLabels, ReferenceCellCodeLabels } from '../../constants/labels'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const ReferenceCellModal = ({ referenceCellList, itemList, onSelect, dismiss, selectedTypeIndex }) => {
    const list = itemList.filter(rc => rc.potentialTypes.indexOf(selectedTypeIndex) !== -1)
    const portableList = list.filter(referenceCell => referenceCellList[referenceCell.index].isPortable).map(rc => rc.index)
    const stationaryList = list.filter(referenceCell => !referenceCellList[referenceCell.index].isPortable).map(rc => rc.index)

    const genReferenceCellList = React.useCallback((list) => {
        if (list.length === 0)
            return <Text appearance='hint' style={styles.emptyValue}>No available options</Text>
        else return list.map(rc => (
            <PoitentialListItem
                key={`Reference cell-${referenceCellList[rc].id}`}
                icon='RE'
                pack='cp'
                title={referenceCellList[rc].name}
                subtitle={`${ReferenceCellTypeLabels[referenceCellList[rc].rcType] ?? ''} (${ReferenceCellCodeLabels[referenceCellList[rc].rcType] ?? 'Type is not selected'})`}
                onPress={onSelect.bind(this, rc)}
            />))
    }, [referenceCellList, onSelect])

    return (
        <SafeAreaProvider>
            <Header
                title='Select reference cell'
                onBackPress={dismiss} />
            <ScrollView style={styles.mainView}>
                <Text style={styles.title} appearance='hint'>
                    Portable
                </Text>
                {genReferenceCellList(portableList)}
                <Text style={styles.title} appearance='hint'>Stationary
                </Text>
                {genReferenceCellList(stationaryList)}
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default React.memo(ReferenceCellModal)

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },
    emptyValue: {
        margin: 12
    }
})