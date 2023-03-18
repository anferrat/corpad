export const UPDATE_POTENTIALS = 'UPDATE_POTENTIALS'
export const LOAD_POTENTIALS_STATE = 'LOAD_POTENTIALS_STATE'
export const ADD_POTENTIAL = 'ADD_POTENTIAL'
export const DELETE_POTENTIAL = 'DELETE_POTENTIAL'
export const RESET_POTENTIALS_STATE = 'RESET_POTENTIALS_STATE'

export const updatePotentials = (index, value, valid = undefined) => {
    return { type: UPDATE_POTENTIALS, value: value, index: index, valid: valid }
}

export const loadPotentialsState = (referenceCells, potentialTypes, unit, potentials) => {
    return { type: LOAD_POTENTIALS_STATE, referenceCells, potentialTypes, unit, potentials }
}

export const addPotential = (potentialObject) => {
    return { type: ADD_POTENTIAL, potentialObject: potentialObject }
}

export const removePotential = (index) => {
    return { type: DELETE_POTENTIAL, index: index }
}

export const resetPotentialsState = () => {
    return { type: RESET_POTENTIALS_STATE }
}