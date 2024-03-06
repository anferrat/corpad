import React from 'react'
import PotentialTextLine from './PotentialTextLine'


const PotentialView = ({ potentials, potentialUnit }) => {
    if (!potentials)
        return null
    else {
        return potentials.map(({ uid, name, referenceCellType, value }) => (
            <PotentialTextLine
                key={uid}
                name={name}
                referenceCellType={referenceCellType}
                value={value}
                potentialUnit={potentialUnit}
            />
        ))
    }
}

export default PotentialView