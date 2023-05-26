import { ItemTypes, DisplayedReadingOptions, PermanentPotentialTypes } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class GetItemListWithDisplayValues {
    constructor(testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    async execute({ idList, itemType, displayedReading, readingTypeFilter }) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                switch (displayedReading) {
                    case DisplayedReadingOptions[ItemTypes.TEST_POINT].ON_OFF:
                        return this.testPointRepo.getDisplayListWithPotentials({ idList, readingTypeFilter, permTypes: [PermanentPotentialTypes.ON, PermanentPotentialTypes.OFF] })
                    case DisplayedReadingOptions[ItemTypes.TEST_POINT].OFF_DEPOL:
                        return this.testPointRepo.getDisplayListWithPotentials({ idList, readingTypeFilter, permTypes: [PermanentPotentialTypes.OFF, PermanentPotentialTypes.DEPOL] })
                    case DisplayedReadingOptions[ItemTypes.TEST_POINT].CURRENT:
                        return await this.testPointRepo.getDisplayListWithCurrent({ idList, readingTypeFilter })
                    case DisplayedReadingOptions[ItemTypes.TEST_POINT].DENSITY:
                        return await this.testPointRepo.getDisplayListWithCurrentDensity({ idList, readingTypeFilter })
                    case DisplayedReadingOptions[ItemTypes.TEST_POINT].SHORTING_CURRENT:
                        return await this.testPointRepo.getDisplayListWithShortingCurrent({ idList, readingTypeFilter })
                    default: throw new Error(errors.GENERAL, `Displayed setting ${displayedReading} is not supported for test points`)
                }
            case ItemTypes.RECTIFIER:
                switch (displayedReading) {
                    case DisplayedReadingOptions[ItemTypes.RECTIFIER].CURRENT_VOLTAGE:
                        return await this.rectifierRepo.getDisplayListWithCurrentAndVoltage(idList)
                    case DisplayedReadingOptions[ItemTypes.RECTIFIER].CURRENT_TARGET:
                        return await this.rectifierRepo.getDisplayListWithTargets(idList)
                    default: throw new Error(errors.GENERAL, `Displayed setting ${displayedReading} is not supported for rectifiers`)
                }
            case ItemTypes.PIPELINE:
                return this.pipelineRepo.getDisplayList(idList)
            default: throw new Error(errors.GENERAL, `Item type ${itemType} is not supported`)
        }
    }
}