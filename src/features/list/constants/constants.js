import { ItemTypes, RectifierReadingOptions, SortingOptions, TestPointReadingOptions } from "../../../constants/global";

export const ReadingParameters = Object.freeze({
    [ItemTypes.TEST_POINT]: {
        [TestPointReadingOptions.ON_OFF]: [{ icon: 'On', pack: 'cp', unit: 'V', titleKey: 'reading.on' }, { icon: 'Off', pack: 'cp', unit: 'V', titleKey: 'reading.off' }],
        [TestPointReadingOptions.OFF_NATIVE]: [{ icon: 'Off', pack: 'cp', unit: 'V', titleKey: 'reading.off' }, { icon: 'Depol', pack: 'cp', unit: 'V', titleKey: 'reading.native' }],
        [TestPointReadingOptions.SHUNT_CURRENT]: [{ icon: 'flash-outline', pack: null, unit: 'A', titleKey: 'reading.current' }],
        [TestPointReadingOptions.CURRENT_DENSITY]: [{ icon: 'keypad-outline', pack: null, unit: 'A/m2', titleKey: 'reading.currentDensity' }],
        [TestPointReadingOptions.SHORTING_CURRENT]: [{ icon: 'alert-triangle-outline', pack: null, unit: '' }, { icon: 'flash-outline', pack: null, unit: 'A', titleKey: 'reading.shortingCurrent' }],
    },
    [ItemTypes.RECTIFIER]: {
        [RectifierReadingOptions.CURRENT_VOLTAGE]: [{ icon: 'flash-outline', pack: null, unit: 'A', titleKey: 'reading.amps' }, { icon: 'voltage', pack: 'cp', unit: 'V', titleKey: 'reading.volts' }],
        [RectifierReadingOptions.TARGET]: [{ icon: 'diagonal-arrow-right-up-outline', pack: null, unit: 'A', titleKey: 'reading.min' }, { icon: 'diagonal-arrow-right-down-outline', pack: null, unit: 'A', titleKey: 'reading.max' }],
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
