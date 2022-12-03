import React from 'react'
import { CheckBox } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const CheckBoxData = (props) => {

    const checkBoxHandler = React.useCallback((isChecked) => {
        props.setData(old => ({
            ...old,
            pipeNameSelected: isChecked ? 1 : 0
        }))
    }, [props.setData])

    return (
        <CheckBox
            style={props.visible ? styles.visible : styles.hidden}
            checked={props.checked}
            onChange={checkBoxHandler}>
            Use pipeline name as default name for pipeline test leads and risers
        </CheckBox>
    )

}

export default CheckBoxData

const styles = StyleSheet.create({
    visible: {
        paddingBottom: 12,
    },
    hidden: {
        display: 'none'
    }
})