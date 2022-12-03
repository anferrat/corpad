import React from 'react'
import { ScrollView, Modal, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import HeaderTitle from '../../components/HeaderTitle'
import PoitentialListItem from '../../components/PoitentialListItem'
import { genRefCellDescription } from '../../../../../helpers/functions'

const ReferenceCellModal = (props) => {

    const selectRefCellHandler = React.useCallback((id, isPortable) => {
        props.onReferenceSelectHandler(id, isPortable)
        props.dismiss()
    }, [props.dismiss, props.onReferenceSelectHandler])

    const genReferenceCellList = React.useCallback((list) => {
        if (list.length === 0)
            return <Text appearance='hint' style={styles.emptyValue}>No available options</Text>
        else return list.map(rc => <PoitentialListItem
            key={rc.uid}
            permanent={true}
            icon='RE'
            pack='cp'
            title={rc.name}
            subtitle={genRefCellDescription(rc.rcType)}
            onPress={selectRefCellHandler.bind(this, rc.id, rc.isPortable)}
        />)
    }, [selectRefCellHandler])

    return (
        <Modal
            style={styles.modal}
            animationType="slide"
            statusBarTranslucent={true}
            onRequestClose={props.dismiss}
            visible={props.visible}>
            <HeaderTitle
                title='Select reference cell'
                backAction={props.dismiss} />
            <ScrollView style={styles.mainView}>
                <Text style={styles.title} appearance='hint'>
                    Portable
                </Text>
                {genReferenceCellList(props.referenceCellList?.filter(rc => rc.isPortable))}
                <Text style={styles.title} appearance='hint'>Stationary
                </Text>
                {genReferenceCellList(props.referenceCellList?.filter(rc => !rc.isPortable))}
            </ScrollView>
        </Modal>
    )
}

export default React.memo(ReferenceCellModal)

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#fff'
    },
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