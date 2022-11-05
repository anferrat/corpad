import React, { useState } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MainActionButton from '../_Stateless/MainActionButton'
import { primary } from '../../styles/GlobalStyle'
import { sendRequest } from '../../database/db'
import ResultView from './ResultView'
import CalculatorComponent from './CalculatorComponent'
import { initialCalculatorData, initialValidObject, validateAll, getResult } from './helpers'
import UnitSelector from './UnitSelector'
import { errorHandler } from '../errorHandler'
import HistoryModal from './HistoryModal'
import { useDispatch } from 'react-redux'
import { setExportModal } from '../../store/actions/settings'
import { writeFile } from '../../files/local/fs'
import { fileNameGen } from '../customFunctions'
import { calculatorTypes } from '../../constants/constants'
import { genCsv } from '../../files/helpers/genCsv'

const LoaderCalculator = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        disabled: false,
        savedInHistory: false,
        calculatorId: null,
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

    const setIsMetric = React.useCallback((useImperial) => {
        setData(old => ({ ...old, calculator: { ...old.calculator, isMetric: !useImperial } }))
    }, [props.setData])

    const calculateResult = React.useCallback(() => {
        const validate = validateAll(data.calculator.given, props.calculatorType)
        if (validate.isValid) {
            const result = getResult(data.calculator.given, props.calculatorType, data.calculator.isMetric)
            setData(old => ({
                ...old,
                disabled: true,
                calculator: {
                    ...old.calculator,
                    result: result.result,
                    exportedObject: result.exportedObject,
                    name: result.label,
                }
            }))
        }
        else {
            errorHandler(509)
            setValid(validate.valid)
        }
    }, [setValid, valid, props.calculatorType, setData, data.calculator.isMetric, data.calculator.given])

    const resetCalculator = React.useCallback(() => {
        setData({
            disabled: false,
            savedInHistory: false,
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
        const writeFs = await writeFile(genCsv(exportedObject), fileNameGen(calculatorTypes[props.calculatorType].fileName, 'csv'), 'exports', false)
        if (writeFs.status === 200)
            dispatch(setExportModal({ visible: true, fileUrl: writeFs.filePath, mimeType: 'text/csv' }))
    }, [dispatch])

    const saveCalculatorToDataBase = React.useCallback(async (calculatorData) => {
        const saveToDatabase = await sendRequest('INSERT', 'CALCULATOR', { calculatorType: props.calculatorType, timeCreated: Date.now(), data: JSON.stringify(calculatorData), name: calculatorData.name, latitude: null, longitude: null })
        if (saveToDatabase.status === 200) {
            setData(old => ({ ...old, savedInHistory: true, calculatorId: saveToDatabase.result }))
            return {
                status: 200
            }
        }
        else {
            errorHandler(saveToDatabase.status)
            return saveToDatabase
        }
    }, [setData])

    const loadCalculatorFromDataBase = React.useCallback((data, id) => {
        setData(old => ({
            ...old,
            savedInHistory: false,
            disabled: true,
            calculatorId: id,
            calculator: JSON.parse(data)
        }))
        setValid(initialValidObject[props.calculatorType])
    }, [setData])

    const deleteCalculatorFromDataBase = React.useCallback(async (id) => {
        const deleteAction = await sendRequest('DELETE', 'CALCULATOR', { calculatorId: id })
        if (deleteAction.status === 200) {
            return true
        }
        else {
            errorHandler(deleteAction.status)
            return false
        }
    }, [])

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
                    loadHandler={loadCalculatorFromDataBase}
                    calculatorType={props.calculatorType} />
            </View>
            <ResultView
                savedInHistory={data.savedInHistory}
                saveHandler={saveCalculatorToDataBase.bind(this, data.calculator)}
                deleteOption={data.calculatorId !== null && !data.savedInHistory}
                onDeleteHandler={deleteCalculatorFromDataBase.bind(this, data.calculatorId)}
                resetHandler={resetCalculator}
                exportHandler={exportCalculatorData.bind(this, data.calculator.exportedObject)}
                calculatorType={props.calculatorType}
                result={data.calculator.result}
                display={data.calculator.result !== null} />
            <CalculatorComponent
                calculatorType={props.calculatorType}
                data={data.calculator.given}
                disabled={data.disabled}
                isMetric={data.calculator.isMetric}
                setData={setData}
                setValid={setValid}
                valid={valid}
            />
        </ScrollView>
        {!data.disabled ?
            <MainActionButton
                title={'Calculate'}
                onPress={calculateResult}
                valid={true}
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
        paddingTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})