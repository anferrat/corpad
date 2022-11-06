import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider } from '@ui-kitten/components'
import InputDataField from './InputDataField'
import SelectField from '../../_Stateless/SelectField'
import fieldValidation from '../../fieldValidation'
import { npsList } from '../../../constants/thicknessTable'
import CoatingPoint from './CoatingPoint'

const CoatingResistivity = (props) => {
    const setValue = React.useCallback((point, property, status, value) => {
        props.setData(old => {
            if (point === null)
                return ({
                    ...old, calculator: {
                        ...old.calculator, given:
                        {
                            ...old.calculator.given,
                            [property]: value
                        }
                    }
                }
                )
            else return ({
                ...old, calculator: {
                    ...old.calculator, given:
                    {
                        ...old.calculator.given,
                        [point]: {
                            ...old.calculator.given[point],
                            [property]: status === null ? value : {
                                ...old.calculator.given[point][property],
                                [status]: value
                            }
                        }
                    }
                }
            })
        })
    }, [props.setData])

    const selectAction = React.useCallback((value) => {
        setValue(null, 'npsIndex', null, value)
        props.setValid(old => ({ ...old, npsIndex: value !== null }))
    }, [props.setValid, setValue])

    const setValid = React.useCallback((point, property, status, value) => {
        const validation = fieldValidation(value, property, true)
        props.setValid(old => {
            if (point === null)
                return ({ ...old, [property]: validation.valid })
            else return ({
                ...old, [point]: { ...old[point], [property]: status === null ? validation.valid : { ...old[point][property], [status]: validation.valid } }
            })
        })
        if (validation.valid)
            setValue(point, property, status, validation.value)
    }, [props.setValid, setValue])
    return (
        <>

            <View style={styles.inputRow}>
                <InputDataField
                    point={null}
                    status={null}
                    property='spacing'
                    style={styles.inputLeft}
                    disabled={props.disabled}
                    maxLength={15}
                    setValue={setValue}
                    setValid={setValid}
                    label='Segment length'
                    value={props.data.spacing}
                    valid={props.valid.spacing}
                    unit={props.isMetric ? 'm' : 'ft'} />
                <SelectField
                    disabled={props.disabled}
                    valid={props.valid.npsIndex}
                    label={'Pipe diameter'}
                    placeholder={'Select diameter'}
                    style={styles.inputRight}
                    selectedItem={props.data.npsIndex}
                    itemsList={npsList}
                    selectAction={selectAction}
                />
            </View>
            <CoatingPoint
                disabled={props.disabled}
                label='Test point 1 - Start'
                point='start'
                data={props.data.start}
                valid={props.valid.start}
                setValue={setValue}
                setValid={setValid}
            />
            <Divider style={styles.divider} />
            <CoatingPoint
                disabled={props.disabled}
                label='Test point 2 - End'
                point='end'
                data={props.data.end}
                valid={props.valid.end}
                setValue={setValue}
                setValid={setValid}
            />
        </>
    )
}

export default CoatingResistivity

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: 16
    },
    inputLeft: {
        flex: 1,
        paddingRight: 6,
    },
    inputRight: {
        flex: 1,
        paddingLeft: 6,
        paddingBottom: 12
    },
    divider: {
        marginBottom: 24,
        marginTop: 12
    }
})