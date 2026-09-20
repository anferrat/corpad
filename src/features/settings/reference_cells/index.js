import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "@ui-kitten/components"
import BottomButton from "../../../components/BottomButton"
import LoadingView from "../../../components/LoadingView"
import useRefCellData from "./hooks/useRefCellData"
import Hint from "../../../components/Hint"
import RefCellItem from "./components/RefCellItem"
import NewRefCellModal from "./components/NewRefCellModal"
import { globalStyle } from "../../../styles/styles"
import { translateSettings } from '../../../localization'

export const ReferenceCells = () => {
    const {
        loading,
        referenceCells,
        addReferenceCell,
        deleteReference,
        updateMain,
        dismissModal,
        name, rcType,
        showModal,
        onChangeType,
        onChangeName,
        nameValid,
        rcTypeValid,
        visible
    } = useRefCellData()

    return (
        <LoadingView loading={loading}>
            <NewRefCellModal
                name={name}
                rcType={rcType}
                visible={visible}
                onChangeType={onChangeType}
                onChangeName={onChangeName}
                dismissModal={dismissModal}
                nameValid={nameValid}
                rcTypeValid={rcTypeValid}
                addReferenceCell={addReferenceCell} />
            <ScrollView
                contentContainerStyle={styles.container}>
                <View
                    style={styles.mainView}>
                    <Text
                        appearance='hint'
                        category='label'
                        style={styles.label}>
                         {translateSettings('portableReferenceCells')}
                    </Text>
                    {referenceCells.map(({ id, uid, name, rcType, isMainReference }) =>
                        <RefCellItem
                            id={id}
                            deleteReference={deleteReference}
                            key={uid}
                            name={name}
                            updateMain={updateMain}
                            rcType={rcType}
                            selected={isMainReference} />)}
                    <View
                        style={styles.hint}>
                        <Hint>
                             {translateSettings('referenceCellsHint')}
                        </Hint>
                    </View>
                </View>
            </ScrollView>
            <BottomButton
                 title={translateSettings('addReferenceCell')}
                icon='plus-circle'
                onPress={showModal} />
        </LoadingView>
    )
}

export default ReferenceCells

const styles = StyleSheet.create({
    mainView: {
        ...globalStyle.card,
        paddingBottom: 12
    },
    label: {
        paddingBottom: 6,
    },
    hint: {
        paddingBottom: 12
    },
    container: {
        paddingBottom: 72
    }
})
