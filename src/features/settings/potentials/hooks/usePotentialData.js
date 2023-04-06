import { useNavigation } from "@react-navigation/native"
import { useCallback, useRef, useEffect, useState } from "react"
import { createPotentialType, deletePotentialType, getPotentialSettingData, updateAutoCreate, updatePotentialUnit } from "../../../../app/controllers/survey/other/PotentialSettingController"
import { errorHandler, warningHandler } from "../../../../helpers/error_handler"
import useModal from "../../../../hooks/useModal"
import fieldValidation from '../../../../helpers/validation'

const initPotentialName = {
    value: null,
    valid: true
}

const usePotentialData = () => {
    const { showModal, hideModal, visible } = useModal()
    const [unit, setUnit] = useState(null)
    const [loading, setLoading] = useState(true)
    const [autoCreate, setAutoCreate] = useState(false)
    const [potentialName, setPotentialName] = useState(initPotentialName)
    const [potentialTypes, setPotentialTypes] = useState({
        standard: [],
        custom: []
    })
    const navigation = useNavigation()
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        getPotentialSettingData(er => errorHandler(er, navigation.goBack), ({ autoCreate, unit, potentialTypes }) => {
            setUnit(unit)
            setAutoCreate(autoCreate)
            setPotentialTypes(potentialTypes)
            setLoading(false)
        })
        return () => {
            componentMounted.current = false
        }
    }, [])

    const updateUnit = useCallback(async (newUnit) => {
        setUnit(newUnit)
        const { status } = await updatePotentialUnit({ unit: newUnit }, er => errorHandler(er))
        if (status !== 200 && componentMounted.current)
            setUnit(unit)
    }, [unit])

    const toggleAutoCreate = useCallback(async (autoCreate) => {
        setAutoCreate(autoCreate)
        const { status } = await updateAutoCreate({ autoCreate }, er => errorHandler(er))
        if (status !== 200 && componentMounted.current)
            setAutoCreate(!autoCreate)
    }, [])

    const addPotential = useCallback(async () => {
        const { valid, value } = fieldValidation(potentialName.value, 'potentialName')
        if (valid) {
            hideModal()
            const { response, status } = await createPotentialType({ name: value }, er => errorHandler(er))
            if (componentMounted.current) {
                setPotentialName(initPotentialName)
                if (status === 200)
                    setPotentialTypes(state => ({
                        ...state,
                        custom: state.custom.concat(response)
                    }))
            }
        }
        else {
            setPotentialName({ value, valid })
            errorHandler(506)
        }
    }, [potentialName.value])

    const onChangeName = useCallback((text) => {
        setPotentialName({
            valid: true,
            value: text
        })
    }, [])

    const dismissModal = useCallback(() => {
        hideModal()
        setPotentialName(initPotentialName)
    }, [])

    const deletePotential = useCallback(async (id) => {
        const confirm = await warningHandler(21, 'Delete', 'Cancel')
        if (confirm) {
            const { status } = await deletePotentialType({ id: id }, er => errorHandler(er))
            if (status === 200 && componentMounted.current)
                setPotentialTypes(state => ({
                    ...state,
                    custom: state.custom.filter(potentialType => id !== potentialType.id)
                }))
        }
    }, [])


    return {
        unit,
        autoCreate,
        potentialTypes,
        visible,
        loading,
        name: potentialName.value,
        nameValid: potentialName.valid,
        updateUnit,
        toggleAutoCreate,
        showModal,
        dismissModal,
        addPotential,
        deletePotential,
        onChangeName
    }
}

export default usePotentialData
