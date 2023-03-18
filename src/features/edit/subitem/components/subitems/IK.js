import React from 'react'
import Select from '../../../../../components/Select2'
import IsolationView from '../IsolationView'
import SidesView from '../SidesView'
import { isolationAssemblyTypes } from '../../../../../constants/constants'
import NameInput from '../NameInput'

const selectedTypes = ['RS', 'FC'] // types that can be used as side for IK card

const IKCard = ({ data, subitemList, update, validate, updateShortedHandler }) => {
    const { sideA, sideB, fromAtoB, name, defaultName, valid, current, isolationType, shorted } = data

    const onSelect = React.useCallback((index) => {
        update(index, 'isolationType')
    }, [update])

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
                shorted={shorted}
                selectedTypes={selectedTypes}
                subitemList={subitemList}
                fromAtoB={fromAtoB}
                sideA={sideA}
                sideB={sideB} />
            <Select
                onSelect={onSelect}
                property='isolationType'
                itemList={isolationAssemblyTypes}
                selectedIndex={isolationType}
                placeholderOption={true}
                placeholder="Select type"
                label='Type' />
            <IsolationView
                update={update}
                validate={validate}
                updateShortedHandler={updateShortedHandler}
                shorted={shorted}
                current={current}
                valid={valid.current} />
        </>
    )
}

export default React.memo(IKCard)