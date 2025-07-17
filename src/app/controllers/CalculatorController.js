import { Controller } from "../utils/Controller"
import { DeleteCalculator } from "../services/calculator/DeleteCalculator"
import { GetCalculator } from "../services/calculator/GetCalculator"
import { GetCalculatorListByType } from "../services/calculator/GetCalculatorListByType"
import { SaveCalculator } from "../services/calculator/SaveCalculator"
import { WriteCalculatorToFile } from "../services/calculator/WriteCalculatorToFile"
import { CalculatorValidation } from "../validation/CalculatorValidation"
import { calculatorRepo, fileSystemRepo } from "./_instances/repositories"
import { basicPresenter, listPresenter } from "./_instances/presenters"
import { commaSeparatedFileParser, fileNameGenerator } from "./_instances/general_services"
import { GetAllCalculatorsForDisplay } from "../services/calculator/GetAllCalculatorsForDisplay"

class CalculatorController extends Controller {
    constructor(calculatorRepo, fileSystemRepo, listPresenter, basicPresenter, commaSeparatedFileParser, fileNameGenerator) {
        super()
        this.saveCalculatorService = new SaveCalculator(calculatorRepo, basicPresenter)
        this.deleteCalculatorService = new DeleteCalculator(calculatorRepo)
        this.getCalculatorService = new GetCalculator(calculatorRepo, basicPresenter)
        this.getCalculatorListByTypeService = new GetCalculatorListByType(calculatorRepo, listPresenter)
        this.writeCalculatorToFile = new WriteCalculatorToFile(fileSystemRepo, commaSeparatedFileParser, fileNameGenerator)
        this.getAllCalculatorsForDisplayService = new GetAllCalculatorsForDisplay(calculatorRepo)
        this.validation = new CalculatorValidation()
    }

    save(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 647, async () => {
            const { data, name, calculatorType, latitude, longitude, timeCreated } = this.validation.save(params)
            return await this.saveCalculatorService.execute({ data, name, calculatorType, latitude, longitude, timeCreated })
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 648, async () => {
            const { id } = this.validation.delete(params)
            return await this.deleteCalculatorService.executeById(id)
        })
    }

    deleteAll(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 648, async () => {
            const { calculatorType } = this.validation.deleteAll(params)
            return await this.deleteCalculatorService.executeByType(calculatorType)
        })
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 649, async () => {
            const { calculatorType } = this.validation.getList(params)
            return await this.getCalculatorListByTypeService.execute(calculatorType)
        })
    }

    getById(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 650, async () => {
            const { id } = this.validation.getById(params)
            return await this.getCalculatorService.execute(id)
        })
    }

    saveToFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 431, async () => {
            const { exportData, fileName } = this.validation.writeToFile(params)
            return await this.writeCalculatorToFile.execute(exportData, fileName)
        })
    }

    getAllForDisplay(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 649, async () => {
            return await this.getAllCalculatorsForDisplayService.execute()
        })
    }
}

const calculatorController = new CalculatorController(
    calculatorRepo,
    fileSystemRepo,
    listPresenter,
    basicPresenter,
    commaSeparatedFileParser,
    fileNameGenerator
)


export const saveCalculator = async ({ data, name, calculatorType, latitude, longitude, timeCreated }, onError, onSuccess) => await calculatorController.save({ data, name, calculatorType, latitude, longitude, timeCreated }, onError, onSuccess)

export const deleteCalculator = async ({ id }, onError, onSuccess) => await calculatorController.delete({ id }, onError, onSuccess)

export const deleteCalculatorsByType = async ({ calculatorType }, onError, onSuccess) => await calculatorController.deleteAll({ calculatorType }, onError, onSuccess)

export const getCalculatorById = async ({ id }, onError, onSuccess) => await calculatorController.getById({ id }, onError, onSuccess)

export const getCalculatorListByType = async ({ calculatorType }, onError, onSuccess) => await calculatorController.getList({ calculatorType }, onError, onSuccess)

export const saveCalculatorDataToFile = async ({ exportData, fileName }, onError, onSuccess) => await calculatorController.saveToFile({ exportData, fileName }, onError, onSuccess)

export const getAllCalculatorsForDisplay = async (onError, onSuccess) => await calculatorController.getAllForDisplay(onError, onSuccess)