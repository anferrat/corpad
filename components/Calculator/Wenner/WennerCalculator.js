import React from 'react'
import { Button } from '@ui-kitten/components'
import WennerLayer from './WennerLayer'
import { plus } from '../../_Stateless/Icons'
import fieldValidation from '../../fieldValidation'

const WennerCalculator = (props) => {
    const MAX_NUMBER_OF_LAYERS = 5

    const addLayerHandler = React.useCallback(() => {
        if (props.data.layers.length < MAX_NUMBER_OF_LAYERS) {
            props.setData(old => ({ ...old, calculator: { ...old.calculator, given: { layers: old.calculator.given.layers.concat({ spacing: null, resistance: null }) } } }))
            props.setValid(old => ({ layers: old.layers.concat({ spacing: true, resistance: true }) }))
        }
    }, [props.setData, props.setValid, props.data.layers.length])

    const removeLayerHandler = React.useCallback((index) => {
        if (index !== 0) {
            props.setData(old => ({ ...old, calculator: { ...old.calculator, given: { layers: old.calculator.given.layers.filter((_, l) => l !== index) } } }))
            props.setValid(old => ({ layers: old.layers.filter((_, l) => l !== index) }))
        }
    }, [props.setData])

    const setValue = React.useCallback((index, property, value) => {
        props.setData(old => ({
            ...old, calculator: {
                ...old.calculator,
                given: {
                    layers: Object.assign([], old.calculator.given.layers, {
                        [index]: {
                            ...old.calculator.given.layers[index],
                            [property]: value,
                        }
                    })
                }
            }
        }))
    }, [props.setData])

    const setValid = React.useCallback((index, property, value) => {
        const validation = fieldValidation(value, property)
        props.setValid(old => ({
            layers: Object.assign([], old.layers, {
                [index]: {
                    ...old.layers[index],
                    [property]: validation.valid,
                }
            })
        }))
        if (validation.valid)
            setValue(index, property, validation.value)
    }, [props.setValid, setValue])

    return (
        <>
            <WennerLayer
                index={0}
                disabled={props.disabled}
                isMetric={props.isMetric}
                setValue={setValue}
                setValid={setValid}
                data={props.data.layers}
                valid={props.valid.layers}
                removeLayerHandler={removeLayerHandler} />
            <WennerLayer
                index={1}
                disabled={props.disabled}
                isMetric={props.isMetric}
                setValue={setValue}
                setValid={setValid}
                data={props.data.layers}
                valid={props.valid.layers}
                removeLayerHandler={removeLayerHandler} />
            <WennerLayer
                index={2}
                disabled={props.disabled}
                isMetric={props.isMetric}
                setValue={setValue}
                setValid={setValid}
                data={props.data.layers}
                valid={props.valid.layers}
                removeLayerHandler={removeLayerHandler} />
            <WennerLayer
                index={3}
                disabled={props.disabled}
                isMetric={props.isMetric}
                setValue={setValue}
                setValid={setValid}
                data={props.data.layers}
                valid={props.valid.layers}
                removeLayerHandler={removeLayerHandler} />
            <WennerLayer
                index={4}
                disabled={props.disabled}
                isMetric={props.isMetric}
                setValue={setValue}
                setValid={setValid}
                data={props.data.layers}
                valid={props.valid.layers}
                removeLayerHandler={removeLayerHandler} />
            {!props.disabled ?
                <Button appearance='ghost' onPress={addLayerHandler} accessoryLeft={plus} disabled={(props.data.layers.length >= MAX_NUMBER_OF_LAYERS)}>Add layer ({props.data.layers.length}/{MAX_NUMBER_OF_LAYERS})</Button>
                : null}
        </>)
}

export default React.memo(WennerCalculator)


