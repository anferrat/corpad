import { MultimeterModes } from "../../../../../../../../constants/global"

export class PokitProLowCurrentConformation {
    constructor(warningHandler, constants) {
        this.warningHandler = warningHandler
        this.constants = constants
    }

    async execute(mode, toggleStatus) {
        if (toggleStatus === this.constants.toggleStatuses.SMALL_CURRENT && (mode === MultimeterModes.POKIT.AC_AMPS || mode === MultimeterModes.POKIT.DC_AMPS)) {
            const isConfirmed = await this.warningHandler.execute('This mode only supports current values up to 300mA. Exeeding this limit may cause injuries and  will damage the device.', 'Proceed', 'Cancel')
            if (!isConfirmed)
                throw this.constants.errors.USER_CANCELLED
        }
    }
}