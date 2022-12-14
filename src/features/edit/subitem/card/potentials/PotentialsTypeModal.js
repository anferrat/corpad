import React from 'react'
import { ScrollView, Modal, StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import Header from '../../../../../components/Header'
import PoitentialListItem from '../../components/PoitentialListItem'
import { basic } from '../../../../../styles/colors'

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
            <Header
                title='Select potential type'
                onBackPress={props.dismiss} />
            <ScrollView style={styles.mainView}>
                {genTitleOptions()}
                <View style={styles.hint}>
                    <Icon name='info-outline' fill={basic} style={styles.hintIcon} />
                    <Text category='s2' appearance='hint'>Create custom potentials types in Settings {`->`} Potentials</Text>
                </View>
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
    },
    hint: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    hintIcon: {
        width: 20,
        height: 20,
        marginRight: 12
    }
})
