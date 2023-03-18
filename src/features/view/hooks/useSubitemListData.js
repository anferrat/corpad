import { useNavigation } from '@react-navigation/native'
import { useRef, useCallback, useReducer, useEffect } from 'react'
import { reducer, initialState } from '../store/reducers/subitemList'
import { updatePotential } from '../../../app/controllers/survey/subitems/PotentialController'
import { getSubitemListData } from '../../../app/controllers/survey/subitems/SubitemController'
import { errorHandler } from '../../../helpers/error_handler'
import { updatePotentialAction, loadSubitemListDataAction, updatePropertyAction, validateCouponCurrentAction, validateVoltageDropAction, validateCurrentAction, toggleShortedAction, validateVoltageAction } from '../store/actions/subitemList'
import fieldValidation from '../../../helpers/validation'

//local reducer is used here, mostly global one from redux is used

const useSubitemListData = ({ itemId, itemType }) => {
    const navigation = useNavigation()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { potentialUnit, subitems, pipelineList, loading } = state
    const componentMounted = useRef(true)

    //in case of multiple reference cells, we display hint at potential field with ref cell name
    const potentialHint = state.referenceCells.length > 1

    useEffect(() => {
        componentMounted.current = true

        const loadData = async () => {
            const { response, status } = await getSubitemListData({ itemId, itemType }, er => errorHandler(er, navigation.goBack))
            if (status === 200 && componentMounted.current)
                dispatch(loadSubitemListDataAction(response.subitems, response.pipelineList, response.potentialUnit, response.referenceCells))
        }
        loadData()

        return () => {
            componentMounted.current = false
        }
    }, [])



    const validatePotential = useCallback(async (value, subitemIndex, potentialId, potentialIndex) => {
        const validation = fieldValidation(value, 'potential')
        if (validation.valid)
            await updatePotential({ id: potentialId, value: validation.value, unit: potentialUnit })
        dispatch(updatePotentialAction(subitemIndex, potentialIndex, validation.value, validation.valid))
    }, [potentialUnit])

    const updatePotentialValue = useCallback((value, subitemIndex, potentialIndex) => {
        dispatch(updatePotentialAction(subitemIndex, potentialIndex, value))
    }, [])

    const updatePropertyValue = useCallback((value, subitemIndex, property) => {
        dispatch(updatePropertyAction(subitemIndex, property, value))
    }, [])

    const validateCouponCurrent = useCallback((subitemIndex) => {
        dispatch(validateCouponCurrentAction(subitemIndex))
    }, [])

    const validateVoltageDrop = useCallback((subitemIndex) => {
        dispatch(validateVoltageDropAction(subitemIndex))
    }, [])

    const validateCurrent = useCallback((subitemIndex) => {
        dispatch(validateCurrentAction(subitemIndex))
    }, [])

    const updateShorted = useCallback((subitemIndex, shorted) => {
        dispatch(toggleShortedAction(subitemIndex, shorted))
    }, [])

    const validateVoltage = useCallback((subitemIndex) => {
        dispatch(validateVoltageAction(subitemIndex))
    }, [])

    return {
        potentialUnit,
        potentialHint,
        subitems,
        pipelineList,
        loading,
        validatePotential,
        updatePotentialValue,
        updatePropertyValue,
        validateCouponCurrent,
        validateVoltageDrop,
        validateCurrent,
        updateShorted,
        validateVoltage
    }
}

export default useSubitemListData