import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "@ui-kitten/components"
import PotentialListItem from "./components/PoitentialListItem"
import BottomButton from "../../../components/BottomButton"
import LoadingView from "../../../components/LoadingView"
import usePotentialData from "./hooks/usePotentialData"
import UnitSelect from "./components/UnitSelect"
import AutoCreateToggle from "./components/AutoCreateToggle"
import { globalStyle } from "../../../styles/styles"
import NewPotentialModal from "./components/NewPotentialModal"

export const PotentialTypes = () => {
    const { unit, autoCreate, potentialTypes, visible, loading, name, nameValid, updateUnit, toggleAutoCreate, showModal, addPotential, dismissModal, deletePotential, onChangeName } = usePotentialData()
    const { standard, custom } = potentialTypes

    return (
        <LoadingView loading={loading}>
            <ScrollView
                contentContainerStyle={styles.container}>
                <View style={globalStyle.card}>
                    <UnitSelect
                        unit={unit}
                        updateUnit={updateUnit} />
                    <AutoCreateToggle
                        autoCreate={autoCreate}
                        toggleAutoCreate={toggleAutoCreate} />
                    <Text
                        appearance='hint'
                        category='label'
                        style={styles.label}>
                        Standard potential types
                    </Text>
                    {standard.map(({ id, name, uid }) =>
                        <PotentialListItem
                            id={id}
                            name={name}
                            key={uid}
                            custom={false}
                            deletePotential={deletePotential} />)}
                    {custom.length > 0 ? <>
                        <Text
                            appearance='hint'
                            category='label'
                            style={styles.label}>
                            Custom potential types
                        </Text>
                        {custom.map(({ id, name, uid }) =>
                            <PotentialListItem
                                id={id}
                                name={name}
                                key={uid}
                                custom={true}
                                deletePotential={deletePotential} />)}
                    </> : null}
                </View>
            </ScrollView>
            <BottomButton
                title='Add potential type'
                icon={'plus-circle'}
                onPress={showModal} />
            <NewPotentialModal
                name={name}
                nameValid={nameValid}
                visible={visible}
                addPotential={addPotential}
                dismissModal={dismissModal}
                onChangeName={onChangeName} />
        </LoadingView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 72,
    },
    label: {
        paddingBottom: 6,
        paddingTop: 12
    }
})