import React from 'react'
import RadioListOptiion from './RadioListOption'

const RadioListContent = (props) => {
    const renderOptions = React.useCallback((options, selected) =>
        options.map((option, index) => <RadioListOptiion
            key={'RadioOption' + option}
            title={option}
            selected={selected}
            onChange={props.onChange}
            value={index}
        />)
        , [props.onChange])

    return (
        <>
            {renderOptions(props.options, props.selected)}
        </>
    )
}

export default RadioListContent