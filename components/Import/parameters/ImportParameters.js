import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputFieldParamaters from './InputFieldParameters'
import SelectFieldParamaters from './SelectFieldparameters'
import TopBar from '../TopBar'
import { useSelector } from 'react-redux'
import { Input, Select } from '../../../models/importData'


const ImportParameters = (props) => {
    const isItem = props.subitemIndex === null || !props.subitemIndex
    const initValue = useSelector(state => isItem ? state.importData.item[props.property] : null)
    const fields = useSelector(state => state.importData.fields)
    const type = initValue instanceof Select ? 1 : (initValue instanceof Input ? 0 : null)
    console.log(initValue)
    if (type !== null)
        return (
            <>
                <TopBar
                    goBack={props.goBack}
                />

                {type ?
                    <SelectFieldParamaters
                        goBack={props.goBack}
                        property={props.property}
                        value={initValue}
                        fields={fields}
                    /> :
                    <InputFieldParamaters
                        goBack={props.goBack}
                        property={props.property}
                        value={initValue}
                        fields={fields}
                    />
                }

            </>
        )
    else return null
}

export default ImportParameters