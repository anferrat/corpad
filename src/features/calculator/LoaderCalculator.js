import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import ResultView from './ResultView'
import CalculatorComponent from './CalculatorComponent'
import { initialCalculatorData, initialValidObject, validateAll, getResult, addCoordinatesToExportedObject } from './helpers'
import UnitSelector from './UnitSelector'
import { errorHandler } from '../../helpers/error_handler'
import HistoryModal from './HistoryModal'
import { setExportModal } from '../../store/actions/settings'
import { deleteCalculator, deleteCalculatorsByType, saveCalculator, saveCalculatorDataToFile } from '../../app/controllers/CalculatorController'
import { CalculatorTypeFileNameLabels } from '../../constants/labels'
import BottomButton from '../../components/BottomButton'

const LoaderCalculator = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        disabled: false,
        savedInHistory: false,
        calculatorId: null,
        timeCreated: null,
        calculator: {
            isMetric: true,
            name: null,
            given: initialCalculatorData[props.calculatorType] ?? null,
            result: null,
            exportedObject: null,
            latitude: null,
            longitude: null
        }
    })
    const [valid, setValid] = useState(initialValidObject[props.calculatorType])

    const [coordValid, setCoordValid] = useState({ latitude: true, longitude: true })

    const setIsMetric = React.useCallback((useImperial) => {
        setData(old => ({ ...old, calculator: { ...old.calculator, isMetric: !useImperial } }))
    }, [props.setData])

    const calculateResult = React.useCallback(() => {
        const validate = validateAll(data.calculator.given, props.calculatorType)
        if (validate.isValid) {
            const result = getResult(data.calculator.given, props.calculatorType, data.calculator.isMetric)
            const timestamp = Date.now()
            setData(old => ({
                ...old,
                disabled: true,
                timeCreated: timestamp,
                calculator: {
                    ...old.calculator,
                    result: result.result,
                    exportedObject: addCoordinatesToExportedObject(data.calculator.latitude, data.calculator.longitude, result.exportedObject, timestamp),
                    name: result.label,
                }
            }))
        }
        else {
            errorHandler(505)
            setValid(validate.valid)
        }
    }, [setValid, valid, props.calculatorType, setData, data.calculator.isMetric, data.calculator.given, data.calculator.latitude, data.calculator.longitude])

    const resetCalculator = React.useCallback(() => {
        setData({
            disabled: false,
            savedInHistory: false,
            timeCreated: null,
            calculatorId: null,
            calculator: {
                isMetric: true,
                given: initialCalculatorData[props.calculatorType] ?? null,
                result: null,
                name: null,
                exportedObject: null,
                latitude: null,
                longitude: null
            }
        })
        setValid(initialValidObject[props.calculatorType])
    }, [setData, setValid, props.calculatorType])

    const exportCalculatorData = React.useCallback(async (exportedObject) => {
        const { status, response, errorMessage } =
            await saveCalculatorDataToFile({
                exportData: exportedObject,
                fileName: CalculatorTypeFileNameLabels[props.calculatorType]
            })
        if (status === 200) {
            const { filePath } = response
            dispatch(setExportModal(true, filePath, 'text/csv'))
        }
        else {
            errorHandler(status)
        }
    }, [dispatch])

    const saveCalculatorToDataBase = React.useCallback(async () => {
        const { response, status, errorMessage } = await saveCalculator({ data: data.calculator, calculatorType: props.calculatorType, latitude: data.calculator.latitude, longitude: data.calculator.longitude, name: data.calculator.name, timeCreated: data.timeCreated })
        if (status === 200) {
            const { id } = response
            setData(old => ({ ...old, savedInHistory: true, calculatorId: id, timeCreated: data.timeCreated }))
            return {
                status: 200
            }
        }
        else {
            errorHandler(status)
            return status
        }
    }, [setData, data.calculator, data.timeCreated, data.calculator.longitude, data.calculator.latitude])

    const loadCalculatorFromDataBase = React.useCallback((data, id, timeCreated) => {
        setData(old => ({
            ...old,
            timeCreated: timeCreated,
            savedInHistory: false,
            disabled: true,
            calculatorId: id,
            calculator: data
        }))
        setValid(initialValidObject[props.calculatorType])
    }, [setData])

    const deleteCalculatorFromDataBase = React.useCallback(async (id) => {
        const { status, errorMessage } = await deleteCalculator({ id })
        if (status === 200) {
            return true
        }
        else {
            errorHandler(status)
            return false
        }
    }, [])

    const deleteAllHistory = React.useCallback(async () => {
        const { status, errorMessage } = await deleteCalculatorsByType({ calculatorType: props.calculatorType })
        if (status === 200) {
            return true
        }
        else {
            errorHandler(status)
            return false
        }
    }, [props.calculatorType])

    return <>
        <ScrollView contentContainerStyle={data.disabled ? styles.scrollViewEmpty : styles.scrollViewNormal}>
            <View style={styles.topRow}>
                <UnitSelector
                    calculatorType={props.calculatorType}
                    disabled={data.disabled}
                    setIsMetric={setIsMetric}
                    isMetric={data.calculator.isMetric} />
                <HistoryModal
                    activeCalculatorId={data.calculatorId}
                    onDeleteHandler={deleteCalculatorFromDataBase}
                    onDeleteAllHandler={deleteAllHistory}
                    resetCalculator={resetCalculator}
                    loadHandler={loadCalculatorFromDataBase}
                    calculatorType={props.calculatorType} />
            </View>
            <ResultView
                savedInHistory={data.savedInHistory}
                saveHandler={saveCalculatorToDataBase}
                deleteOption={data.calculatorId !== null && !data.savedInHistory}
                onDeleteHandler={deleteCalculatorFromDataBase.bind(this, data.calculatorId)}
                resetHandler={resetCalculator}
                exportHandler={exportCalculatorData.bind(this, data.calculator.exportedObject)}
                calculatorType={props.calculatorType}
                result={data.calculator.result}
                display={data.calculator.result !== null} />
            <CalculatorComponent
                timeCreated={data.timeCreated}
                latitude={data.calculator.latitude}
                longitude={data.calculator.longitude}
                calculatorType={props.calculatorType}
                data={data.calculator.given}
                disabled={data.disabled}
                isMetric={data.calculator.isMetric}
                setData={setData}
                setValid={setValid}
                valid={valid}
                coordValid={coordValid}
                setCoordValid={setCoordValid}
            />
        </ScrollView>
        {!data.disabled ?
            <BottomButton
                icon='calculator'
                pack='cp'
                title={'Calculate'}
                onPress={calculateResult}
            /> : null}
    </>
}

export default LoaderCalculator

const styles = StyleSheet.create({
    scrollViewNormal: {
        paddingBottom: 72
    },
    scrollViewEmpty: {
        paddingBottom: 10
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})