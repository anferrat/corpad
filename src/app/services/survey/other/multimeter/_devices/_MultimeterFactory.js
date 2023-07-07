import { MultimeterTypes } from "../../../../../../constants/global";
import { Error, errors } from "../../../../../utils/Error";
import { _PokitMultimeterService } from "./pokitPro/_PokitMultimeterService";

export class _MultimeterFactory {
    constructor(bluetoothRepo) {
        this.pokitProService = new _PokitMultimeterService(bluetoothRepo)
    }

    execute(multimeterType) {
        switch (multimeterType) {
            case MultimeterTypes.POKIT:
                return this.pokitProService
            default: throw new Error(errors.GENERAL, 'Multimeter is not supported', 'Not supported')
        }
    }
}