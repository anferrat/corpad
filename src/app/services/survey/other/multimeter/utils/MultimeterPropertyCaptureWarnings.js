import { MultimeterModes, MultimeterToggleStatuses } from "../../../../../../constants/global"
import { Error, errors } from "../../../../../utils/Error"

export class MultimeterPropertyCaptureWarnings {
    constructor(warningHandler) {
        this.warningHandler = warningHandler
    }

    async execute(toggleStatus, mode) {
        if (toggleStatus === MultimeterToggleStatuses.POKIT.SMALL_CURRENT && (mode === MultimeterModes.POKIT.AC_AMPS || mode === MultimeterModes.POKIT.DC_AMPS)) {
            const isConfirmed = await this.warningHandler.execute({ key: 'warnings.messages.multimeterSafety' }, 'Proceed', 'Cancel')
            if (!isConfirmed)
                throw new Error(errors.MULTIMETER, 'Unable update setting', 'User cancelled operation', 101)
        }
    }
}
