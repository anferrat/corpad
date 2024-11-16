import { ItemTypes, RectifierReadingOptions, SortingOptions, TestPointReadingOptions } from "../../../constants/global";

export const ReadingParameters = Object.freeze({
    [ItemTypes.TEST_POINT]: {
        [TestPointReadingOptions.ON_OFF]: [{ icon: 'On', pack: 'cp', unit: 'V', title: 'ON' }, { icon: 'Off', pack: 'cp', unit: 'V', title: 'OFF' }],
        [TestPointReadingOptions.OFF_NATIVE]: [{ icon: 'Off', pack: 'cp', unit: 'V', title: 'OFF' }, { icon: 'Depol', pack: 'cp', unit: 'V', title: 'Native' }],
        [TestPointReadingOptions.SHUNT_CURRENT]: [{ icon: 'flash-outline', pack: null, unit: 'A', title: 'Current' }],
        [TestPointReadingOptions.CURRENT_DENSITY]: [{ icon: 'keypad-outline', pack: null, unit: 'A/m2', title: 'Current density' }],
        [TestPointReadingOptions.SHORTING_CURRENT]: [{ icon: 'alert-triangle-outline', pack: null, unit: '' }, { icon: 'flash-outline', pack: null, unit: 'A', title: 'Shorting current' }],
    },
    [ItemTypes.RECTIFIER]: {
        [RectifierReadingOptions.CURRENT_VOLTAGE]: [{ icon: 'flash-outline', pack: null, unit: 'A', title: 'Amps' }, { icon: 'voltage', pack: 'cp', unit: 'V', title: 'Volts' }],
        [RectifierReadingOptions.TARGET]: [{ icon: 'diagonal-arrow-right-up-outline', pack: null, unit: 'A', title: 'Min.' }, { icon: 'diagonal-arrow-right-down-outline', pack: null, unit: 'A', title: 'Max.' }],
    }
})

export const SortingParameters = Object.freeze({
    [SortingOptions.ASCENDING_NAME]: {
        isIcon: false,
        value: 'A-Z',
        arrowIcon: 'arrow-down'
    },
    [SortingOptions.DESCENDING_NAME]:
    {
        isIcon: false,
        value: 'Z-A',
        arrowIcon: 'arrow-down'
    },
    [SortingOptions.NEW_TO_OLD]: {
        isIcon: true,
        value: 'clock-outline',
        arrowIcon: 'arrow-down'
    },
    [SortingOptions.OLD_TO_NEW]: {
        isIcon: true,
        value: 'clock-outline',
        arrowIcon: 'arrow-up'
    },
    [SortingOptions.NEAREST]: {
        isIcon: true,
        value: 'navigation-2-outline',
        arrowIcon: 'arrow-down'
    },
})