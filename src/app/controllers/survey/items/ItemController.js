import { ItemTypes } from "../../../entities/survey/items/SurveyItem"
import { CreatePipeline } from "../../../use_cases/survey/survey_items/pipelines/CreatePipeline"
import { DeletePipeline } from "../../../use_cases/survey/survey_items/pipelines/DeletePipeline"
import { GetPipelineById } from "../../../use_cases/survey/survey_items/pipelines/GetPipelineById"
import { GetPipelineDisplayDataById } from "../../../use_cases/survey/survey_items/pipelines/GetPipelineDisplayDataById"
import { GetPipelineIdList } from "../../../use_cases/survey/survey_items/pipelines/GetPipelineIdList"
import { UpdatePipeline } from "../../../use_cases/survey/survey_items/pipelines/UpdatePipeline"
import { UpdatePipelineProperty } from "../../../use_cases/survey/survey_items/pipelines/UpdatePipelineProperty"
import { CreateRectifier } from "../../../use_cases/survey/survey_items/rectifiers/CreateRectifier"
import { DeleteRectifier } from "../../../use_cases/survey/survey_items/rectifiers/DeleteRectifier"
import { GetRectifierById } from "../../../use_cases/survey/survey_items/rectifiers/GetRectifierById"
import { GetRectifierDisplayDataById } from "../../../use_cases/survey/survey_items/rectifiers/GetRectifierDisplayDataById"
import { GetRectifierIdList } from "../../../use_cases/survey/survey_items/rectifiers/GetRectifierIdList"
import { UpdateRectifier } from "../../../use_cases/survey/survey_items/rectifiers/UpdateRectifier"
import { UpdateRectifierProperty } from "../../../use_cases/survey/survey_items/rectifiers/UpdateRectifierProperty"
import { CreateTestPoint } from "../../../use_cases/survey/survey_items/test_points/CreateTestPoint"
import { DeleteTestPoint } from "../../../use_cases/survey/survey_items/test_points/DeleteTestPoint"
import { GetTestPointById } from "../../../use_cases/survey/survey_items/test_points/GetTestPointById"
import { GetTestPointDisplayDataById } from "../../../use_cases/survey/survey_items/test_points/GetTestPointDisplayDataById"
import { GetTestPointIdList } from "../../../use_cases/survey/survey_items/test_points/GetTestPointIdList"
import { UpdateTestPoint } from "../../../use_cases/survey/survey_items/test_points/UpdateTestPoint"
import { UpdateTestPointProperty } from "../../../use_cases/survey/survey_items/test_points/UpdateTestPointProperty"
import { Controller } from "../../../utils/Controller"
import { ItemValidation } from "../../../validation/survey/ItemValidation"

export class ItemController extends Controller {
    constructor() {
        super()

        this.validation = new ItemValidation()

        this.createTestPointService = new CreateTestPoint()
        this.createRectifierService = new CreateRectifier()
        this.createPipelineService = new CreatePipeline()

        this.deleteTestPointService = new DeleteTestPoint()
        this.deleteRectifierService = new DeleteRectifier()
        this.deletePipelineService = new DeletePipeline()

        this.updateTestPointService = new UpdateTestPoint()
        this.updateRectifierService = new UpdateRectifier()
        this.updatePipelineService = new UpdatePipeline()

        this.getTestPointService = new GetTestPointById()
        this.getRectifierService = new GetRectifierById()
        this.getPipelineService = new GetPipelineById()

        this.getTestPointIdListService = new GetTestPointIdList()
        this.getRectifierIdListSrvice = new GetRectifierIdList()
        this.getPipelineIdListService = new GetPipelineIdList()

        this.getTestPointDisplayDataService = new GetTestPointDisplayDataById()
        this.getRectifierDisplayDataService = new GetRectifierDisplayDataById()
        this.getPipelineDisplayDataService = new GetPipelineDisplayDataById()

        this.updateTestPointPropertyService = new UpdateTestPointProperty()
        this.updateRectifierPropertyService = new UpdateRectifierProperty()
        this.updatePipelinePropertyService = new UpdatePipelineProperty()
    }

    createItem(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType } = this.validation.createItem(params)
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    return this.createTestPointService.execute()
                case ItemTypes.RECTIFIER:
                    return this.createRectifierService.execute()
                case ItemTypes.PIPELINE:
                    return this.createPipelineService.execute()
            }
        }
        )
    }

    deleteItem(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id, itemType } = this.validation.deleteItem(params)
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    return this.deleteTestPointService.execute(id)
                case ItemTypes.RECTIFIER:
                    return this.deleteRectifierService.execute(id)
                case ItemTypes.PIPELINE:
                    return this.deletePipelineService.execute(id)
            }
        }
        )
    }

    getById(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id, itemType } = this.validation.getById(params)
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    return this.getTestPointService.execute(id)
                case ItemTypes.RECTIFIER:
                    return this.getRectifierService.execute(id)
                case ItemTypes.PIPELINE:
                    return this.getPipelineService.execute(id)
            }
        }
        )
    }

    updateItem(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const data = this.validation.updateItem(params)
            switch (params.itemType) {
                case ItemTypes.TEST_POINT:
                    return this.updateTestPointService.execute(data)
                case ItemTypes.RECTIFIER:
                    return this.updateRectifierService.execute(data)
                case ItemTypes.PIPELINE:
                    return this.updatePipelineService.execute(data)
            }
        }
        )
    }

    getIdList(params, onSuccess = null, onError = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType, filters, sorting, latitude = null, longitude = null } = this.validation.getIdList(params)
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    return this.getTestPointIdListService.execute({ sorting, filters, latitude, longitude })
                case ItemTypes.RECTIFIER:
                    return this.getRectifierIdListSrvice.execute({ sorting, latitude, longitude })
                case ItemTypes.PIPELINE:
                    return this.getPipelineIdListService.execute(sorting)
            }
        }
        )
    }

    getDisplayData(params, onSuccess = null, onError = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType, displayedReading, id, readingTypeFilter } = this.validation.getDisplayData(params)
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    return this.getTestPointDisplayDataService.execute(id, displayedReading, readingTypeFilter)
                case ItemTypes.RECTIFIER:
                    return this.getRectifierDisplayDataService.execute(id, displayedReading)
                case ItemTypes.PIPELINE:
                    return this.getPipelineDisplayDataService.execute(id)
            }
        })
    }

    updateProperty(params, onSuccess = null, onError = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType, id, property, value } = this.validation.updateProperty(params)
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    return this.updateTestPointPropertyService.execute(id, property, value)
                case ItemTypes.RECTIFIER:
                    return this.updateTestPointPropertyService.execute(id, property, value)
                case ItemTypes.PIPELINE:
                    return this.updatePipelinePropertyService.execute(id, property, value)
            }
        })
    }
}