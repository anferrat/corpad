import { useNavigation } from '@react-navigation/native'
import { useCallback, useState, useRef, useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { deleteReferenceCell, getAllReferenceCells, updateMainReferenceCell, createReferenceCell } from '../../../../app/controllers/survey/other/ReferenceCellController'
import { errorHandler, warningHandler } from '../../../../helpers/error_handler'
import useModal from '../../../../hooks/useModal'
import fieldValidation from '../../../../helpers/validation'

const initRefCell = {
    name: null,
    rcType: null,
    nameValid: true,
    rcTypeValid: true
}

const useRefCellData = () => {
    const componentMounted = useRef(true)
    const { visible, showModal, hideModal } = useModal()
    const navigation = useNavigation()
    const [data, setData] = useState({
        referenceCells: [],
        loading: true
    })
    const [refCellData, setRefCellData] = useState(initRefCell)
    const { name, rcType, nameValid, rcTypeValid } = refCellData
    const { loading, referenceCells } = data

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getAllReferenceCells(er => errorHandler(er, navigation.goBack))
            if (status === 200)
                setData({
                    loading: false,
                    referenceCells: response
                })
        }
        loadData()
        return () => {
            componentMounted.current = false
            const updatedIndex = referenceCells.findIndex(({ isMainReference }) => isMainReference)
            if (~updatedIndex)
                EventRegister.emit('MAIN_REFERENCE_UPDATED', { id: referenceCells[updatedIndex].id })
        }
    }, [])

    const updateMain = useCallback(async (id) => {
        const { status } = await updateMainReferenceCell({ id }, er => errorHandler(er))
        if (status === 200)
            setData(state => ({
                ...state,
                referenceCells: state.referenceCells.map(rc => ({ ...rc, isMainReference: rc.id === id }))
            }))
    }, [])

    const deleteReference = useCallback(async (id) => {
        const confirm = await warningHandler(22, 'Delete', 'Cancel')
        if (confirm) {
            const { status } = await deleteReferenceCell({ id }, er => errorHandler(er))
            if (status === 200)
                setData(state => ({
                    ...state,
                    referenceCells: state.referenceCells.filter(rc => id !== rc.id)
                }))
        }
    }, [])

    const addReferenceCell = useCallback(async () => {
        const validation = fieldValidation(name, 'name_not_empty')
        if (validation.valid && rcType !== null) {
            const { status, response } = await createReferenceCell({ name: validation.value, rcType }, er => errorHandler(er))
            if (status === 200)
                setData(state => ({
                    ...state,
                    referenceCells: state.referenceCells.concat(response)
                }))
            dismissModal()
        }
        else {
            setRefCellData(state => ({
                ...state,
                name: validation.value,
                nameValid: validation.valid,
                rcTypeValid: rcType !== null
            }))
            errorHandler(505)
        }

    }, [dismissModal, name, rcType])

    const dismissModal = useCallback(() => {
        hideModal()
        setRefCellData(initRefCell)
    }, [setRefCellData, hideModal])

    const onChangeName = useCallback((text) => {
        setRefCellData(state => ({
            ...state,
            name: text
        }))
    }, [])

    const onChangeType = useCallback((index) => {
        setRefCellData(state => ({
            ...state,
            rcType: index,
            rcTypeValid: true
        }))
    }, [])

    return {
        loading,
        referenceCells,
        name,
        rcType,
        addReferenceCell,
        deleteReference,
        updateMain,
        visible,
        showModal,
        dismissModal,
        onChangeType,
        onChangeName,
        nameValid,
        rcTypeValid
    }
}

export default useRefCellData