import { MultimeterTypes } from "../../../../../../constants/global";
import { Error, errors } from "../../../../../utils/Error";
import { Dvm2130Service } from "./dvm2130/Dvm2130Service";
import { PokitProService } from "./pokitPro/PokitProService";
import { TestDeviceService } from "./testDevice/TestDeviceService";

export class MultimeterFactory {
    constructor(bluetoothRepo) {
        this.pokitProService = new PokitProService(bluetoothRepo)
        this.dvm2130Service = new Dvm2130Service(bluetoothRepo)
        this.testService = new TestDeviceService()
    }

    execute(multimeterType) {
        switch (multimeterType) {
            case MultimeterTypes.POKIT:
                return this.pokitProService
            case MultimeterTypes.DVM2130:
                return this.dvm2130Service
            default: throw new Error(errors.GENERAL, 'Multimeter is not supported', 'Not supported')
        }
    }
}