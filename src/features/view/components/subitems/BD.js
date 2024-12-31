import React from 'react'
import Header from '../Header'
import Divider from '../Divider'
import InputWithTitle from '../InputWithTitle'
import SidesDisplay from '../SidesDisplay'


const BD = ({ data, updatePropertyValue, validateCurrent, subitemIndex, idMap, onEdit }) => {
    const { type, name, fromAtoB, current, valid, sideA, sideB } = data

    const currentValue = valid.current && current !== null ? current + ' A' : null

    const onChangeCurrent = React.useCallback((value) => {
        updatePropertyValue(value, subitemIndex, 'current')
    }, [subitemIndex, updatePropertyValue])

    const onEndEditing = React.useCallback(() => {
        validateCurrent(subitemIndex, data)
    }, [subitemIndex, current, validateCurrent])

    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider
                visible={true} />
            <SidesDisplay
                value={currentValue}
                fromAtoB={fromAtoB}
                idMap={idMap}
                sideA={sideA}
                sideB={sideB} />
            <Divider
                visible={true} />
            <InputWithTitle
                keyboardType='numeric'
                value={current}
                valid={valid.current}
                title='Current'
                onEndEditing={onEndEditing}
                onChangeText={onChangeCurrent}
                property='current'
                unit={'A'} />
        </>
    )
}
export default BD