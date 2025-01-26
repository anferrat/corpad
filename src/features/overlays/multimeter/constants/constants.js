import { MultimeterModes } from "../../../../constants/global";

export const MultimeterModeIcons = Object.freeze({
    [MultimeterModes.POKIT.AC_VOLTS]: { icon: 'voltage', pack: 'cp' },
    [MultimeterModes.POKIT.DC_VOLTS]: { icon: 'voltage', pack: 'cp' },
    [MultimeterModes.POKIT.AC_AMPS]: { icon: 'flash', pack: null },
    [MultimeterModes.POKIT.DC_AMPS]: { icon: 'flash', pack: null }
})