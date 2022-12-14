import React, { useEffect, useState, useRef } from 'react'
import { Text } from '@ui-kitten/components'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import PotentialField from './PotentialField'
import { loadPotentialsState, addPotential, deletePotential, updatePotentials } from '../../../../../store/actions/potentials'
import { useSelector, useDispatch } from 'react-redux'
import { sendCombinedRequest, sendRequest } from '../../../../../api/database/index'
import AddPotentialsButton from './AddPotentialsButton'
import idGen from '../../../../../helpers/id_generator'
import fieldValidation from '../../../../../helpers/validation'
import { unitConverter, verifyTypes } from '../../../../../helpers/functions'
import { errorHandler } from '../../../../../helpers/error_handler'
import { primary } from '../../../../../styles/colors'
import { potentialUnits } from '../../../../../constants/constants'

const initExtraData = {
    potentialTypes: [],
    defaultUnit: 0,
}

const PotentialsView = (props) => {
    const dispatch = useDispatch()
    const potentials = useSelector(state => state.potentials)
    const runSaveEffect = useSelector(state => state.subitem.runSaveEffect)
    const [isLoaded, setIsLoaded] = useState(false)
    const [extraData, setExtraData] = useState(initExtraData)
    const componentMounted = useRef(true)


    //This excludes current card from rcList if it's there (case if cardType is RE)
    const referenceCellList = React.useMemo(() => props.referenceCellList?.filter(rc => (rc.id !== props.cardId) || rc.isPortable), [props.referenceCellList])

    const getAvailableTypes = React.useCallback(() =>
        referenceCellList.map(rc => extraData.potentialTypes.filter(type => !verifyTypes(type.id, potentials.filter(p => p.referenceCellId === rc.id).map(p => p.type)))),
        [potentials.length, referenceCellList, extraData.potentialTypes])

    const getPotentialTypes = React.useMemo(() => {
        return extraData.potentialTypes.filter(type => verifyTypes(type.id, getAvailableTypes().flat(1).map(p => p.id)))
    }, [getAvailableTypes, extraData])

    const getReferenceCellList = React.useCallback((selectedType) => {
        return referenceCellList.filter((_, i) => verifyTypes(selectedType, getAvailableTypes()[i].map(p => p.id)))
    }, [getAvailableTypes, referenceCellList])

    const addPotentialHandler = React.useCallback(async (name, referenceCellId, isPortable, potentialType) => {
        const uid = idGen()
        const data = await sendCombinedRequest(['INSERT', 'POTENTIAL', { isPortable: isPortable, referenceCellId: referenceCellId, unit: null, cardId: props.cardId, uid: uid, potentialType: potentialType }, ['SELECT', 'SETTINGS', {}]])
        if (data.status === 200) {
            const potentialUnit = potentialUnits[data[1]?.defaultPotentialUnit ?? 0]
            dispatch(addPotential({
                id: data.result[0],
                isPortable: isPortable,
                name: name,
                referenceCellId: referenceCellId,
                unit: potentialUnit,
                cardId: props.cardId,
                value: null,
                valid: true,
                type: potentialType,
                uid: uid,
                potentialType: potentialType
            }))
        }
        else errorHandler(609)
    }, [dispatch, props.cardId])

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


    useEffect(() => {
        if (runSaveEffect) {
            const savePotentials = async () => {
                if (potentials?.length > 0) {
                    const updatePotRequest = await Promise.all(potentials.map(async potential => await sendRequest('UPDATE', 'POTENTIAL', {
                        potentialObject: {
                            ...potential,
                            value: unitConverter(potential.value, potential.unit, 'V')
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
                    const potentialUnit = potentialUnits[data.result[2]?.defaultPotentialUnit ?? 0]
                    dispatch(loadPotentialsState(data.result[0].map(data => {
                        return {
                            id: data.id,
                            uid: data.uid,
                            name: data.name,
                            type: data.type,
                            value: unitConverter(data.value, 'V', potentialUnit),
                            unit: potentialUnit,
                            referenceCellId: data.portableReferenceId !== null ? data.portableReferenceId : data.permanentReferenceId,
                            valid: true,
                            isPortable: data.portableReferenceId !== null
                        }
                    })))
                    setExtraData({
                        potentialTypes: data.result[1],
                    })
                    setIsLoaded(true)
                }
            }
            else errorHandler(612)
        }
        getPotentials()
        return () => componentMounted.current = false
    }, [])
    if (!isLoaded)
        return <View style={styles.empty}><ActivityIndicator color={primary} /></View>
    else
        return (
            <View
                style={styles.mainView}>
                <Text
                    style={styles.label}
                    appearance='hint'
                    category='label'>
                    Potentials
                </Text>
                {potentials.map((item, index) => <PotentialField
                    deletePotentialHandler={deletePotentialHandler}
                    key={item.uid}
                    value={item.value}
                    title={item.name}
                    unit={item.unit}
                    valid={item.valid}
                    id={item.id}
                    index={index}
                    onSubmit={submitValue}
                    refCell={referenceCellList.find(rc => (rc.id === item.referenceCellId) && (rc.isPortable == item.isPortable))}
                />)}
                <AddPotentialsButton
                    potentialTypes={getPotentialTypes}
                    getReferenceCellList={getReferenceCellList}
                    addPotentialHandler={addPotentialHandler}
                    referenceCellList={referenceCellList} />
            </View>
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