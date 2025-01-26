import { CreateHistoryReading } from "../services/survey/other/multimeter/history_readings/CreateHistoryReading"
import { DeleteAllHistoryReadings } from "../services/survey/other/multimeter/history_readings/DeleteAllHistoryReadings"
import { DeleteHistoryReading } from "../services/survey/other/multimeter/history_readings/DeleteHistoryReading"
import { ExportAllHistoryReadings } from "../services/survey/other/multimeter/history_readings/ExportAllHistoryReadings"
import { GetAllHistoryReadings } from "../services/survey/other/multimeter/history_readings/GetAllHistoryReadings"
import { Controller } from "../utils/Controller"
import { commaSeparatedFileParser, fileNameGenerator } from "./_instances/general_services"
import { fileSystemRepo, multimeterReadingRepo } from "./_instances/repositories"


class MultimeterReadingController extends Controller {
    constructor(multimeterReadingRepo, fileSystemRepo, csvParser, fileNameGenerator) {
        super()
        this.createHistoryReadingService = new CreateHistoryReading(multimeterReadingRepo)
        this.deleteHistoryReadingService = new DeleteHistoryReading(multimeterReadingRepo)
        this.getAllHistoryReadingsService = new GetAllHistoryReadings(multimeterReadingRepo)
        this.deleteAllHistoryReadingService = new DeleteAllHistoryReadings(multimeterReadingRepo)
        this.exportAllHistoryReadingsService = new ExportAllHistoryReadings(multimeterReadingRepo, fileSystemRepo, csvParser, fileNameGenerator)

    }

    create(reading, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 662, () => {
            return this.createHistoryReadingService.execute(reading)
        })
    }

    delete(id, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 663, () => {
            return this.deleteHistoryReadingService.execute(id)
        })
    }

    getAll(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 664, () => {
            return this.getAllHistoryReadingsService.execute()
        })
    }


    deleteAll(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 665, () => {
            return this.deleteAllHistoryReadingService.execute()
        })
    }

    export(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 666, () => {
            return this.exportAllHistoryReadingsService.execute()
        })
    }

}

const multimeterReadingController = new MultimeterReadingController(
    multimeterReadingRepo,
    fileSystemRepo,
    commaSeparatedFileParser,
    fileNameGenerator
)

export const createHistoryReading = (reading, onError, onSuccess) => multimeterReadingController.create(reading, onError, onSuccess)

export const deleteHistoryReading = (id, onError, onSuccess) => multimeterReadingController.delete(id, onError, onSuccess)

export const getAllHistoryReadings = (onError, onSuccess) => multimeterReadingController.getAll(onError, onSuccess)

export const deleteAllHistoryReadings = (onError, onSuccess) => multimeterReadingController.deleteAll(onError, onSuccess)

export const exportHistoryReadings = (onError, onSuccess) => multimeterReadingController.export(onError, onSuccess)
