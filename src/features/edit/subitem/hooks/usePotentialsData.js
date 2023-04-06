import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPotentialList, updatePotentialList, createPotential } from '../../../../app/controllers/survey/subitems/PotentialController'
import { errorHandler } from '../../../../helpers/error_handler'
import { loadPotentialsState, resetPotentialsState } from '../../../../store/actions/potentials'
import { EventRegister } from 'react-native-event-listeners'
import { addPotential, removePotential, updatePotentials } from '../../../../store/actions/potentials'
import fieldValidation from '../../../../helpers/validation'
import { onSubitemSave } from '../../../../helpers/events'

const usePotentialsData = ({ itemId, subitemId }) => {
    const potentialsData = useSelector(state => state.potentials)
    const { potentials, referenceCells, potentialTypes, unit, loading } = potentialsData
    const dispatch = useDispatch()

    //array of rc and types that are used for potentials add button
    const selected = useMemo(() => {
        return potentials.map(p => ({
            referenceCellIndex: referenceCells.findIndex(rc => (rc.id === p.referenceCellId) && (rc.isPortable == p.isPortable)),
            potentialTypeIndex: potentialTypes.findIndex(pt => pt.id === p.potentialTypeId)
        }
        )).filter(({ referenceCellIndex, potentialTypeIndex }) => (referenceCellIndex !== -1 && potentialTypeIndex !== -1))
    }, [potentials.length, referenceCells, potentialTypes])

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getPotentialList({ itemId, subitemId },
                (err) => errorHandler(err))
            if (status === 200) {
                const { referenceCells, potentialTypes, unit, potentials } = response
                dispatch(loadPotentialsState(referenceCells, potentialTypes, unit, potentials))
            }
            else errorHandler(612)
        }
        loadData()

        return () => {
            dispatch(resetPotentialsState())
        }
    }, [])

    useEffect(() => {
        const onSaveHandler = EventRegister.addEventListener(onSubitemSave, async ({ potentials }) => {
            if (!loading)
                await updatePotentialList(
                    { potentials, subitemId },
                    er => errorHandler(er),
                    (result) => EventRegister.emit('POTENTIALS_UPDATED', { potentials: result, subitemId }))
        })
        return () => {
            EventRegister.removeEventListener(onSaveHandler)
        }
    },
        [loading])

    //creates potential in state
    const createPotentialHandler = useCallback(async (potentialTypeIndex, referenceCellIndex) => {
        const { status, response } = await createPotential({ referenceCells, potentialTypes, subitemId, referenceCellIndex, potentialTypeIndex },
            er => errorHandler(er))
        if (status === 200) {
            dispatch(addPotential(response))
        }
    }, [dispatch, referenceCells, potentialTypes, subitemId])

    //deletes potential from state
    const deletePotentialHandler = useCallback(async (index) => {
        dispatch(removePotential(index))
    }, [dispatch])

    //updates potential value in state
    const updatePotentialHandler = useCallback((value, index) => {
        const validate = fieldValidation(value, 'potential')
        dispatch(updatePotentials(index, validate.value, validate.valid))
    }, [dispatch])

    return {
        potentialsData,
        selected,
        createPotentialHandler,
        deletePotentialHandler,
        updatePotentialHandler
    }
}


export default usePotentialsData