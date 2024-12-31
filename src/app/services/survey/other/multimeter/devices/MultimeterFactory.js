import { MultimeterTypes } from "../../../../../../constants/global";
import { Error, errors } from "../../../../../utils/Error";
import { PokitProService } from "./pokitPro/PokitProService";

export class MultimeterFactory {
    constructor(bluetoothRepo, warningHandler) {
        this.pokitProService = new PokitProService(bluetoothRepo, warningHandler)
    }

    execute(multimeterType) {
        switch (multimeterType) {
            case MultimeterTypes.POKIT:
                return this.pokitProService
            default: throw new Error(errors.GENERAL, 'Multimeter is not supported', 'Not supported')
        }
    }
}