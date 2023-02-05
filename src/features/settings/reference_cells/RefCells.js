import React, { useEffect, useState, useRef } from "react"
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native"
import { Text, Icon, Divider } from "@ui-kitten/components"
import { sendRequest } from "../../../api/database/index"
import PoitentialListItem from "./components/PoitentialListItem"
import { genRefCellDescription } from "../../../helpers/functions"
import NewRefCellButton from "./NewRefCellButton"
import idGen from '../../../helpers/id_generator'
import { basic } from "../../../styles/colors"
import MainActionButton from "../../../components/ActionButton"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"

const RefCells = (props) => {
    const [referenceList, setReferenceList] = useState([])
    const [mainReference, setMainReference] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const componentMounted = useRef(true)

    useEffect(() => {
        const fetchData = async () => {
            componentMounted.current = true
            setIsLoading(true)
            const list = await sendRequest('SELECT', 'REFERENCE_CELL_LIST', {})
            if (list.status === 200) {
                const mainRef = list.result.findIndex(rc => !!rc.mainReference)
                if (mainRef !== -1) {
                    if (componentMounted.current) {
                        setReferenceList(list.result)
                        setMainReference(list.result[mainRef])
                        setIsLoading(false)
                    }
                }
                else {
                    //if there is no main reference create one or update existed to become main
                    if (list.result.length === 0) {
                        const rc = { uid: idGen(), mainReference: 1, rcType: 0, name: 'RC1' }
                        const id = await sendRequest('INSERT', 'REFRENCE_CELL', rc)
                        if (id.status === 200) {
                            setReferenceList([{ ...rc, id: id }])
                            setMainReference({ ...rc, id: id })
                        }
                        else errorHandler(id.status, props.goBack)
                        setIsLoading(false)
                    }
                    else {
                        const update = await sendRequest('UPDATE', 'REFERENCE_CELL', { referenceCellId: list.result[0].id, referenceCellObject: { name: list.result[0].name, rcType: list.result[0].rcType, mainReference: 1 } })
                        if (update.status === 200) {
                            setReferenceList([...list.result.filter((_, i) => i !== 0), { ...list.result[0], mainReference: 1 }])
                            setMainReference({ ...list.result[0], mainReference: 1 })
                        }
                        else errorHandler(update.status, props.goBack)
                        setIsLoading(false)
                    }
                }
            }
            else
                errorHandler(600, props.goBack)
        }
        fetchData()
        return () => componentMounted.current = false
    }, [setReferenceList, setMainReference, setIsLoading])

    const changeMainReferenceHandler = React.useCallback(async (rc, mainRc) => {
        if (rc.id !== mainRc.id) {
            const updateRequest = await sendRequest('UPDATE', 'REFERENCE_CELL', [
                { referenceCellId: rc.id, referenceCellObject: { name: rc.name, rcType: rc.rcType, mainReference: 1 } },
                { referenceCellId: mainRc.id, referenceCellObject: { name: mainRc.name, rcType: mainRc.rcType, mainReference: 0 } }
            ])
            if (updateRequest.status === 200 && componentMounted.current) {
                setMainReference(rc)
            }
            else
                errorHandler(623)
        }
    }, [setMainReference, componentMounted])

    const addRefCell = React.useCallback(async (name, type) => {
        const uid = idGen()
        const id = await sendRequest('INSERT', 'REFERENCE_CELL', { uid: uid, isMainReference: 0 })
        if (id.status === 200) {
            const updateRequest = await sendRequest('UPDATE', 'REFERENCE_CELL', { referenceCellId: id.result, referenceCellObject: { name: name, rcType: type, mainReference: false } })
            if (updateRequest.status === 200 && componentMounted.current)
                setReferenceList(old => old.concat({ id: id.result, mainReference: 0, name: name, rcType: type, uid: uid }))
            else {
                errorHandler(623)
                await sendRequest('DELETE', 'REFERENCE_CELL', { referenceCellId: id.result })
            }
        }
        else errorHandler(623)
    }, [setReferenceList, componentMounted])

    const deleteRefCell = React.useCallback(async (id) => {
        const confirm = await warningHandler(22, 'Delete', 'Cancel')
        if (confirm) {
            const selectRef = await sendRequest('SELECT', 'REFERENCE_CELL_LIST', {})
            if (selectRef.status === 200) {
                const refIndex = selectRef.result.findIndex(rc => rc.id === id)
                const notMain = refIndex === -1 ? true : !(selectRef.result[refIndex].mainReference === 1)
                if (notMain) {
                    const deleteRequest = await sendRequest('DELETE', 'REFERENCE_CELL', { referenceCellId: id })
                    if (deleteRequest.status === 200 && componentMounted.current)
                        setReferenceList(old => old.filter(rc => rc.id !== id))
                    else errorHandler(601)
                }
                else errorHandler(631)
            }
            else errorHandler(601)

        }

    }, [setReferenceList, componentMounted])

    if (isLoading) return <View style={styles.emptyView}><ActivityIndicator /></View>
    else
        return (
            <View style={styles.mainView}>
                <NewRefCellButton
                    addRefCell={addRefCell} />
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.container}>
                    {referenceList.map((rc, i) => <PoitentialListItem
                        title={rc.name}
                        pack='cp'
                        icon='RE'
                        onDelete={deleteRefCell.bind(this, rc.id)}
                        subtitle={genRefCellDescription(rc.rcType)}
                        permanent={rc.id === mainReference.id}
                        disabled={rc.id === mainReference.id}
                        onPress={changeMainReferenceHandler.bind(this, rc, mainReference)}
                        key={rc.uid}
                        checked={rc.id === mainReference.id} />)}
                </ScrollView>
                <Divider />
                <Text style={styles.text} category='s2' appearance='hint'>
                    <Icon
                        name='alert-circle-outline'
                        style={styles.textIcon}
                        fill={basic} />
                    You can add multiple portable references in one survey. Potentials with active reference cell will be displayed with the test point info in the list. If you use more than one reference, you will have to indicate which one you want to use, when creating potential readings.
                </Text>
                <MainActionButton
                    title='Back'
                    valid={true}
                    onPress={props.goBack} />
            </View>
        )
}

export default RefCells

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingBottom: 12,
    },
    scroll: {
        padding: 12,
        flex: 0.9,
    },
    textIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    text: {
        flex: 1,
        margin: 12,
    },
    emptyView: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center'
    }
})