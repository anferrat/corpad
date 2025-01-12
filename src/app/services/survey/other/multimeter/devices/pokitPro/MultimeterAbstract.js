import { EventRegister } from "react-native-event-listeners";

export class MultimeterAbstract {
    constructor() { }

    connectionWrapper(func) {
        EventRegister.emitEvent('MULTIMETER_IS_CONNECTING', true)
        return func().finally(() => EventRegister.emitEvent('MULTIMETER_IS_CONNECTING', false))
    }
}