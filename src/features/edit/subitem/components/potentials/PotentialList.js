import React from 'react'
import PotentialField from './PotentialField'

const PotentialList = ({ potentials, updatePotentialHandler, deletePotentialHandler, unit }) => {
    return (
        <>
            {potentials.map((item, index) => {
                const { id, uid, value, name, valid, referenceCellName, referenceCellType } = item
                return <PotentialField
                    deletePotentialHandler={deletePotentialHandler}
                    key={uid}
                    value={value}
                    title={name}
                    unit={unit}
                    valid={valid}
                    id={id}
                    index={index}
                    onSubmit={updatePotentialHandler}
                    referenceCellName={referenceCellName}
                    referenceCellType={referenceCellType}
                />
            })}
        </>)
}

export default React.memo(PotentialList)