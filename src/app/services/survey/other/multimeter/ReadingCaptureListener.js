export class ReadingCaptureListener {
    constructor(geolocationRepo, multimeterFactory, multimeterValueConverterService, timeService) {
        this.geolocationRepo = geolocationRepo
        this.multimeterFactory = multimeterFactory
        this.multimeterValueConverterService = multimeterValueConverterService
        this.timeService = timeService
    }

    addListener(onCapture, onButtonPress, onError, { peripheralId, type, onTime, offTime, syncMode, firstCycle, measurementType }) {
        const multimeterService = this.multimeterFactory.execute(type)

        const readingListener = multimeterService.addReadingListener((data) => onCapture({
            ...data,
            value: this.multimeterValueConverterService.execute(data.value, measurementType)
        }), onError, { measurementType, peripheralId, syncMode, onTime, offTime, firstCycle, getTimeDelta: this.timeService.getDelta() })

        const buttonPressListener = multimeterService.addButtonPressListener(() => onButtonPress(true), { peripheralId }) //change if more buttons needs to be supported

        return () => {
            readingListener()
            buttonPressListener()
        }
    }

}