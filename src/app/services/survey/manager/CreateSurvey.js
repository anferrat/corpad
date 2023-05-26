import { Pipeline } from "../../../entities/survey/items/Pipeline"
import { PotentialType } from "../../../entities/survey/other/PotentialType"
import { ReferenceCell } from "../../../entities/survey/other/ReferenceCell"
import { Survey } from "../../../entities/survey/other/Survey"
import { PermanentPotentialTypes, ReferenceCellTypes } from "../../../../constants/global"
import { PermanentPotentialTypeLabels } from "../../../../constants/labels"
import { guid } from "../../../utils/guid"

export class CreateSurvey {
    constructor(surveyRepo, potentialTypeRepo, surveyLoadStatusService, pipelineRepo, referenceCellRepo, settingRepo) {
        this.surveyRepo = surveyRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.surveyLoadStatusService = surveyLoadStatusService
        this.pipelineRepo = pipelineRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
    }

    async execute(name, isCloud) {
        const isLoaded = await this.surveyLoadStatusService.execute()
        if (!isLoaded.isLoaded) {
            const currentTime = Date.now()
            const pipeline = new Pipeline(null, guid(), 'Pipeline', currentTime, currentTime, null, null, null, true, null, null, null)
            const potentialTypes = Object.values(PermanentPotentialTypes).map(type => new PotentialType(null, guid(), PermanentPotentialTypeLabels[type], type))
            const survey = new Survey(guid(), name, 'Wade Watts')
            const referenceCell = new ReferenceCell(null, guid(), ReferenceCellTypes.COPPER_SULFATE, 'RC1', true)
            const syncTime = null
            const fileName = null
            await Promise.all([
                this.surveyRepo.create(survey),
                this.pipelineRepo.create(pipeline),
                Promise.all(potentialTypes.map(potentialType => this.potentialTypeRepo.create(potentialType))),
                this.referenceCellRepo.create(referenceCell),
                this.settingRepo.updateSurveySettings({ isSurveyNew: 1, isCloud, originalHash: null, fileName, cloudId: null, lastSync: syncTime })
            ])
            return {
                syncTime,
                name,
                fileName,
                isCloud,
            }
        }
        else {
            const { name, fileName, isCloud, syncTime } = isLoaded
            return { name, fileName, isCloud, syncTime }
        }
    }

}