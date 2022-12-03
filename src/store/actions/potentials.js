export const UPDATE_POTENTIALS = 'UPDATE_POTENTIALS'
export const LOAD_POTENTIALS_STATE = 'LOAD_POTENTIALS_STATE'
export const ADD_POTENTIAL = 'ADD_POTENTIAL'
export const DELETE_POTENTIAL = 'DELETE_POTENTIAL'

export const updatePotentials = (index, value, unit = undefined, valid = undefined) => {
    return { type: UPDATE_POTENTIALS, value: value, index: index, unit: unit, valid: valid }
}

export const loadPotentialsState = (potentialsArray) => {
    return { type: LOAD_POTENTIALS_STATE, potentialsArray: potentialsArray }
}

export const addPotential = (potentialObject) => {
    return { type: ADD_POTENTIAL, potentialObject: potentialObject }
}

export const deletePotential = (index) => {
    return { type: DELETE_POTENTIAL, index: index }
}