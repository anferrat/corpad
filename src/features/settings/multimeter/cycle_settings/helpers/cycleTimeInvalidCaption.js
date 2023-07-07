import { MultimeterTypes } from "../../../../../constants/global"

export const getCaption = (multimeterType) => {
    switch (multimeterType) {
        case MultimeterTypes.POKIT:
            return 'Pokit multimeter supports cycles of a minimum 1000 ms and maximum of 20 000 ms.'
        default:
            return 'Unsupported cycle time configuration. Please use one of the the standard cycle time configurations'
    }
}