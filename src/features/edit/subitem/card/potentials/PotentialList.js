import React from 'react'
import PotentialField from './PotentialField'

const PotentialList = ({ potentials, submitValue, deletePotentialHandler }) => {
    return (
        <>
            {potentials.map((item, index) => <PotentialField
                deletePotentialHandler={deletePotentialHandler}
                key={item.uid}
                value={item.value}
                title={item.name}
                unit={item.unit}
                valid={item.valid}
                id={item.id}
                index={index}
                onSubmit={submitValue}
                referenceCellName={item.referenceCellName}
                referenceCellType={item.referenceCellType}
            />)}
        </>)
}

export default React.memo(PotentialList)