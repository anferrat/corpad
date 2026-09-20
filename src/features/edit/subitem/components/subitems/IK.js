import React from 'react'
import Select from '../../../../../components/Select'
import IsolationView from '../IsolationView'
import SidesView from '../SidesView'
import NameInput from '../NameInput'
import { IsolationTypes } from '../../../../../constants/global'
import { IsolationTypeLabels } from '../../../../../constants/labels'
import { translateEdit } from '../../../../../localization'

const selectedTypes = ['RS', 'FC'] // types that can be used as side for IK card

const IKCard = ({ data, subitemList, update, validate, updateShortedHandler }) => {
    const { sideA, sideB, fromAtoB, name, defaultName, valid, current, isolationType, shorted } = data
    const isolationTypes = React.useMemo(() => Object.values(IsolationTypes).map(type => ({ item: IsolationTypeLabels[type], index: type })), [])

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
                itemList={isolationTypes}
                selectedIndex={isolationType}
                placeholderOption={true}
                placeholder={translateEdit('type')}
                label={translateEdit('type')} />
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
