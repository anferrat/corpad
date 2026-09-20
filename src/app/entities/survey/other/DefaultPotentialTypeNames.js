import { PermanentPotentialTypes } from '../../../../constants/global'

export const defaultPotentialTypeNames = Object.freeze({
    [PermanentPotentialTypes.ON]: 'On',
    [PermanentPotentialTypes.OFF]: 'Off',
    [PermanentPotentialTypes.AC]: 'AC',
    [PermanentPotentialTypes.DEPOL]: 'Native',
    [PermanentPotentialTypes.CONNECTED]: 'Connected',
    [PermanentPotentialTypes.DISCONNECTED]: 'Disconnected'
})
