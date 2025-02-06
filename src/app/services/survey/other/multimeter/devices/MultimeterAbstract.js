import { EventRegister } from "react-native-event-listeners";

export class MultimeterAbstract {
    constructor() { }

    async connectionWrapper(func) {
        EventRegister.emitEvent('MULTIMETER_IS_CONNECTING', true)
        try {
            return await func()
        }
        finally {
            EventRegister.emitEvent('MULTIMETER_IS_CONNECTING', false)
        }

    }
}