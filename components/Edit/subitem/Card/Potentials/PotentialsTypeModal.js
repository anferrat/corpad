import React from 'react'
import { ScrollView, Modal, StyleSheet} from 'react-native'
import HeaderTitle from '../../../../_Stateless/Potentials/HeaderTitle'
import PoitentialListItem from '../../../../_Stateless/Settings/PoitentialListItem'

const PotentialTypesModal = (props) => {
    const onTypeSelect = React.useCallback((typeIndex) => {
        props.setPotentialType(typeIndex)
        props.dismiss()
    }, [props.dismiss, props.setPotentialType])

    const genTitleOptions = React.useCallback(() =>
        props.potentialTypes.map((t, i) =>
            <PoitentialListItem
                key={'PotentialType-' + t.uid}
                title={t.name}
                permanent={true}
                onPress={onTypeSelect.bind(this, i)} />
        ), [props.potentialTypes, onTypeSelect])

    return (
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            style={styles.modal}
            onRequestClose={props.dismiss}
            visible={props.visible}>
            <HeaderTitle
                title='Select potential type'
                backAction={props.dismiss} />
            <ScrollView style={styles.mainView}>
                {genTitleOptions()}
            </ScrollView>
        </Modal>
    )
}

export default React.memo(PotentialTypesModal)


const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    mainView: {
        padding: 12
    },
    unitSelection: {

    },
    hidden: {
        display: 'none'
    },
    button: {
        flex: 1,
        height: 50
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 6,
        marginLeft: 10
    },
    radio: {
        height: 40,
        marginLeft: 16,
        alignItems: 'center'
    }
})
