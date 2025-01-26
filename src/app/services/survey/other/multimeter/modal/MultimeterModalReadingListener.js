import { MultimeterButtonEvents, MultimeterListenerEvents } from "../../../../../../constants/global"
import { ModalReadingConverter } from "../utils/ModalReadingConverter"
import { MultimeterModalDefaultParams } from "../utils/MultimeterModalDefaultParams"

export class MultimeterModalReadingListener {
    constructor(multimeterFactory, unitConverter) {
        this.multimeterFactory = multimeterFactory
        this.defaultparamService = new MultimeterModalDefaultParams()
        this.readingConverter = new ModalReadingConverter(unitConverter)
    }

    _getNewParams(type, toggleStatus, onError) {
        try {
            return this.defaultparamService.execute(type, toggleStatus)
        }
        catch (er) {
            onError(er)
            return { mode: null, range: null }
        }
    }



    addListener(onReadingChange, onRangeChange, onButtonPress, onError, peripheralId, type, mode, range, rate, toggleStatus) {
        const multimeterService = this.multimeterFactory.execute(type)
        return multimeterService.addListener(peripheralId, toggleStatus, mode, range, rate, true, 0,
            (event, value) => {
                switch (event) {
                    case MultimeterListenerEvents.SINGLE_READ:
                        this.readingConverter.execute(value, mode, range, toggleStatus)
                        return onReadingChange(value)
                    case MultimeterListenerEvents.NEW_RANGE:
                        return onRangeChange(value)
                    case MultimeterListenerEvents.BUTTON_PRESS:
                        if (value === MultimeterButtonEvents.MAIN_BUTTON_ON_PRESS)
                            return onButtonPress()
                }
            }, (er) => {
                onError(er)
            })
    }
}