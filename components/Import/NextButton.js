import React from "react"
import { useSelector } from "react-redux"
import MainActionButton from "../_Stateless/MainActionButton"

const NextButton = (props) => {
    const disabled = useSelector(state => state.importData.fileName === null)
    return (
        <MainActionButton
            disabled={disabled}
            title='Next'
            valid={true}
            onPress={props.onPress}
        />
    )
}

export default NextButton