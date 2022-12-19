import React, { useEffect, useState, useRef } from 'react'
import { Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { loadPotentialsState, addPotential, deletePotential, updatePotentials } from '../../../../../store/actions/potentials'
import { useSelector, useDispatch } from 'react-redux'
import { sendCombinedRequest, sendRequest } from '../../../../../api/database/index'
import idGen from '../../../../../helpers/id_generator'
import fieldValidation from '../../../../../helpers/validation'
import { unitConverter } from '../../../../../helpers/functions'
import { errorHandler } from '../../../../../helpers/error_handler'
import { potentialUnits } from '../../../../../constants/constants'
import { AddPotentials } from '../../../../../components/AddPotentialModal'
import LoadingView from '../../../../../components/LoadingView'
import PotentialList from './PotentialList'

const initExtraData = {
    potentialTypes: [],
    defaultUnit: 0,
    isLoaded: false
}

const PotentialsView = (props) => {
    const dispatch = useDispatch()
    const potentials = useSelector(state => state.potentials)
    const runSaveEffect = useSelector(state => state.subitem.runSaveEffect)
    const [extraData, setExtraData] = useState(initExtraData)
    const componentMounted = useRef(true)


    //This excludes current card from rcList if it's there (case if cardType is RE)
    const referenceCellList = React.useMemo(() => props.referenceCellList?.filter(rc => (rc.id !== props.cardId) || rc.isPortable), [props.referenceCellList])

    const addPotentialHandler = React.useCallback(async (potentialTypeIndex, referenceCellTypeIndex) => {
        const rc = referenceCellList[referenceCellTypeIndex]
        const pt = extraData.potentialTypes[potentialTypeIndex]
        if (rc && pt) {
            const uid = idGen()
            const data = await sendCombinedRequest([['INSERT', 'POTENTIAL', { isPortable: rc.isPortable, referenceCellId: rc.id, unit: null, cardId: props.cardId, uid: uid, potentialType: pt.id }]])
            if (data.status === 200) {
                dispatch(addPotential({
                    id: data.result[0],
                    isPortable: rc.isPortable,
                    potentialTypeId: pt.id,
                    name: pt.name,
                    referenceCellId: rc.id,
                    referenceCellName: rc.name,
                    referenceCellType: rc.rcType,
                    unit: potentialUnits[extraData.defaultUnit],
                    value: null,
                    valid: true,
                    uid: uid,
                }))
            }
            else errorHandler(609)
        }
        else errorHandler(609)
    }, [dispatch, props.cardId, extraData, referenceCellList])

    const deletePotentialHandler = React.useCallback(async (index, id) => {
        const deleteRequest = await sendRequest('DELETE', 'POTENTIAL', [{ potentialId: id }])
        if (deleteRequest.status !== 200)
            errorHandler(610)
        else {
            dispatch(deletePotential(index))
        }
    }, [dispatch])

    const submitValue = React.useCallback((value, index) => {
        const validate = fieldValidation(value, 'potential')
        dispatch(updatePotentials(index, validate.value, undefined, validate.valid))
    }, [dispatch])

    const selectedPotentials = React.useMemo(() => {
        return potentials.map(p => (
            {
                referenceCellIndex: referenceCellList.findIndex(rc => (rc.id === p.referenceCellId) && (rc.isPortable == p.isPortable)),
                potentialTypeIndex: extraData.potentialTypes.findIndex(pt => pt.id === p.potentialTypeId)
            }
        )).filter(selected => (selected.referenceCellIndex !== -1 && selected.potentialTypeIndex !== -1))
    }, [potentials.length, referenceCellList, extraData])

    useEffect(() => {
        if (runSaveEffect) {
            const savePotentials = async () => {
                if (potentials?.length > 0) {
                    const updatePotRequest = await Promise.all(potentials.map(async potential => await sendRequest('UPDATE', 'POTENTIAL', {
                        potentialObject: {
                            ...potential,
                            unit: potential.unit, //unit is not really used, inside individual potential therefore we don't need to record it, but we do
                            value: unitConverter(potential.value, potentialUnits[extraData.defaultUnit], 'V')
                        },
                        potentialId: potential.id
                    })))

                    if (!updatePotRequest.every(req => req.status === 200))
                        errorHandler(611)
                }

            }
            savePotentials()
        }
    }, [runSaveEffect])

    useEffect(() => {
        componentMounted.current = true
        const getPotentials = async () => {
            const data = await sendCombinedRequest([['SELECT', 'POTENTIALS', { cardId: props.cardId }], ['SELECT', 'POTENTIAL_TYPES', {}], ['SELECT', 'SETTINGS', {}]])
            if (data.status === 200) {
                if (componentMounted.current) {
                    const potentialUnit = potentialUnits[data.result[2]?.defaultPotentialUnit]
                    dispatch(loadPotentialsState(data.result[0].map(data => {
                        const rcid = data.portableReferenceId !== null ? data.portableReferenceId : data.permanentReferenceId
                        const rcPortable = data.portableReferenceId !== null
                        const rc = props.referenceCellList.find(rc => (rc.id === rcid) && (rc.isPortable == rcPortable)) // == important here
                        return {
                            id: data.id,
                            uid: data.uid,
                            name: data.name,
                            potentialTypeId: data.potentialTypeId,
                            value: unitConverter(data.value, 'V', potentialUnit),
                            unit: potentialUnit,
                            referenceCellId: rcid,
                            referenceCellName: rc.name,
                            referenceCellType: rc.rcType,
                            valid: true,
                            isPortable: rcPortable
                        }
                    })))
                    setExtraData({
                        potentialTypes: data.result[1],
                        defaultUnit: data.result[2]?.defaultPotentialUnit ?? 0,
                        isLoaded: true
                    })
                }
            }
            else errorHandler(612)
        }
        getPotentials()
        return () => componentMounted.current = false
    }, [])
    return (
        <LoadingView loading={!extraData.isLoaded} size={'small'}>
            <View
                style={styles.mainView}>
                <Text
                    style={styles.label}
                    appearance='hint'
                    category='label'>
                    Potentials
                </Text>
                <PotentialList
                    potentials={potentials}
                    deletePotentialHandler={deletePotentialHandler}
                    submitValue={submitValue} />
                <AddPotentials
                    referenceCellList={props.referenceCellList}
                    potentialTypes={extraData.potentialTypes}
                    onSelect={addPotentialHandler}
                    selectedTypes={selectedPotentials} />
            </View>
        </LoadingView>
    )
}

export default React.memo(PotentialsView)

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    empty: {
        paddingVertical: 12
    },
    label: {
        paddingBottom: 4
    }
})