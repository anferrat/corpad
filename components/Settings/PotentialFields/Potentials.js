import React, { useState, useEffect, useRef } from "react"
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { Text } from "@ui-kitten/components"
import PotentialListItem from "../../_Stateless/Settings/PoitentialListItem"
import { sendRequest } from "../../../database/db"
import NewPotentialInput from "./NewPotentialInput"
import DefaultUnit from "./DefaultUnit"
import AutoCreatePotentials from "./AutoCreatePotentials"
import MainActionButton from '../../_Stateless/MainActionButton'
import { errorHandler, warningHandler } from "../../errorHandler"
import IdGen from '../../IdGen'
import fieldValidation from '../../fieldValidation'

const Potentials = (props) => {
    const [defaultUnit, setDefaultUnit] = useState(null)
    const [autoCreate, setAutoCreate] = useState(null)
    const [potentialFields, setPotentialFields] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const componentMounted = useRef(true)


    const fetchFields = React.useCallback(async () => {
        setIsLoading(true)
        componentMounted.current = true
        const data = await sendRequest('SELECT', 'POTENTIAL_TYPES', {})
        const settings = (await sendRequest('SELECT', 'SETTINGS', {}))
        if (data.status === 200 && settings.status === 200) {
            if (componentMounted.current) {
                setPotentialFields(data.result)
                setDefaultUnit(settings.result?.defaultPotentialUnit ?? 0)
                setIsLoading(false)
                setAutoCreate(settings.result?.autoCreatePotentials ?? 0)
            }
        }
        else
            errorHandler(622, props.goBack)

    }, [componentMounted, setIsLoading, setDefaultUnit])

    useEffect(() => {
        fetchFields()
        return () => {
            componentMounted.current = false
        }
    }, [])



    const removeField = React.useCallback(async (id) => {
        const confirm = await warningHandler(21, 'I understand', 'Cancel')
        if (confirm) {
            const deletePotential = await sendRequest('DELETE', 'POTENTIAL_TYPE', { potentialFieldId: id })
            if (deletePotential.status === 200 && componentMounted.current)
                setPotentialFields(old => old.filter(f => f.id !== id))
            else
                errorHandler(601)
        }
    }, [setPotentialFields])

    const addPotentialField = React.useCallback(async (name) => {
        const validation = fieldValidation(name, 'potentialName')
        if (validation.value !== null) {
            if (validation.valid) {
                const uid = IdGen()
                const id = await sendRequest('INSERT', 'POTENTIAL_TYPE', { name: validation.value, uid: uid, permType: null, custom: 1 })
                if (id.status === 200 && componentMounted.current) {
                    setPotentialFields(old => [{ name: validation.value, uid: uid, id: id.result, permType: null, custom: 1 }].concat(old))
                }
                else
                    errorHandler(623)
            }
            else
                errorHandler(506)
        }
        else errorHandler(506)
    }, [setPotentialFields])

    const potentialsDisplay = React.useMemo(() => potentialFields.map(f => <PotentialListItem title={f.name} key={f.uid} permanent={!f.custom} onDelete={removeField.bind(this, f.id)} />), [potentialFields, removeField])

    if (isLoading)
        return <View style={styles.empty}><ActivityIndicator /></View>
    else
        return (
            <>
                <View style={styles.mainView}>
                    <DefaultUnit
                        defaultUnit={defaultUnit} />
                    <AutoCreatePotentials
                        checked={autoCreate} />
                    <NewPotentialInput
                        addPotentialField={addPotentialField}
                        setPotentialFields={setPotentialFields} />
                    <ScrollView
                        style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        StickyHeaderComponent={() => <Text category='label' appearance='hint'>Potential types</Text>}>
                        {potentialsDisplay}
                    </ScrollView>
                </View>
                <MainActionButton
                    title='Back'
                    valid={true}
                    onPress={props.goBack}
                />
            </>
        )
}

export default Potentials

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff',
        flex: 1,
    },
    list: {
        padding: 12,
        flex: 1,
    },
    listContainer: {
        paddingBottom: 80
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})