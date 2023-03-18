import React from 'react'
import Input from '../../../../../components/Input'
import NameInput from '../NameInput'
import SidesView from '../SidesView'


const selectedTypes = ['PL', 'AN', 'RS', 'FC'] // types that can be used as side for BD card. Consider importing them from app
const BDCard = ({ subitemList, data, update, validate }) => {
    const { name, defaultName, valid, sideA, sideB, fromAtoB, current } = data

    const onChangeText = React.useCallback((value) => {
        update(value, 'current')
    }, [update])

    const onEndEditing = React.useCallback(() => {
        validate('current')
    }, [validate])
    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <SidesView
                update={update}
                selectedTypes={selectedTypes}
                subitemList={subitemList}
                fromAtoB={fromAtoB}
                sideA={sideA}
                sideB={sideB} />
            <Input
                value={current}
                valid={valid.current}
                maxLength={8}
                keyboardType='numeric'
                unit={'A'}
                property='current'
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
                label='Bond current' />
        </>
    )
}

export default React.memo(BDCard)