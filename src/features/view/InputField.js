import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { updateViewProperty } from '../../store/actions/item'
import fieldValidation from '../../helpers/validation'
import Input from '../../components/Input'
import { genRequestObject, parseToFloat, unitConverter } from '../../helpers/functions'
import { sendCombinedRequest } from '../../api/database/index'
import { primary } from '../../styles/colors'
import { errorHandler } from '../../helpers/error_handler'

const InputField = (props) => {
    const [value, setValue] = useState(props.value)
    const [valid, setValid] = useState(true)
    const componentMounted = useRef(true)
    const text = props.setValue ? props.value : value
    const setText = React.useMemo(() => props.setValue ?? setValue, [props.setValue])
    const dispatch = useDispatch()

    useEffect(() => () => componentMounted.current = false, [])

    const submitValue = React.useCallback(async (value, property, dataTypeSubitem, dataTypeItem, subitemId, itemId, potentialId, potentialUnit, onEndEditing) => {
        const validate = fieldValidation(value, property)
        setValid(validate.valid)
        if (validate.valid) {
            const newTime = Date.now()
            const request = [
                ['UPDATE', dataTypeItem + '_PROPERTY', { ...genRequestObject(dataTypeItem, itemId), property: 'timeModified', value: newTime }],
                property === 'potential' ?
                    ['UPDATE', 'POTENTIAL', { potentialId: potentialId, potentialObject: { value: unitConverter(value, potentialUnit.main, 'V'), unit: potentialUnit.main } }] :
                    //Important! input field only works for float values, if need TEXT change stuff
                    ['UPDATE', dataTypeSubitem + '_PROPERTY', { ...genRequestObject(dataTypeSubitem, subitemId), property: property, value: parseToFloat(validate.value) }]
            ]
            const update = await sendCombinedRequest(request)
            if (update.status === 200) {
                setText(validate.value)
                dispatch(updateViewProperty(newTime, 'timeModified'))
            }
            else errorHandler(623)
            if (onEndEditing)
                onEndEditing(validate.value)
        }
    }, [dispatch, setValid, setText])

    return (
        <Input
            {...props}
            value={text}
            valid={valid}
            onChangeText={setText}
            onEndEditing={submitValue.bind(this, text, props.property, props.dataTypeSubitem, props.dataTypeItem, props.subitemId, props.itemId, props.potentialId, props.unit, props.onEndEditing)} />
    )
}

export default (props) => {
    if (props.title)
        return (
            <View style={styles.mainView}>
                <Text style={styles.title} category='p2'>{props.title}</Text>
                <InputField {...props} style={props.displayHint ? styles.inputViewLarge : styles.inputView} textAlign='center' />
            </View>
        )
    else return <InputField {...props} />
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 6,
    },
    title: {
        paddingTop: 12,
        paddingLeft: 6,
        textTransform: 'uppercase',
        color: primary,
    },
    inputView: {
        width: 150
    },
    inputViewLarge: {
        width: 170
    }
})