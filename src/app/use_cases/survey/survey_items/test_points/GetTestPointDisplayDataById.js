import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"
import { DisplayedReadingOptions, PermanentPotentialTypes } from "../../../../entities/survey/other/properties"
import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"
import { Error } from "../../../../utils/Error"


export class GetTestPointDisplayDataById {
    constructor() {
        this.testPointRepo = new TestPointRepository()
    }

    async getSubitemList(id, readingTypeFilter, displayedReading) {
        switch (displayedReading) {
            case DisplayedReadingOptions[ItemTypes.TEST_POINT].ON_OFF:
                return await this.testPointRepo.getSubitemListWithPotentialsById({ id, readingTypeFilter, permTypes: [PermanentPotentialTypes.ON, PermanentPotentialTypes.OFF] })
            case DisplayedReadingOptions[ItemTypes.TEST_POINT].OFF_DEPOL:
                return await this.testPointRepo.getSubitemListWithPotentialsById({ id, readingTypeFilter, permTypes: [PermanentPotentialTypes.OFF, PermanentPotentialTypes.DEPOL] })
            case DisplayedReadingOptions[ItemTypes.TEST_POINT].CURRENT:
                return await this.testPointRepo.getSubitemListWithCurrentById({ id, readingTypeFilter })
            case DisplayedReadingOptions[ItemTypes.TEST_POINT].DENSITY:
                return await this.testPointRepo.getSubitemListWithCurrentDensityById({ id, readingTypeFilter })
            case DisplayedReadingOptions[ItemTypes.TEST_POINT].SHORTING_CURRENT:
                return await this.testPointRepo.getSubitemListWithShortingCurrentById({ id, readingTypeFilter })
            default: throw new Error('CorpadError', `Displayed setting ${displayedReading} is not supported for test points`)
        }
    }

    async execute(id, displayedReading, readingTypeFilter) {
        const testPoint = await this.testPointRepo.getById(id)
        const subitemList = await this.getSubitemList(id, readingTypeFilter, displayedReading)
        return testPoint.setSubitemList(subitemList)
    }
}