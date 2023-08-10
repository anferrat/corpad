export class ReadingCaptureListener {
    constructor(geolocationRepo, multimeterFactory, multimeterValueConverterService) {
        this.geolocationRepo = geolocationRepo
        this.multimeterFactory = multimeterFactory
        this.multimeterValueConverterService = multimeterValueConverterService
    }

    addListener(onCapture, onButtonPress, onError, { peripheralId, type, onTime, offTime, syncMode, firstCycle, measurementType }) {
        const multimeterService = this.multimeterFactory.execute(type)

        const getTimeAdjustment = () => {
            const { gnss, device } = this.geolocationRepo.getTimeFix()
            return gnss && device ? gnss - device : 0
        }

        const readingListener = multimeterService.addReadingListener((data) => onCapture({
            ...data,
            value: this.multimeterValueConverterService.execute(data.value, measurementType)
        }), onError, { measurementType, peripheralId, syncMode, onTime, offTime, firstCycle, getTimeAdjustment })

        const buttonPressListener = multimeterService.addButtonPressListener(() => onButtonPress(true), { peripheralId }) //change if more buttons needs to be supported

        return () => {
            readingListener()
            buttonPressListener()
        }
    }

}